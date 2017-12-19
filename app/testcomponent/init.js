function init(app) {
	app.get('/', renderWelcome)
}

function renderWelcome (req, res) {
	console.log("asked for me?")
  	res.render('testcomponent/welcome')
}

module.exports = init