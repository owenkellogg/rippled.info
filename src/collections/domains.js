require('../marionette_shim')
import Domain from '../models/domain'

export default Backbone.Collection.extend({
  model: Domain
})


