var mongoose = require('mongoose');
var config = require('./database');

var TipoCultivar = require('../models/TipoCultivar');
var EstadoFenologico = require('../models/EstadoFenologico');
var fs = require('fs');

function initTipoCultivar(){
    // Inicializa TipoCultivar
    TipoCultivar.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        // Caso vazio, inicializa de acordo com o json
        if (!doc || doc.length === 0) {
            console.log('Inicializando TipoCultivar');
            console.log(__filename);
            fs.readFile('../models/data/tipocultivar.json', function (fsErr, fsData) {
                if (fsErr) {
                    console.log(fsErr);
                    return;
                }
                
                var data = JSON.parse(fsData);
                data.forEach(element => {
                    var tipo = new TipoCultivar({
                        nome: element.nome
                    });
                    
                    // Salva cada elemento
                    tipo.save(function (saveErr,cultivar) {
                        if(saveErr){
                            console.log(saveErr);
                            return;
                        }
                        
                        // Tenta buscar pelo json de estado fenologico
                        fs.readFile('../models/data/estadofenologico' + element.nome.toLowerCase() + '.json', function (fs2Err, fs2Data) {
                            if (fs2Err) {
                                console.log(fs2Err);
                                return;
                            }
    
                            var data2 = JSON.parse(fs2Data);
                            data2.forEach(element2 => {
                                var estado = new EstadoFenologico({
                                    ordem: element2.ordem,
                                    sigla: element2.sigla,
                                    nome: element2.nome,
                                    tipo_cultivar_id: cultivar.id
                                });
    
                                estado.save();
                            })
                        });
    
                    });
    
                });
    
    
            });
        }
    })
}

exports.db_init = function () {
    console.log("Inicializando banco de dados");
    
    initTipoCultivar();
    
    console.log("Banco de dados inicializado");
}

module.export = exports;