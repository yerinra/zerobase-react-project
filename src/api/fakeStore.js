import axios from "axios";

const API_ENDPOINT = "https://fakestoreapi.com/products";

export async function getAllProducts() {
  const result = await axios.get(API_ENDPOINT).then((res) => res.data);
  return result;
}

export async function getCategoryProducts(category) {
  const result = await axios
    .get(`${API_ENDPOINT}/category/${category}`)
    .then((res) => res.data);
  return result;
}

export async function getProductDetail(productId) {
  const result = await axios.get(`${API_ENDPOINT}/${productId}`).then((res) => {
    return res.data;
  });
  return result;
}
