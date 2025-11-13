import type { Link } from "../store/links";

export const createLinkHttp = async (data: Omit<Link, "id" | "createdAt" | "visitCount">): Promise<Link> => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${url}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
      // tenta extrair mensagem de erro do backend, se existir
      let message = "Erro ao criar link";
      try {
        const errData = await response.json();
        message = errData?.message || message;
      } catch {
        // ignora erro de parse (caso o backend não retorne JSON)
      }
      throw new Error(message);
    }

    return response.json();
}