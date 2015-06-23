Mapmarkers = new Mongo.Collection('mapmarkers');

if (Meteor.isServer) {
    Mapmarkers.allow({
        insert: function (userId, doc) {
            return true;
        },

        update: function (userId, doc, fieldNames, modifier) {
            return true;
        },

        remove: function (userId, doc) {
            return true;
        }
    });

    //Mapmarkers.deny({
    //  insert: function (userId, doc) {
    //    return true;
    //  },
    //
    //  update: function (userId, doc, fieldNames, modifier) {
    //    return true;
    //  },
    //
    //  remove: function (userId, doc) {
    //    return true;
    //  }
    //});
}
