var soap = require('soap');
var url = process.env.MGS_REST_BANCARD_SOAP_WSDL;
var endpoint_url = process.env.MGS_REST_BANCARD_SOAP_ENDPOINT;
var crypto = require('crypto');
var http = require('http');
var request = require('sync-request');
var moment = require('moment');
var querystring = require('querystring');
var applicationId = process.env.MGS_REST_BANCARD_USERNAME;
moment.locale('es-PY');
var cryptDecrypt = require('../../lib/utils/mgrs_cryptDecrypt');
var urlApi = process.env.MGS_API_URL_FORREST;
let debug = process.env.MGS_REST_DEBUG;
var logger = require('logger').createLogger('./logs/magis_client_rest_' + moment().format('YYYYMMDD') + '.log');
logger.format = function(level, date, message) {
    return date.getTime().toString() + ":: " + message;
};

/*
Funcion: recibe la clave de poliza sanitizada, hace un http POST a la api, en la cabecera se incluye un hash con la firma de cliente, y en el cuerpo del
paquete va la clave poliza, el mismo retorna los datos de la poliza para crear el soapClient y hacer el request, una vez que retorna la repuesta, se devuelve
al control principal, para su posterior salida.

http: [
    {
    authentication: <hash>
    },
    {
    body: <clave_poliza>
    }
]
*/

module.exports.ContractCadastreService = function(fecha) {
    if (fecha) {
        try {
            return new Promise((resolve, reject) => {
                let tkt_headers = {
                    'Content-Type': 'application/json'
                }
                let body = {
                    mode: 'rest',
                    appid: applicationId,
                    pass: process.env.MGS_REST_BANCARD_PASSWORD,
                    serial: crypto.pbkdf2Sync(process.env.MGS_REST_BANCARD_PASSWORD, process.env.MGS_REST_KEY, 1000, 64, 'sha512').toString('hex')
                }
                //console.log(urlApi);
                try {
                    var tkt = request('POST', urlApi + '/mgsGetTicket', {
                        headers: tkt_headers,
                        json: body
                    });
                    console.log(tkt);
                    if (debug) {
                        logger.info('[Info] ContractCadastreService:: Retorna ticket para getBody(): ' + JSON.stringify(JSON.parse(tkt.getBody('utf8'))));
                    }
                    var tktresu = JSON.parse(tkt.getBody('utf8'));
                    console.log(tktresu.ticket);

                    if (tktresu.ticket) {
                        var tkt_headers_getData = {
                            'Content-Type': 'application/json'
                        }
                        var body_getData = {
                            'ticket': tktresu.ticket,
                            'fecha': fecha,
                            'appid': applicationId
                        }
                        var getData = request('POST', process.env.MGS_API_URL_FORREST + '/mgrest/bancardContractCadastre/getData', {
                            headers: tkt_headers_getData,
                            json: body_getData
                        });
                        var resu = JSON.parse(getData.getBody('utf8'));
                        //se recorren todos los objetos obtenidos desde la base de datos.
                        var all_data = resu.bodyResponse;
                        for (var i in all_data) {
                            var sub_data = all_data[i];
                            for (var j in sub_data) {
                                //construir cliente soap y enviar los datos
                                try {
                                    //los valores que se envian a bancard se construyen en forma de json
                                    var args = {
                                        cod_usr: 'bbva',
                                        password: 'c0n50l1d4d4d4bbv455*',
                                        poliza: '007.0502.347089/000'
                                    };

                                    soap.createClient(url, function(err, client) {
                                        client.Execute(args, function(err, result) {
                                            f(err) {
                                                resolve(err);
                                                return;
                                            }
                                            console.log(result);
                                            console.log(client.describe());
                                        });
                                    }, endpoint_url);

                                } catch (errException) {
                                    resolve(errException);
                                }
                            }
                        }
                        resolve('ok');
                    } else {
                        resolve('error');
                    }

                } catch (err) {
                    return err;
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
