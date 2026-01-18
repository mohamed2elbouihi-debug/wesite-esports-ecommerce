import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { orderSchema } from "@/schemas/order";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = orderSchema.parse(payload);
    const db = getAdminDb();

    const docRef = await db.collection("orders").add({
      ...data,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }
}
