import { ADMIN_EMAIL_ALLOWLIST } from "@/lib/constants";
import { clsx } from "clsx";

export const cn = (...inputs: Array<string | undefined | false>) => clsx(inputs);

export const formatMAD = (value: number) =>
  new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);

export const isAdminEmail = (email?: string | null) =>
  !!email && ADMIN_EMAIL_ALLOWLIST.includes(email);

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
