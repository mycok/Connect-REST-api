import { expect, assert } from 'chai';
import { describe, it } from 'mocha';

describe('true or false', () => {
  it('should return true', () => {
    assert.equal(true, true);
    expect(true).to.eql(true);
  });

  it('should return false', () => {
    assert.equal(false, false);
  });
});
