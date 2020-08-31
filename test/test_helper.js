const mongoose = require('mongoose');

// setting this to get rid of the warning
mongoose.Promise = global.Promise;

// before and beforeEach are all hooks of mocha
// before runs only once for all tests
// beforeEach runs before all tests

before((done) => {

    mongoose.connect("mongodb://localhost/user_test", { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    
    mongoose.connection
        .once('open', () => {done();})
        .on('error', (error) => console.log("Warning", error));
})


beforeEach((done) => {
    const {users, blogposts, comments} = mongoose.connection.collections;
    users.drop(() => {
        blogposts.drop(() => {
            comments.drop(() => {
                done();
            })
        })
    });
});