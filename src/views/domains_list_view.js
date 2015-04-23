require('../marionette_shim')
import DomainListItemView from './domain_list_item_view'

export default Backbone.Marionette.CollectionView.extend({
  childView: DomainListItemView,
  className: 'domains-list',
  tagName: 'ul'
})


