async function getCategories(): Promise<Object[]> {
  try {
    const res = await fetch("http://161.35.104.211:8000/categories", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer jeremias01",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error cargando categorias: ", ${error}`);
    throw error;
  }
}

async function getCategorieByID(id: number): Promise<Object[]> {
  try {
    const res = await fetch(`http://161.35.104.211:8000/categories/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer jeremias01",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error cargando categoria: ", ${error}`);
    throw error;
  }
}
export { getCategories, getCategorieByID };
