"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/hooks/use-admin-auth";

type LoginForm = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const form = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginForm) => {
    await login(values.email, values.password);
    router.push("/admin");
  };

  return (
    <div className="mx-auto max-w-md py-16 container-padding">
      <h1 className="text-2xl font-semibold">Connexion Admin</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-6"
      >
        <Input placeholder="Email" type="email" {...form.register("email")} />
        <Input
          placeholder="Mot de passe"
          type="password"
          {...form.register("password")}
        />
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </div>
  );
}
