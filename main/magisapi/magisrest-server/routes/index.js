var express = require('express');
var router = express.Router();
//const sanitize = require('../lib/utils/mgrs_sanitizer');
var validator = require('validator');
const ctrlBbvaCadastre = require('../controllers/bancard/contractCadastre');
/* --------------------------------------------------------------------------------------------------------------------------------
                                                                            RUTAS PRIVADAS (DESDE LA LAN)
---------------------------------------------------------------------------------------------------------------------------------*/

router.get('/bancard/catastro/:fecha', function(req, res, next) {
    //var policy = sanitize.bancardCatastroSanitizer(req);
    var date = validator.escape(req.params.fecha);
    if (date) {
      console.log(date);
        //var ctrlCadastre = require('../controllers/bancard/contractCadastre');
        ctrlBbvaCadastre.ContractCadastreService(date).then(data => {
            console.log(data);
            res.status(200).json({
                resultado: 'ok'
            });
        });

    } else {
        res.status(200).json({
            resultado: 'error'
        });
    }
});









/* --------------------------------------------------------------------------------------------------------------------------------
                                                                            RUTAS PUBLICAS (DESDE AFUERA)
---------------------------------------------------------------------------------------------------------------------------------*/

// CONTROLADORES REST


// RUTAS DE LA API

//BANCARD
//router.get('/bancard/catastro/:clavepoliza', bancardCatastroController.CatastroContrato);
//router.route('/bancard/catastro/:clavepoliza').get();
/*router.get('/bancard/catastro/:clavepoliza',function(req,res,next){
  var resu = bancardCatastroController.CatastroContrato(req);
  res.status(200).json({resultado:resu});
});*/

module.exports = router;
