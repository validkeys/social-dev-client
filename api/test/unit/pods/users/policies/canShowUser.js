import Lab from 'lab';
import Code from 'code';
import canShowUser from '../../../../../src/app/pods/users/policies/canShowUser';

// shortcuts
var lab     = Lab.script(),
expect      = Code.expect,
beforeEach  = lab.beforeEach,
before      = lab.before,
after       = lab.after,
afterEach   = lab.afterEach;

lab.experiment('Pods > Users > Policies > canShowUser', function() {

  lab.test('it exists', function(done) {
    expect(canShowUser).to.not.equal(undefined);
    done();
  });

  lab.test('it should return true', function(done) {
    let req = {}, reply = {};
    canShowUser(req, reply, (res) => {
      expect(res).to.equal(null);
      done();
    });
  });

});

export { lab };