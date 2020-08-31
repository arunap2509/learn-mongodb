// @ts-nocheck
const assert = require('assert');
const User = require('../src/user');

describe("Subdocument", () => {
    it("testing for subdocuments", (done) => {
        const joe = new User({
            name: "Joe",
            posts: [{title: "PostTitle"}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) =>  {
                assert(user.posts[0].title === "PostTitle");
                done();
            });
    });

    it("adding post to existing user", (done) => {
        const joe = new User({
            name: "Joe",
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) =>  {
               user.posts.push({title: "New Post"})
               return user.save();
            }).then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === "New Post");
                done();
            });
    });
});