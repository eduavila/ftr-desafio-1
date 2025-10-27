import type { Link } from "../store/links";

export const getLinkByShortCodeHttp = async (shortCode: string): Promise<Link | null> => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${url}/links/${shortCode}`);
    if (!response.ok) throw new Error("Failed to fetch the link shortcode.");
    return response.json();
}