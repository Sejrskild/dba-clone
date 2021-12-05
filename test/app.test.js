// Import assert from Chai to compare values
const assert = require('chai').assert;
// As this is an API function, a request module must be imported to run tests
const request = require('supertest');
// Import the API
const app = require('../server');
// Import Database
const db = require('../src/helpers/db');

describe('POST /users/create', () => {
    it('User should be created and added to database', done => {
        const userModel = {
            email: 'noeremil@gmail.com',
            password: '123',
        };

        request(app)
            .post('/users/create')
            .send(userModel)
            .then(res => {
                const response = res.body;

                // Make sure the response of the API is 'true'
                assert.equal(response, true);
                // Make sure the user was correctly added to the database ( use deepEqual for arrays and objects )
                assert.deepEqual(db.findUser(userModel), userModel);
                // End test
                done();
            })
            .catch(done);
    });
});
