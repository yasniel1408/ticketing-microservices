import { LocalAuthGuard } from './local-auth-guard.guard';

describe('LocalAuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
