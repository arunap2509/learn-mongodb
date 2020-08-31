// @ts-nocheck
const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of db', () => {

    let joe;

    beforeEach((done) => {

        joe = new User({name: "Joe"});
        joe.save().then(() => {
            done();
        });
    })

    it("finding user with a name of joe", (done) => {
        User.find({name: 'Joe'}).then((users) => {
            // mongoose even before saving the data into the db creates a unique id
            assert(joe._id.toString() === users[0]._id.toString());
            done();
        })
    });

    it("find a particular user", (done) => {
        User.findOne({ _id: joe._id}).then((user) => {
            assert(user.name == "Joe");
            done();
        })
    });

});