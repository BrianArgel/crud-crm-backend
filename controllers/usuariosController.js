const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
exports.registrarUsuario = async(req, res) => {
    //leer los datos del usuarios 
    const usuario = new Usuarios(req.body)
    usuario.password = await bcrypt.hash(req.body.password, 12)

    try {
        await usuario.save()
        res.json({ mensaje: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error)
        res.json({ mensaje: 'error'})
    }
}

exports.autenticarUsuario = async(req, res, next) => {
    //buscar el usuario 
    const {email, password} = req.body;
    const usuario = await Usuarios.findOne({ email })
    
    if(!usuario) {
        //si el usuario no existe
        await res.status(401).send({ mensaje: 'Ese usuario no existe'})
        next();
    }else {
        //usuario  existe verificar si el password el correcto
        if(!bcrypt.compareSync(password, usuario.password)){
            //password incorrecto
            await res.status(401).send({ mensaje: 'Contraseña invalida'})
            next();
        } else {

            //passwor correcto firmar el token 
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id

            }, 'LLAVE', {
                expiresIn: '1h'
            })

            res.json({token})
        }
    }
}