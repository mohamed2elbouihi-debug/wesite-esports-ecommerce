import { SITE_NAME } from "@/lib/constants";

export const SiteFooter = () => (
  <footer className="border-t border-border bg-card">
    <div className="mx-auto max-w-6xl py-10 text-sm text-white/60 container-padding">
      <p>
        © {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
      </p>
    </div>
  </footer>
);
