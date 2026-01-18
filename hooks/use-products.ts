"use client";

import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/types";

export const useProducts = (options?: {
  featured?: boolean;
  category?: string;
  search?: string;
}) =>
  useQuery({
    queryKey: ["products", options],
    queryFn: async () => {
      let q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      if (options?.featured) {
        q = query(q, where("featured", "==", true));
      }
      if (options?.category) {
        q = query(q, where("category", "==", options.category));
      }
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      if (options?.search) {
        const term = options.search.toLowerCase();
        return products.filter((product) =>
          product.name.toLowerCase().includes(term)
        );
      }
      return products;
    },
  });
