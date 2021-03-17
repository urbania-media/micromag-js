import isArray from 'lodash/isArray';

const getRemainder = (number) => {
    const remainder = number - Math.floor(number);
    return remainder.toFixed(4);
};

const largestRemainderRound = (numbers, desiredTotal) => {
    if (!isArray(numbers) || numbers.length < 1) return numbers;

    const result = numbers
        .map((number, index) => ({
            floor: Math.floor(number) || 0,
            remainder: getRemainder(number),
            index,
        }))
        .sort((a, b) => b.remainder - a.remainder);

    const lowerSum = result.reduce((sum, current) => sum + current.floor, 0);

    const delta = desiredTotal - lowerSum;
    for (let i = 0; i < delta; i += 1) {
        if (result[i]) {
            result[i].floor += 1;
        }
    }

    return result.sort((a, b) => a.index - b.index).map((res) => res.floor);
};

export default largestRemainderRound;
