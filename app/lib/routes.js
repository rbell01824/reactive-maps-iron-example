Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

Router.route('/', {
    name: 'home',
    controller: 'HomeController',
    action: 'action',
    where: 'client'
});

Router.route('mapmarkers', {
    name: 'mapmarkers',
    //controller: 'MapmarkersController',
    subscriptions: function(){
        return Meteor.subscribe('mapmarkers');
    },
    //action: 'action',
    action: function(){
        if (this.ready()){ this.render(); }
        else { this.render('Loading')}
    },
    where: 'client'
});