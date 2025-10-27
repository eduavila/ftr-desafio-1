import type { Link } from "../store/links";

type LinksResponseHTTP = Link[]

export const fetchAllLinksHttp = async ():Promise<LinksResponseHTTP> => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${url}/links`);
    console.log(response);
    if (!response.ok) throw new Error("Error fetch all links");

    return response.json();
}