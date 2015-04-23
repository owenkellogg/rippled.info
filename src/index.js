require('./marionette_shim')
var data = require('../public/rippleds.json')

var App = new Backbone.Marionette.Application();

App.addRegions({
  mainRegion: '#content'
})

var Rippled = Backbone.Model.extend({
  parse: function(ip) {
    return { ip: ip }
  }
})

var Rippleds = Backbone.Collection.extend()

var Domain = Backbone.Model.extend()

var Domains = Backbone.Collection.extend({
  model: Domain
})

var DomainListItemView = Backbone.Marionette.ItemView.extend({
  template: '#domain-list-item-template'
})

var DomainsListView = Backbone.Marionette.CollectionView.extend({
  childView: DomainListItemView,
  className: 'domains-list',
  tagName: 'ul'
})

var domains = new Domains(Object.keys(data.rippleds).map(function(key) {
  return { domain: key }
}))

var domainsListView = new DomainsListView({
  collection: domains
})

var DomainView = Backbone.Marionette.CompositeView.extend({
  template: '#domain-template',
  childViewContainer: 'ul'
})

var Router = Backbone.Marionette.AppRouter.extend({
  routes : {
    "": "home",
    "domains/:domain" : "showDomain"
  },
  showDomain : function(domain){
    var model = new Domain({ domain: domain })
    var domainView = new DomainView({
      model: model,
      collection: new Rippleds(data.rippleds[domain]),
      templateHelpers: function() {
        return { item: model.toJSON() }
      }
    })
    App.mainRegion.show(domainView)
    console.log(data.rippleds[domain])
  },
  home: function() {
    var domainsListView = new DomainsListView({
      collection: domains
    })
    App.mainRegion.show(domainsListView)
  }
});

App.addInitializer(function(options) {
  var router = new Router();
  Backbone.history.start();
})

App.start()

