import type { Link } from "../store/links";

export const createLinkHttp = async (data: Omit<Link, "id" | "createdAt" | "visitCount">): Promise<Link> => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${url}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error create link");
    return response.json();
}