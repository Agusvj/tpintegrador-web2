export async function getTags(): Promise<Object[]> {
  try {
    const res = await fetch("http://161.35.104.211:8000/tags", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer jeremias01",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error cargando etiquetas: ", ${error}`);
    throw error;
  }
}

export interface Tags {
  title?: string;
  id?: number;
}
