const assert = require('assert');
const { describe, it } = require('mocha');
const { buildOptionParam } = require('../../utils/index.js');

describe('utils tests', () => {
  it('buildOptionParam', () => {
    const buildedOptions = [
      '--cluster=fruit-service-test&opt2=val2&optinvalid',
      '--cluster=fruit-service-test&opt1=val1',
      'opt1=val1&--cluster=fruit-service-test',
      '--cluster=fruit-service-test&opt2=val2&optinvalid',
      '--cluster=fruit-service-test&opt2=val2&optinvalid&opt3=val3',
      '--cluster=fruit-service-test&opt2=val2&opt3=val3'
    ].map((option) => buildOptionParam(option));

    assert.deepEqual(buildedOptions, [
      '--cluster=fruit-service-test -c opt2=val2',
      '--cluster=fruit-service-test -c opt1=val1',
      '--cluster=fruit-service-test -c opt1=val1',
      '--cluster=fruit-service-test -c opt2=val2',
      '--cluster=fruit-service-test -c opt2=val2 -c opt3=val3',
      '--cluster=fruit-service-test -c opt2=val2 -c opt3=val3'
    ]);
  });
});
