"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const CreateAccountButton = () => {
  const [loading, setLoading] = useState(false);

  async function handleCreateStripeAccount() {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/stripe/create-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("Falha ao criar conta de pagamentos");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="mb-5">
      <Button
        onClick={handleCreateStripeAccount}
        className="cursor-pointer"
        disabled={loading}>
        {loading ? "Carregando..." : "Ativar Conta de Pagamentos"}
      </Button>
    </div>
  );
};

export default CreateAccountButton;
