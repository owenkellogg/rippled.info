require('./marionette_shim')
var data = require('../public/rippleds.json')

import Domain             from './models/domain'
import Rippled            from './models/rippled'
import Domains            from './collections/domains'
import Rippleds           from './collections/rippleds'
import DomainListItemView from './views/domain_list_item_view'
import DomainsListView    from './views/domains_list_view'
import DomainView         from './views/domain_view'

var App = new Backbone.Marionette.Application();

App.addRegions({
  mainRegion: '#content'
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

var Router = Backbone.Marionette.AppRouter.extend({
  routes : {
    "": "home",
    "domains/:domain" : "showDomain",
    "domains/:domain/:ip" : "showRippled"
  },
  showDomain : function(domain){
    var model = new Domain({
      domain: domain,
      imageUrl: data.rippleds[domain].imageUrl
    })
    var rippleds = data.rippleds[domain]["ips"].map(function(ip) {
      return {
        ip: ip,
        domain: domain
      }
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
  },
  showRippled: function(domain, ip) {
    console.log('ip', ip)
  }
});

App.addInitializer(function(options) {
  var router = new Router();
  Backbone.history.start();
})

App.start()

