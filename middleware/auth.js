const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //autorizacion por el header
    const authHeader = req.get('Authorization')

    if(!authHeader) {
        const error = new Error('NO autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token
    const token = authHeader.split(' ')[1];
    let revisarToke; 
    try {
        revisarToke = jwt.verify(token, 'LLAVE')
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    if(!revisarToke) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }
    next()
}
   