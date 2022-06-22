const express = require('express');
const API = require('./public/src/api');
const app=express();
const routerProductos=express.Router();

app.use('/',routerProductos);
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended:true}));

app.use(express.static('public')) //Use http://localhost:8080/


let api=new API();


// Throw/show all products (GET ALL)
routerProductos.get('/api/productos/', (req, res) => {
    res.status(200).json(api.getAll());
});
// Throw/show a product with the respective ID (GET BY ID)
routerProductos.get('/api/productos/:id', (req, res) => {
    let response=api.getById(parseInt(req.params.id));
    if (response["error"]==["producto no encontrado"]){
        res.status(400).json(response)
    }else{
        res.status(200).json(response);
    }
    
});
// Receive a product and asign the ID (ADD NEW PRODUCT)
routerProductos.post('/api/productos/', (req, res) => {
    const producto ={
        title: req.body.title, 
        price: req.body.price, 
        thumbnail: req.body.thumbnail};
    producto.id = api.getId();
    api.add(producto);
    res.status(200).json(api.getAll());
});
// Receive and update product by ID (UPDATE PRODUCT)
routerProductos.put('/api/productos/:id', (req, res) => {
    const producto ={
    title: req.body.title, 
    price: req.body.price, 
    thumbnail: req.body.thumbnail};
    api.update(parseInt(req.params.id), producto);
    res.status(200).json(producto);
});
//Delete a product by using the ID (DELETE A PRODUCT)
routerProductos.delete('/api/productos/:id', (req, res) => {
    let response=api.getById(parseInt(req.params.id))
    if (response["error"]==["producto no encontrado"]){
        res.status(400).json(response)
    }
    else{
        api.delete(parseInt(req.params.id))
        res.status(200).json(api.getAll());
    }
});

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
//On server manage errors
server.on('error', error => console.log(`Error en servidor ${error}`))