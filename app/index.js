'use strict'

const path        = require('path')

const express 		= require('express')
const exphbs 		  = require('express-handlebars')
const session     = require('express-session')
const bodyParser  = require('body-parser')
const helmet      = require('helmet')
const passport    = require('passport')
const handlers    = require('./handlers.js');

const RedisStore		= require('connect-redis')(session)
const OktaJwtVerifier 	= require('@okta/jwt-verifier');
var cors 				= require('cors');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-400194.oktapreview.com/oauth2/default',
  assertClaims: {
    aud: 'api://default',
  },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];

  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

const config 	= require('../config')
const app 		= express()

app.use(session({
	store: new RedisStore({
		url: config.redisStore.url
	}),
	secret: config.redisStore.secret,
	resave: false,
	saveUninitialized: false
}))

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json([{
    message: 'Hello, word!'
  }]);
});

// app.use(oidc.router); ??
// app.get('/', handlers.scenarios);
// app.get('/authorization-code/login-redirect', handlers.loginRedirect);
// app.get('/authorization-code/profile', handlers.profile);
// app.get('/authorization-code/logout', handlers.logout);

// app.use(passport.initialize())
// app.use(passport.session())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

app.engine('.hbs', exphbs({
  	defaultLayout: 'main',
  	extname: '.hbs',
	layoutsDir: path.join(__dirname, '../views/layouts'),
  	partialsDir: path.join(__dirname, '../views')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../views'))

// require('./authentication').init(app)
require('./testcomponent').init(app)

module.exports = app