const { findOneAndUpdate } = require('../models/Clientes')
const Clientes = require('../models/Clientes')

//agrega un nuevo cliente 

exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body)

    try {
        //alamacenar registro 
        await cliente.save()
        res.json({mensaje: "Se agrego un nuevo cliente"})
    } catch (error) {
        //si hay un error 
        res.json(error)
        next()
    }
}

//muestra todos los clientes
exports.mostrarClientes = async(req, res, next) => {
    try {
        const clientes = await Clientes.find({})
        res.json(clientes)
    } catch (error) {
        console.log(error)
        next()
    }
}
//muestra un cliente por su id
exports.mostrarCliente = async (req, res, next) => {
   

    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        res.json(cliente);
        
    } catch (error) {
        res.json({ mensaje: ' Ese cliente NO existe'});
        next()
    }
    
    
}
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente}, 
        req.body, {
            new: true
        });
        res.send({ mensaje: 'Cliente Actualizado correctamente'})
    } catch (error) {
        console.log(error)
        next()
    }

}

// elimina cliente por id
exports.eliminarCliente = async(req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente})
        res.send({mensaje: 'Cliente Eliminado'})
    } catch (error) {
        console.log(error);
        next()
    }
}