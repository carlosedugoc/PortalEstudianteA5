import { MissingServicesPipe } from './missing-services.pipe';

describe('MissingServicesPipe', () => {
  it('create an instance', () => {
    const pipe = new MissingServicesPipe();
    expect(pipe).toBeTruthy();
  });
});
