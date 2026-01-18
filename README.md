# Wesite Esports eCommerce

Boutique eCommerce premium pour accessoires gaming au Maroc (tapis, souris, claviers, esports gear) construite avec Next.js 14, TypeScript, Tailwind CSS et Firebase.

## Architecture

- **Next.js App Router** pour le routing et les API routes.
- **Firebase**
  - Firestore : produits, commandes, paramètres.
  - Storage : images produits.
  - Auth : login admin.
- **React Query** pour la data fetching côté client.
- **Zod + React Hook Form** pour la validation.
- **shadcn/ui-lite** (composants maison inspirés) + lucide icons.

## File tree (principaux dossiers)

```
app/
  api/
    orders/
  admin/
  (store)/
components/
  ui/
  hero.tsx
  product-card.tsx
hooks/
lib/
schemas/
types/
public/
  placeholder.svg
firebase.rules
storage.rules
```

## Setup Firebase

1. Créez un projet Firebase.
2. Activez **Firestore**, **Storage**, **Authentication** (Email/Password).
3. Ajoutez un admin utilisateur via Auth.
4. Ajoutez les règles Firestore/Storage fournies dans `firebase.rules` et `storage.rules`.
5. Récupérez la configuration web Firebase.

### Variables d'environnement

Créez un fichier `.env.local` :

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ADMIN_ALLOWLIST=admin@votredomaine.com

# Pour les API routes (firebase-admin)
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Installer et lancer

```bash
npm install
npm run dev
```

## Seed produits (optionnel)

```bash
npm run seed
```

## Déploiement (Vercel)

1. Connectez le repo à Vercel.
2. Ajoutez les variables d’environnement.
3. Déployez.

## Admin access

- Connectez-vous via `/admin/login`.
- L’email doit être présent dans `NEXT_PUBLIC_ADMIN_ALLOWLIST`.

## Notes

- Paiement COD disponible par défaut.
- Stripe peut être branché via un module séparé sans casser le flux.
