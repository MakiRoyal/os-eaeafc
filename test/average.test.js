import average from '../src/average';

describe('average()', () => {
  it('should return NaN if the data is not an array', () => {
    const data = 'foo';
    expect(average(data)).toBeNaN();
  });

  it('should return NaN if the data is not an array of finite numbers', () => {
    const data = ['foo', 1, 2];
    expect(average(data)).toBeNaN();
  });

  it('should return the average of an array of numbers', () => {
    const data = [1, 2, 3];
    expect(average(data)).toBe(2);
  });
});