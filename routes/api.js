var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User');
var Book = require('../models/Propriedade');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

router.post('/register', function(req, res) {
  if (!req.body.email || !req.body.password || !req.body.nome) {
    res.json({success: false, msg: 'Todos os campos são necessários'});
  } else {
    var newUser = new User({
      email: req.body.email,
      nome: req.body.nome,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Email já cadastrado', wtf: err});
      }
      return res.json({success: true, msg: 'Usuário criado com sucesso'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Falha na autenticação'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Falha na autenticação'});
        }
      });
    }
  });
});

/*
* Cria uma nova propriedade
*/
router.post('/propriedade', passport.authenticate('jwt', { session: false }), function(req, res) {
	var token = getToken(req.headers);
	if (token) {
		console.log(req.body);
		var newPropriedade = new Propriedade({
			nome: req.body.nome,
			descricao: req.body.descricao,
			dono: req.body.dono
		});

		newPropriedade.save(function(err) {
			if (err) {
				return res.json({success: false, msg: 'Falha na criação.'});
			}
			res.json({success: true, msg: 'Propriedade criada.'});
		});
	} 
	else {
		return res.status(403).send({success: false, msg: 'Não autorizado.'});
	}
});

/*
* Lista propriedades
*/
//TODO usar token pra puxar lista de propriedades da qual o usuário seja dono
router.get('/propridade', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Propriedade.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Não autorizado.'});
  }
});


/*
* Obtem o token do header
*/
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = router;