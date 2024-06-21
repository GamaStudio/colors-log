import { colors } from '../src';

describe('blah', () => {
  it('works', () => {
    colors.success('FUNCIONANDO');
  });
  it('works', () => {
    colors.error('FUNCIONANDO');
  });
  it('works', () => {
    colors.warn('FUNCIONANDO');
  });
  it('works', () => {
    colors.timeout('FUNCIONANDO');
  });
  it('works', () => {
    colors.system('FUNCIONANDO');
  });
  it('works', () => {
    colors.info('FUNCIONANDO');
  });
});
