require('../marionette_shim')

export default class Rippled extends Backbone.Model {
  parse(ip) {
    console.log('parse rippled', ip)
    return { ip: ip }
  }
}


