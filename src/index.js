require('./marionette_shim')
var data = require('../public/rippleds.json')

var App = new Backbone.Marionette.Application();

App.addRegions({
  mainRegion: '#content'
})

var Rippled = Backbone.Model.extend({
  parse: function(ip) {
    console.log('parse rippled', ip)
    return { ip: ip }
  }
})

var Rippleds = Backbone.Collection.extend()

var Domain = Backbone.Model.extend({
  defaults: {
    imageUrl: ""
  }
})

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

var RippledListItemView = Backbone.Marionette.ItemView.extend({
  template: _.template('<li><%= ip %></li>')
})

var domains = new Domains(Object.keys(data.rippleds).map(function(key) {
  return {
    domain: key,
    imageUrl: data.rippleds[key].imageUrl
  }
}))

var domainsListView = new DomainsListView({
  collection: domains
})

var DomainView = Backbone.Marionette.CompositeView.extend({
  template: '#domain-template',
  childView: RippledListItemView,
  childViewContainer: 'ul'
})

var Router = Backbone.Marionette.AppRouter.extend({
  routes : {
    "": "home",
    "domains/:domain" : "showDomain"
  },
  showDomain : function(domain){
    var model = new Domain({
      domain: domain,
      imageUrl: data.rippleds[domain].imageUrl
    })
    var rippleds = data.rippleds[domain]["ips"].map(function(ip) {
      return { ip: ip }
    })
    var collection = new Rippleds(rippleds)
    var domainView = new DomainView({
      model: model,
      collection: collection
    })
    App.mainRegion.show(domainView)
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

