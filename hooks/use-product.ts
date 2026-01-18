"use client";

import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/types";

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const q = query(
        collection(db, "products"),
        where("slug", "==", slug),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return null;
      }
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      };
    },
  });
