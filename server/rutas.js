const Router = require('express').Router(),
      dbConn = require('./CRUD')

Router.post('/',function (req,res) {
    var email = req.body.email;
    let pass = req.body.pass;
    const conn = dbConn();
    conn.query('SELECT * FROM user WHERE user_email="'+email+'";',(err,result) => {
        if(err){
            res.send(err);
        }else{
            if (result.length == 0) {
                let jsonRes = {
                    msg: 'FALSE',
                }
                res.send(jsonRes)
            } else {
                let pass_db = result[0].user_password;
                if (pass_db == pass) {
                    let jsonRes = {
                        msg: 'OK',
                        id_user: result[0].iduser
                    }
                    res.send(jsonRes)
                } else {
                    let jsonRes = {
                        msg: 'FALSE',
                    }
                    res.send(jsonRes)
                }
            }
        }
    });
});

Router.post('/info',function (req,res) {
    res.send(req.session.userId)
})

Router.get('/getProducts',function (req,res) {
    const conn = dbConn();
    conn.query('SELECT * FROM productos;',(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result)
        }
    });
})

Router.post('/detail-product',function (req,res) {
    let id = req.body.id;
    const conn = dbConn();
    conn.query('SELECT * FROM productos WHERE idproductos='+id+';',(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result)
        }
    });
})

Router.post('/add-product',function (req,res) {
    let idUser = req.body.idUser
    let id = req.body.id;
    let cantidad = req.body.cantidad;
    let precio = req.body.precio;
    const conn = dbConn();
    conn.query('INSERT INTO pedidos (id_user,id_producto,cantidad,precio,estado) VALUES ('+idUser+','+id+','+cantidad+','+precio+',"pendiente");',(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send('Se ha añadido tu producto')
        }
    });
})

Router.post('/car-shop',function (req,res) {
    let id = req.body.id;
    const conn = dbConn();
    conn.query('SELECT q_disponibles,idpedidos,id_producto,cantidad,pedidos.precio,productos.imagen,productos.nombre FROM pedidos JOIN productos ON productos.idproductos = pedidos.id_producto WHERE pedidos.id_user="'+id+'" AND pedidos.estado="pendiente";',(err,result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result)
        }
    });
})

Router.post('/pago-pedido',function (req,res) {
    let id = req.body.id;
    const products = req.body.products;
    const conn = dbConn();
    conn.query('UPDATE pedidos SET estado="pagado" WHERE (id_user='+id+');',(err,result) => {
        if(err){
            let jsonRes = {
                msg: 'FALSE'
            }
            res.send(jsonRes)
        }else{
            let jsonRes = {
                msg: 'OK'
            }
            res.send(jsonRes)
        }
    });
    products.forEach(product => {
        let id = product.idProducto;
        let saldo = product.saldo;
        conn.query('UPDATE productos SET q_disponibles='+saldo+' WHERE (idproductos='+id+');',(err,result) => {
            if(err){
            }else{
            }
        });
    });
})


module.exports = Router