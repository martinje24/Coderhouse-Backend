import express from "express";
import { config } from "./config/index.js";
import { productsRouter, cartsRouter } from "./routers/index.js";

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.server.routes.products, productsRouter);
app.use(config.server.routes.carts, cartsRouter);

const server = app.listen(config.server.PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
});
server.on("error", (error) => {
  console.error(`Server error: ${error}`);
});
