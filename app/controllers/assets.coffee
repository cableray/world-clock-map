path = require 'path'
stitch= require 'stitch'

js_package= stitch.createPackage(
  paths : [path.normalize(__dirname + '/../../public/javascripts/')]
)

module.exports = (app)->

  app.get '/application.js', js_package.createServer()

