import joi from "joi";

/*
    Usando joi, podemos crear esquemas y validar los datos
    https://joi.dev/api/
    npm i joi

    podemos usarlo para hacer el de producto, el de id, el de carrito el que quieran!
*/

// nos devuelve el schema que va a ser una función a la que podemos pasarle un objeto y lo valide, si las propiedades estan bien van a devolver un objeto y si no, devuelve una excepción que podemos atrapar con el catch
// Se puede ver el uso en el archivo productsRouter, linea 38
const product = joi.object({
  nombre: joi.string().min(3).max(45).required(),
  descripcion: joi.string().min(5).max(60).required(),
  codigo: joi.string().min(3).max(8).required(),
  foto: joi.string().min(5).max(180).required(),
  precio: joi.number().required(),
  stock: joi.number().required(),
});

export const JOI_VALIDATOR = {
  product,
};
