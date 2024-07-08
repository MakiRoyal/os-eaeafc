export default function median(numbers) {
    if (numbers.length === 0) {
        throw new Error("Le tableau ne doit pas être vide");
    }

    numbers.sort((a, b) => a - b);

    const half = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
        return (numbers[half - 1] + numbers[half]) / 2;
    } else {
        return numbers[half];
    }
}