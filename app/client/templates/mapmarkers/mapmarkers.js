
Meteor.startup(function() {
    GoogleMaps.load();
});

/*****************************************************************************/
/* Mapmarkers: Event Handlers */
/*****************************************************************************/
Template.Mapmarkers.events({
});

/*****************************************************************************/
/* Mapmarkers: Helpers */
/*****************************************************************************/
Template.Mapmarkers.helpers({
});

/*****************************************************************************/
/* Mapmarkers: Lifecycle Hooks */
/*****************************************************************************/
Template.Mapmarkers.created = function () {
};

Template.Mapmarkers.rendered = function () {
};

Template.Mapmarkers.destroyed = function () {
};

Template.Mapmarkers.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
        google.maps.event.addListener(map.instance, 'click', function(event) {
            console.log('insert');
            Mapmarkers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        });

        var markers = {};

        Mapmarkers.find().observe({
            added: function (document) {
                console.log('added');
                var marker = new google.maps.Marker({
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(document.lat, document.lng),
                    map: map.instance,
                    id: document._id
                });

                google.maps.event.addListener(marker, 'dragend', function(event) {
                    Eroute.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
                });

                markers[document._id] = marker;
            },
            changed: function (newDocument, oldDocument) {
                console.log('changed');
                markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
            },
            removed: function (oldDocument) {
                console.log('removed');
                markers[oldDocument._id].setMap(null);
                google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
                delete markers[oldDocument._id];
            }
        });
    });
});

Template.Mapmarkers.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8
            };
        }
    }
});
