export const updateLink = async (id: string, visitCount: n): Promise<void> => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${url}/links/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error on delete link");
}