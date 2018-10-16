var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/User');
var Propriedade = require('../models/Propriedade');
var Talhao = require('../models/Talhao');

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
          res.json({ success: true, token: 'bearer ' + token, userid: user.id});
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
// router.post('/propriedade', passport.authenticate('jwt', { session: false }), function(req, res) {
router.post('/propriedade', function(req, res) {
  var token = getToken(req.body);

	if (token) {
    let data = req.body.data;
    // /*
    var newPropriedade = new Propriedade({
			nome: data.nome,
			descricao: data.desc,
      dono: data.dono,
      location: {
        type: 'Point',
        coordinates: [data.loc.x, data.loc.y]
      }
		});

    newPropriedade.save(function(err) {
			if (err) {
        console.log(err);
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
// router.get('/propridade', passport.authenticate('jwt', { session: false }), function(req, res) {
  router.get('/propriedade', function(req, res) {
    var token = getToken(req.headers);
    
    if (token) {
      
      Propriedade.find({'dono': req.headers.userid}, function (err, obj) {
      if (err) return next(err);
      res.json(obj);
    });
    
  } else {
    return res.status(403).send({success: false, msg: 'Não autorizado.'});
  }
});


/*
* Lista propriedade especifica
*/
router.get('/propriedade/:propid', function(req, res) {
  var token = getToken(req.headers);
  
  if (token) {

    Propriedade.findById(propid, function (err, obj) {
      if (err) return next(err);
      res.json(obj);
    });

  } else {
    return res.status(403).send({success: false, msg: 'Não autorizado.'});
  }
});

/*
* Lista talhões
*/
router.get('/talhao', function(req, res) {
  var token = getToken(req.headers);
  
  if (token) {
    
    Talhao.find({'propriedade_id': req.headers.propid}, function (err, obj) {
      if (err) return next(err);
      res.json(obj);
    });
    
  } else {
    return res.status(403).send({success: false, msg: 'Não autorizado.'});
  }
});

/*
* Lista talhão especifico
*/
router.get('/talhao/:talhaoid', function(req, res) {
  var token = getToken(req.headers);
  
  if (token) {
    
    Talhao.findById(req.params.talhaoid, function (err, obj) {
      if (err) return next(err);
      res.json(obj);
    });
    
  } else {
    return res.status(403).send({success: false, msg: 'Não autorizado.'});
  }
});

/*
* Cadastra talhão
*/
router.post('/talhao', function (req, res) {
  var token = getToken(req.body);
  
  if (token) {
    let data = req.body.data;
    
    var newTalhao = new Talhao({
      nome: data.nome,
      propriedade_id: data.propid,
      //TODO
      kml_path: '',
      location: {
        type: 'Point',
        coordinates: [data.loc.x, data.loc.y]
      }
    });

    newTalhao.save(function (err) {
      if (err) {
        console.log(err);
        return res.json({ success: false, msg: 'Falha na criação.' });
      }
      res.json({ success: true, msg: 'Talhão criada.' });
    });
  }
  else {
    return res.status(403).send({ success: false, msg: 'Não autorizado.' });
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