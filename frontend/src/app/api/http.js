const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function http(load, options) {
    const res = await fetch(`${baseUrl}/${endPoint}`, {
        "content-type": "application/json",
        "authentication": `BEARER `
    },
        ...options,
    )
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text)
    }
}