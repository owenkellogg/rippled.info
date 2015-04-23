require('../marionette_shim')

import RippledListItemView from './rippled_list_item_view'

export default Backbone.Marionette.CompositeView.extend({
  template: '#domain-template',
  childView: RippledListItemView,
  childViewContainer: 'ul'
})


