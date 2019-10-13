const UserObjectWithLessThanRequiredParams = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
};

const UserObjectWithMoreThanRequiredParams = {
  name: 'test-user',
  email: 'somerandomemail@test.now',
  password: 'somEraNdom#pass62',
  Bio: '',
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

const validUserObject1 = {
  name: 'test-user-1',
  email: 'testuser@gmail.com',
  password: 'someRandomP#67',
};

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
  validUserObject1,
};
