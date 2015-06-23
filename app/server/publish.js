/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */

Meteor.publish('eroute', function (/* args */) {
  return Eroute.find();
});

Meteor.publish('mapmarkers', function (/* args */) {
  return Mapmarkers.find();
});