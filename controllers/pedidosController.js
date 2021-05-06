const Pedidos = require('../models/Pedidos')
const Productos = require('../models/Productos')

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body)
    try {
        await pedido.save()
        res.json({ mensaje: "Pedido exitoso"})
    } catch (error) {
        console.log(error)
        next()
    }
}

// muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedidos)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarPedido = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.json(pedido)
    } catch (error) {
        res.send({mensaje: 'Ese pedido no existe'})
        next()
    }
}

exports.actualizarPedido = async(req, res) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido}, req.body, {
            new: true
        }).populate('cliente')
          .populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
        res.send(pedido)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id: req.params.idPedido})
        res.send({mensaje: 'pedido eliminado correctamente'})
    } catch (error) {
        console.log(error)
        next()
    }
}