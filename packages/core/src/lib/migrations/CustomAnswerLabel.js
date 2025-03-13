/* eslint-disable class-methods-use-this */
class CustomAnswerLabel {
    test(screen) {
        const { answers = null } = screen || {};
        if (answers === null || answers.length === 0) {
            return false;
        }
        const hasCustomAnswerLabel = (answers || []).some(
            (answer = null) => answer !== null && typeof answer.customAnswerLabel !== 'undefined',
        );
        if (!hasCustomAnswerLabel) {
            return false;
        }
        return true;
    }

    parse(screen) {
        const { answers = null, ...restScreen } = screen || {};
        return {
            ...restScreen,
            answers: answers.map((answer = null) => {
                if (answer === null || typeof answer.customAnswerLabel === 'undefined') {
                    return answer;
                }
                const { customAnswerLabel, ...restAnswer } = answer || {};
                return {
                    ...restAnswer,
                    result: customAnswerLabel,
                };
            }),
        };
    }
}

export default CustomAnswerLabel;
