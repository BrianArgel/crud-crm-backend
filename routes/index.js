const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController')
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')

//middleware para proteger las rutas
const auth = require('../middleware/auth')

module.exports = function () {
    //Agrega nuevos clientes via POST
    router.post('/clientes', auth, clientesController.nuevoCliente)

    //obtener todos los clientes
    router.get('/clientes', auth, clientesController.mostrarClientes)

    //muestra un cliente en especifico
    router.get('/clientes/:idCliente', clientesController.mostrarCliente)

    //autilizaciara cliente
    router.put('/clientes/:idCliente', clientesController.actualizarCliente)

    //eliminar cliente
    router.delete('/clientes/:idCliente', clientesController.eliminarCliente)

    /** PRODUCTOS DEL CLIENTE */
    router.post('/productos', productosController.subirArchivo,
        productosController.nuevoProducto)

    //muestra todos los productos
    router.get('/productos', auth, productosController.mostrarProductos)

    //producto por id 
    router.get('/productos/:idProducto', productosController.mostrarProducto)

    //actualiza productos
    router.put('/productos/:idProducto', productosController.subirArchivo,
        productosController.actualizarProducto)

    //eliminar productos
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    //busqueda de productos
    router.post('/productos/busqueda/:query', productosController.buscarProducto)
    /** PEDIDOS */
    // agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido)

    //mostrar pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos)

    //mostrar un pedido en especifico 
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)

    //actualizar pedido
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)

    //eliminar pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)

    //usuarios
    router.post('/crear-cuenta', usuariosController.registrarUsuario)

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario)
    return router;
}