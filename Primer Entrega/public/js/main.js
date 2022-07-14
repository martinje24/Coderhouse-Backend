import { API_ROUTES } from "./routes.js";
import { utils } from "./utils.js";

const getProductsBtn = document.getElementById("getProductsBtn");
const productsContainer = document.getElementById("productsContainer");

const getProducts = async () => {
  const products = await API_ROUTES.getProducts();

  productsContainer.innerHTML = await utils.createProductTable(products);
};

getProductsBtn.addEventListener("click", getProducts);
