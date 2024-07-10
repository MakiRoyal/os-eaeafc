/**
 * Calculates the average of a series of numbers.
 *
 * @param {number[]} data An array of numbers.
 * @returns {number} The average of the numbers in the array.
 */
export default function average(data) {
    if (!Array.isArray(data) || !data.every(Number.isFinite)) {
      return NaN;
    }
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
  }
  
  