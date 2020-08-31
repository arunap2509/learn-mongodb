// @ts-nocheck
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");
const assert = require("assert")

describe("Assertion", () => {
    beforeEach((done) => {
        const joe = new User({
            name: "Joe"
        });

        const blogPost = new BlogPost({
            title: "New Post",
            content: "about personal website"
        });

        const comment = new Comment({
            content: "like this post"
        });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    })

    it("testing assertion", (done) => {
        User.findOne({
                name: "Joe"
            })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === "New Post")

                done();
            })
    })

    it("testing all nested documents", (done) => {
        User.findOne({
                name: "Joe"
            })
            .populate({
                path: "blogPosts",
                populate: {
                    path: "comments",
                    model: "comment"
                }
            })
            .then((user) => {
                console.log(user);
                done();
            })
    });
});