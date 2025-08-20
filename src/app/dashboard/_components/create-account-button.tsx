"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const CreateAccountButton = () => {
  const [loading, setLoading] = useState(false);

  async function handleCreateStripeAccount() {
    setLoading(true);
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
