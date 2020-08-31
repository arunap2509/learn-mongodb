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

    it("removing an user", (done) => {
        joe.remove()
        .then(() => User.findOne({name: "Joe"}))
        .then((user) => {
            assert(user === null);
            done();
        })
    });

    it("class based removing", (done) => {
        // remove multiple records
        User.deleteMany({name: "Joe"})
        .then(() => User.findOne({name: "Joe"}))
        .then((user) => {
            assert(user === null);
            done();
        })
    });

    it("find one and remove", (done) => {
        // remove multiple records
        User.findOneAndRemove({name: "Joe"})
        .then(() => User.findOne({name: "Joe"}))
        .then((user) => {
            assert(user === null);
            done();
        })
    });

    it("find by id and remove", (done) => {
        // remove multiple records
        User.findByIdAndRemove(joe._id)
        .then(() => User.findOne({name: "Joe"}))
        .then((user) => {
            assert(user === null);
            done();
        })
    });

});