const UserObjectWithLessThanRequiredParams = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
};

const UserObjectWithMoreThanRequiredParams = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
  password: 'somEraNdom#pass62',
  Bio: '',
  photo: '',
};

const UserObjectWithNameAsEmptyString = {
  name: '',
  email: 'somerandomemail@test.now',
  password: 'somEraNdom#pass62',
};

const userWithInvalidNameCharacterLength = {
  name: 'te',
  email: 'somerandomemail@test.now',
  password: 'somEraNdom#pass62',
};

const UserObjectWithEmailAsEmptyString = {
  name: 'test-user',
  email: '',
  password: 'somEraNdom#pass62',
};

const userWithInvalidEmailFormat = {
  name: 'test-user',
  email: 'somerandomemailtest.now',
  password: 'somEraNdom#pass62',
};

const userWithPasswordAsEmptyString = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
  password: '',
};

const userWithInvalidPasswordFormat = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
  password: 'somEraNdompass',
};

const userWithInValidPasswordLength = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
  password: 'somE#2',
};

const validUserObject = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
  password: 'somEraNdom#pass62',
};

const validLoginUserObject = {
  email: 'somerandomemail@test.now',
  password: 'somEraNdom#pass62',
};

const loginWithWrongEmail = {
  email: 'somerandomemail@tests.now',
  password: 'somEraNdom#pass62',
};

const loginWithWrongPassword = {
  email: 'somerandomemail@test.now',
  password: 'somEraNdom#pass626',
};

const invalidToken = 'teyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE2NDFlMTA3ZTQ4OWFkNjdkZjE3OWEiLCJlbWFpbCI6InNvbWVlbWFpbEBub3cuYWRkcmVzcyIsImlhdCI6MTU3MTIxNjg3Nn0.52aFuoJNTVQWiiI8dGCv70z7DTd8j4pPoxEpq9eL3Pw';
const anotherUsersToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE2NDFlMTA3ZTQ4OWFkNjdkZjE3OWEiLCJlbWFpbCI6InNvbWVlbWFpbEBub3cuYWRkcmVzcyIsImlhdCI6MTU3MTIxNjg3Nn0.52aFuoJNTVQWiiI8dGCv70z7DTd8j4pPoxEpq9eL3Pw';

export default {
  UserObjectWithLessThanRequiredParams,
  UserObjectWithMoreThanRequiredParams,
  UserObjectWithNameAsEmptyString,
  userWithInvalidNameCharacterLength,
  UserObjectWithEmailAsEmptyString,
  userWithInvalidEmailFormat,
  userWithPasswordAsEmptyString,
  userWithInvalidPasswordFormat,
  userWithInValidPasswordLength,
  validUserObject,
  validLoginUserObject,
  loginWithWrongEmail,
  loginWithWrongPassword,
  invalidToken,
  anotherUsersToken,
};
