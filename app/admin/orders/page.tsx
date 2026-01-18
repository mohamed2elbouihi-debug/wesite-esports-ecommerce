"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { db } from "@/lib/firebase";
import type { Order } from "@/types";
import { Card } from "@/components/ui/card";

const STATUSES: Order["status"][] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "canceled",
];

export default function AdminOrdersPage() {
  const { user, loading } = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(
        query(collection(db, "orders"), orderBy("createdAt", "desc"))
      );
      setOrders(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Order, "id">),
        }))
      );
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: Order["status"]) => {
    await updateDoc(doc(db, "orders", orderId), { status });
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  if (loading) {
    return <div className="mx-auto max-w-4xl py-10">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="text-sm text-white/60">
          Accès admin requis pour consulter les commandes.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl py-10 container-padding">
      <h1 className="text-2xl font-semibold">Commandes</h1>
      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{order.customerName}</p>
                <p className="text-xs text-white/60">{order.phone}</p>
              </div>
              <select
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm"
                value={order.status}
                onChange={(event) =>
                  handleStatusChange(order.id, event.target.value as Order["status"])
                }
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-white/70">
              {order.items.map((item) => (
                <p key={item.productId}>
                  {item.name} x{item.quantity}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
