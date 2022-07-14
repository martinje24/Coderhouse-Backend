// variable hardcodeada, como pide el desafío, más adelante va a tener funcion real en base al usuario
// si la variable no es true, no va a dejar entrar a las rutas
const IS_ADMIN = true;

const isAdmin = (req, res, next) => {
  if (!IS_ADMIN) res.send({ error: "Usuario no autorizado" });

  next();
};

export { isAdmin };
