export const deleteLinkHttp = async (id: string): Promise<void> => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(`${url}/links/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error on delete link");
}