// @ts-nocheck
const assert = require('assert');
const User = require('../src/user');

describe("validating message", () => {

    it("validation for name prop", (done) => {

        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;

        //console.log(message);

        assert(message === "Name is required.");
        done();
    });

    it("validation for length for name", (done) => {

        const user = new User({name: 'al'});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;

        assert(message === "Name should be at least 3 characters.");
        done();
    });

    // it("validation for name to be arun", (done) => {

    //     const user = new User({name: 'adam'});
    //     const validationResult = user.validateSync();
    //     const {message} = validationResult.errors.name;

    //     //assert(message === "Name should be Arun.");
    //     done();
    // });

    it("disallow invalid records", (done) => {
        const joe = new User({name: "jo"})

        joe.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;

                assert(message === "Name should be at least 3 characters.");
                done();
            })
    })
});