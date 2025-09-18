export async function getProducts() {
  fetch("http://161.35.104.211:8000/products", {
    headers: {
      accept: "application/json",
      Authorization: "Bearer jeremias01",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}

export async function getProductByID(id) {
  fetch(`http://161.35.104.211:8000/products/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: "Bearer jeremias01",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}

export async function getCategories() {
  fetch("http://161.35.104.211:8000/categories", {
    headers: {
      accept: "application/json",
      Authorization: "Bearer jeremias01",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}

export async function getCategorieByID(id) {
  fetch(`http://161.35.104.211:8000/categories/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: "Bearer jeremias01",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
//getCategorieByID(44);
getProductByID(162);
