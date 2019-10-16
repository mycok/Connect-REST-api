import { expect, chaiWithHttp } from './fixtures/chai.setup';
import app from '../src/server/express';
import dbConnection from '../src/databse/index';
import modelData from './fixtures/userModel';

const baseUrl = '/connect/v1';

describe('user model CRUD operations', function () {
  let connection;
  let user;
  before('this test suite runs, make a mongodb connection', function (done) {
    connection = dbConnection();
    done();
  });

  after('this test suite runs, close the mongodb connection', function (done) {
    connection.collections.users.drop().then(
      connection.close().then(() => done()),
    );
  });

  context('if user registration is attempted by providing less than the required number of parameters', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.UserObjectWithLessThanRequiredParams)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.sample).to.includes(
            {
              name: 'sample-name',
              email: 'sample-email',
              password: 'sample-password',
            },
          );
          expect(res.body.error).to.equal('User object requires only three properties');
          done(err);
        });
    });
  });

  context('if user registration is attempted by providing more than the required number of parameters', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.UserObjectWithLessThanRequiredParams)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.sample).to.includes(
            {
              name: 'sample-name',
              email: 'sample-email',
              password: 'sample-password',
            },
          );
          expect(res.body.error).to.includes('User object requires only three properties');
          done(err);
        });
    });
  });

  context('if user registration is attempted by passing an empty string for a name ', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.UserObjectWithNameAsEmptyString)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.error).to.equal('A name is required!');
          done(err);
        });
    });
  });

  context('if user registration is attempted by passing a name with less than three characters ', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.userWithInvalidNameCharacterLength)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.error).to.equal('A username must contain atleast 3 characters!');
          done(err);
        });
    });
  });

  context('if user registration is attempted by passing an email as an empty string ', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.UserObjectWithEmailAsEmptyString)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.error).to.equal('An email address is required!');
          done(err);
        });
    });
  });

  context('if user registration is attempted by passing an email with an invalid format ', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.userWithInvalidEmailFormat)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.error).to.equal('Please provide a valid email address!');
          done(err);
        });
    });
  });

  context('if user registration is attempted by passing a password as an empty string ', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.userWithPasswordAsEmptyString)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.error).to.equal('A password is required!');
          done(err);
        });
    });
  });

  context('if user registration is attempted by passing a password with an invalid format ', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.userWithInvalidPasswordFormat)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.error).to.equal(
            'A password must contain a minimum of 8 characters including atleast one an uppercase, lowercase, number and a special character!',
          );
          done(err);
        });
    });
  });

  context('if user registration is attempted by passing a password with less than eight characters', function () {
    it('should throw an error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.userWithInValidPasswordLength)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('error');
          expect(res.body.error).to.equal(
            'A password must contain a minimum of 8 characters including atleast one an uppercase, lowercase, number and a special character!',
          );
          done(err);
        });
    });
  });

  context('if user registration is attempted by providing valid user parameters', function () {
    it('should successfully register a user', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.validUserObject)
        .end(function (err, res) {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Account creation successful');
          done(err);
        });
    });
  });

  context('after successful user registration, if signin is attempted by providing a wrong email', function () {
    it('should throw a user with provided email doesnot exist error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/signin`)
        .set('Accept', 'application/json')
        .send(modelData.loginWithWrongEmail)
        .end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal(`User with email ${modelData.loginWithWrongEmail.email} doesn't exist!`);
          done(err);
        });
    });
  });

  context('after successful user registration, if signin is attempted by providing a wrong password', function () {
    it('should throw a password mis-match error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/signin`)
        .set('Accept', 'application/json')
        .send(modelData.loginWithWrongPassword)
        .end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Provided password does not match the registered password!');
          done(err);
        });
    });
  });

  context('after successful user registration, if signin is attempted by providing valid user parameters', function () {
    it('should successfully signin a user', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/signin`)
        .set('Accept', 'application/json')
        .send(modelData.validLoginUserObject)
        .end(function (err, res) {
          user = res.body.data;
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(`${user.name} has successfully signed in!`);
          expect(res.body.data).to.own.property('token');
          done(err);
        });
    });
  });
  context('if a user wants to view all users', function () {
    it('should return an array of user objects', function (done) {
      chaiWithHttp
        .request(app)
        .get(`${baseUrl}/users`)
        .set('Authorization', `Bearer ${user.token}`)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.data[0]).to.include(
            {
              name: 'test-user',
            },
          );
          done(err);
        });
    });
  });

  context('if a user wants to view their personal data by providing a valid user id', function () {
    it('should return all the relevant data for that specific user', function (done) {
      chaiWithHttp
        .request(app)
        .get(`${baseUrl}/users/${user._id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('success');
          expect(res.body.data.name).to.equal('test-user');
          expect(res.body.data.email).to.equal('somerandomemail@test.now');
          done(err);
        });
    });
  });

  context('if user registration is attempted by providing duplicate user properties', function () {
    this.timeout(2000);
    it('should throw a [property] already exists error', function (done) {
      chaiWithHttp
        .request(app)
        .post(`${baseUrl}/users`)
        .set('Accept', 'application/json')
        .send(modelData.validUserObject)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal(': name already exists');
          done(err);
        });
    });
  });

  context('if a user wants to view their personal data but provides a wrong id', function () {
    it('should throw a user not found error', function (done) {
      chaiWithHttp
        .request(app)
        .get(`${baseUrl}/users/5da0d90b883782c3c9233196`)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('User not found!');
          done(err);
        });
    });
  });

  context('if a user wants to update their personal data but provides a wrong id', function () {
    it('should throw a user not found error', function (done) {
      chaiWithHttp
        .request(app)
        .put(`${baseUrl}/users/5da0d90b883782c3c9233196`)
        .set('Accept', 'application/json')
        .send({ name: 'someRandomName' })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('User not found!');
          done(err);
        });
    });
  });

  context('if a user wants to update their personal data without signing in', function () {
    it('should throw a no token error', function (done) {
      chaiWithHttp
        .request(app)
        .put(`${baseUrl}/users/${user._id}`)
        .set('Accept', 'application/json')
        .send({ name: 'someRandomName' })
        .end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('No authorization token was found');
          done(err);
        });
    });
  });

  context('if a user wants to update their personal data by providing an invalid token', function () {
    it('should throw an invalid token error', function (done) {
      chaiWithHttp
        .request(app)
        .put(`${baseUrl}/users/${user._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${modelData.invalidToken}`)
        .send({ name: 'someRandomName' })
        .end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('invalid token');
          done(err);
        });
    });
  });

  context('if a user wants to update another persons data by providing a his token', function () {
    it('should throw an unauthorized error', function (done) {
      chaiWithHttp
        .request(app)
        .put(`${baseUrl}/users/${user._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${modelData.anotherUsersToken}`)
        .send({ name: 'someRandomName' })
        .end(function (err, res) {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Unauthorized access!');
          done(err);
        });
    });
  });

  context('if a user wants to update their name but provides a name that already exists', function () {
    it('should throw a duplicate error', function (done) {
      chaiWithHttp
        .request(app)
        .put(`${baseUrl}/users/${user._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${user.token}`)
        .send({ name: `${user.name}` })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('duplicate');
          expect(res.body.duplicate).to.equal(`${user.name} already exists!`);
          done(err);
        });
    });
  });

  context('if a user wants to update their email but provides an email that already exists', function () {
    it('should throw a duplicate error', function (done) {
      chaiWithHttp
        .request(app)
        .put(`${baseUrl}/users/${user._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${user.token}`)
        .send({ email: `${user.email}` })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body).to.own.property('duplicate').to.equal(`${user.email} already exists!`);
          done(err);
        });
    });
  });

  context('if a user wants to update their personal data by passing valid values', function () {
    it('should successfully update the users data', function (done) {
      chaiWithHttp
        .request(app)
        .put(`${baseUrl}/users/${user._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${user.token}`)
        .send({ name: 'test-user-1' })
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.own.property('message').to.equal('success');
          expect(res.body).to.own.property('data');
          expect(res.body.data.name).to.equal('test-user-1');
          done(err);
        });
    });
  });

  context('if a user wants to delete their user account by providing a wrong id', function () {
    it('should throw a user not found error', function (done) {
      chaiWithHttp
        .request(app)
        .delete(`${baseUrl}/users/5da0d90b883782c3c9233196`)
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('User not found!');
          done(err);
        });
    });
  });

  context('if a user wants to delete their user account by providing a valid token and user_id', function () {
    it('should successfully delete a users account', function (done) {
      chaiWithHttp
        .request(app)
        .delete(`${baseUrl}/users/${user._id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.data.deletedCount).to.equal(1);
          done(err);
        });
    });
  });

  context('if a user wants to signout', function () {
    it('should successfully signout a user', function (done) {
      chaiWithHttp
        .request(app)
        .get(`${baseUrl}/signout`)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Signed out');
          done(err);
        });
    });
  });
});
