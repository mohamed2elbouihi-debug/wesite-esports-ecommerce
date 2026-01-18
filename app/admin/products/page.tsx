"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { productSchema } from "@/schemas/product";
import { db, storage } from "@/lib/firebase";
import { CATEGORIES } from "@/lib/constants";
import { toSlug } from "@/lib/utils";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function AdminProductsPage() {
  const { user, loading } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "Mousepads",
      priceMAD: 0,
      oldPriceMAD: null,
      description: "",
      specs: [""],
      tags: [],
      featured: false,
      inStock: true,
      stockQty: 0,
      images: [],
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Product, "id">),
        }))
      );
    };

    fetchProducts();
  }, []);

  const onSubmit = async (values: any) => {
    if (!user) return;

    if (!values.slug) {
      values.slug = toSlug(values.name);
    }

    if (selected) {
      await updateDoc(doc(db, "products", selected.id), {
        ...values,
        updatedAt: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, "products"), {
        ...values,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    form.reset();
    setSelected(null);
    const snapshot = await getDocs(collection(db, "products"));
    setProducts(
      snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Product, "id">),
      }))
    );
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    form.setValue("images", urls, { shouldValidate: true });
    setUploading(false);
  };

  const handleEdit = (product: Product) => {
    setSelected(product);
    form.reset({
      ...product,
      oldPriceMAD: product.oldPriceMAD ?? null,
    });
  };

  const handleDelete = async (productId: string) => {
    await deleteDoc(doc(db, "products", productId));
    setProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  const tagsValue = form.watch("tags");
  const specsValue = form.watch("specs");

  const tagString = useMemo(() => tagsValue?.join(", ") ?? "", [tagsValue]);
  const specString = useMemo(() => specsValue?.join("\n") ?? "", [specsValue]);

  if (loading) {
    return <div className="mx-auto max-w-4xl py-10">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-sm text-white/60">
          Accès admin requis pour gérer les produits.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl py-10 container-padding">
      <h1 className="text-2xl font-semibold">Produits</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-4">
          <h2 className="text-lg font-semibold">
            {selected ? "Modifier un produit" : "Nouveau produit"}
          </h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <Input
              placeholder="Nom"
              {...form.register("name")}
              onBlur={(event) =>
                form.setValue("slug", toSlug(event.target.value))
              }
            />
            <Input placeholder="Slug" {...form.register("slug")} />
            <select
              className="w-full rounded-xl border border-border bg-card px-4 py-2 text-sm"
              {...form.register("category")}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="grid gap-3 md:grid-cols-2">
              <Input
                type="number"
                placeholder="Prix MAD"
                {...form.register("priceMAD", { valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Ancien prix (optionnel)"
                {...form.register("oldPriceMAD", { valueAsNumber: true })}
              />
            </div>
            <Textarea
              placeholder="Description"
              {...form.register("description")}
            />
            <Textarea
              placeholder="Specs (une par ligne)"
              value={specString}
              onChange={(event) =>
                form.setValue(
                  "specs",
                  event.target.value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
            <Input
              placeholder="Tags (séparés par virgule)"
              value={tagString}
              onChange={(event) =>
                form.setValue(
                  "tags",
                  event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...form.register("featured")} />
                Produit vedette
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...form.register("inStock")} />
                En stock
              </label>
            </div>
            <Input
              type="number"
              placeholder="Quantité en stock"
              {...form.register("stockQty", { valueAsNumber: true })}
            />
            <Input type="file" multiple onChange={(event) => handleUpload(event.target.files)} />
            <Button type="submit" className="w-full" disabled={uploading}>
              {selected ? "Mettre à jour" : "Créer"}
            </Button>
          </form>
        </Card>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Catalogue</h2>
          <div className="space-y-3">
            {products.map((product) => (
              <Card key={product.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-xs text-white/60">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => handleEdit(product)}>
                    Modifier
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(product.id)}>
                    Supprimer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
