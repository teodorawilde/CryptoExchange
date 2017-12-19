const path = require('path')

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine('.hbs', exphbs({
  	defaultLayout: 'main',
  	extname: '.hbs',
	layoutsDir: path.join(__dirname, '../views/layouts'),
  	partialsDir: path.join(__dirname, '../views')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../views'))

app.use(express.static(path.join(__dirname, '../public')));

require('./testcomponent').init(app)

module.exports = app