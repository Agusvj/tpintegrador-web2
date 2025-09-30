async function getProducts(): Promise<Object[]> {
  try {
    const res = await fetch(`http://161.35.104.211:8000/products/`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer jeremias01",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error cargando productos: ", ${error}`);

    throw error;
  }
}

async function getProductByID(id: number): Promise<Object[]> {
  try {
    const res = await fetch(`http://161.35.104.211:8000/products/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer jeremias01",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error cargando producto: ", ${error}`);

    throw error;
  }
}
export interface Product {
  title: string;
  pictures: string[];
  price: number;
  description: string;
  id: string;
  category_id: string;
  tags?: [
    {
      title: string;
      id: string;
    }
  ];
}
export { getProducts, getProductByID };
