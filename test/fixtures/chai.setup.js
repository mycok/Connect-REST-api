import chai from 'chai';
import chaiHttp from 'chai-http';

const { expect } = chai;
const chaiWithHttp = chai.use(chaiHttp);

export { expect, chaiWithHttp };
