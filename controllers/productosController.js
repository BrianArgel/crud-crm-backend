const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}
// agregar nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body)

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto'})
    } catch (error) {
        console.log(error)
        next()
    }
}
//Mostrar todos los productos
exports.mostrarProductos = async(req, res, next) => {
    
    try {
        const productos = await Productos.find({});
        res.json(productos)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarProducto = async(req, res, next) => {

   
    try {
        const producto = await Productos.findById(req.params.idProducto)
        res.json(producto)
    } catch (error) {
        res.json({ mensaje: 'el producto no existe'})
        next()
    }
}

//actualiza producto via Id
exports.actualizarProducto = async(req, res, next) => {
    try {
        let productoAnterior = await Productos.findById(req.params.idProducto)

        //contruir el nuevo producto
        let nuevoProducto = req.body;
        if(req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {
            nuevoProducto.imagen = productoAnterior.imagen
        }
        let producto =  await Productos.findOneAndUpdate({_id: req.params.idProducto}, 
        nuevoProducto , {
            new: true
        });
        res.send({mensaje: 'Actualizado correctamente'})
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.eliminarProducto = async(req, res) => {
    try {
        await Productos.findOneAndDelete({_id: req.params.idProducto})
        res.send({ mensaje : 'Producto eliminado correctamente'})
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.buscarProducto = async(req, res, next) => {
    try {
        //obtener el query
        const {query} = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i')})
        res.json(producto)
    } catch (error) {
        res.send(error)
        next()
    }
}