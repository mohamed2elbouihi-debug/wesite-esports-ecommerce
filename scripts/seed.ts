import { getAdminDb } from "@/lib/firebase-admin";
import { sampleProducts } from "@/data/sample-products";

const run = async () => {
  const db = getAdminDb();
  const batch = db.batch();
  sampleProducts.forEach((product) => {
    const ref = db.collection("products").doc();
    batch.set(ref, {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  await batch.commit();
  console.log("Seeded sample products");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
