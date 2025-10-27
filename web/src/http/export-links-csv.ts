
export const exportLinksCSVHttp = async ():Promise<{ fileUrl: string }> => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${url}/links/export-csv`);
    if (!response.ok) throw new Error("Error export links csv");

    return response.json();
}