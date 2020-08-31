// @ts-nocheck
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');
const assert = require('assert');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        //minlength: [3, "Name should be at least 3 characters."],
        validate: {
            validator : (name) => name.length >= 3,
            message: "Name should be at least 3 characters."
        }
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{type: Schema.Types.ObjectId, ref: "blogPost"}]
});

// this wont get saved to the database
// and we are not using arrow function because instead of accessing this particular users schema this in arrow function will access this files this which wont give us the correct count

UserSchema.virtual("postCount").get(function () {
    return this.posts.length;
});

UserSchema.pre('remove', function(next) {
    // instead of requiring blogpost we can get access to it like this
    const BlogPost = mongoose.model('blogPost');

    // to remove all blogposts if the user deletes his account
    BlogPost.remove({ _id : { $in : this.blogPosts}})
    .then(() => next())
});

const User = mongoose.model("user", UserSchema);

module.exports = User;