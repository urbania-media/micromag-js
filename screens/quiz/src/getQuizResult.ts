interface QuizResult {
    points?: number | null;
    [key: string]: unknown;
}

/**
 * The result of a quiz for a number of points: the result with the most points that the points
 * reach, or null when they reach none. The results are not sorted in place.
 */
function getQuizResult<T extends QuizResult>(results: T[] | null = null, points = 0): T | null {
    return [...(results || [])]
        .sort(({ points: pointsA = 0 }, { points: pointsB = 0 }) => {
            if (pointsA === pointsB) {
                return 0;
            }
            return pointsA > pointsB ? 1 : -1;
        })
        .reduce((lastResult: T | null, result) => {
            const { points: lastPoints = 0 } = lastResult || {};
            const { points: resultPoints = 0 } = result || {};
            return points >= (lastPoints || 0) && points >= resultPoints ? result : lastResult;
        }, null);
}

export default getQuizResult;
