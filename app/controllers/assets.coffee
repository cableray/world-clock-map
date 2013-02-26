path = require 'path'
coffee_connect= require 'connect-coffee-script'

js_options= {
  src:path.normalize(__dirname + '/../../assets/js/'),
  dest:path.normalize(__dirname + '/../../public/javascripts/'),
}

css_options= {
  src:path.normalize(__dirname + '/../../assets/stylesheets/'),
  dest:path.normalize(__dirname + '/../../public/stylesheets/'),
}

module.exports = (app)->

  app.use coffee_connect(js_options)
  app.use require('less-middleware')(css_options)
  

