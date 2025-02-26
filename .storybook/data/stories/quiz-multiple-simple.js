import { backgroundColor, subtitle, transitions } from '../../data';

export default {
    type: 'quiz-multiple',
    title: { body: 'Quiz multiple' },
    description: { body: 'Multiple questions, no results' },
    questions: [
        {
            text: { body: 'Question 1?' },
            answers: [
                {
                    id: 1,
                    label: {
                        body: subtitle(),
                    },
                    points: 0,
                },
                { id: 2, label: { body: subtitle() }, points: 1 },
                { id: 3, label: { body: subtitle() }, points: 5 },
                { id: 4, label: { body: subtitle() }, points: 10 },
                { id: 5, label: { body: subtitle() }, points: 20 },
                { id: 6, label: { body: subtitle() }, points: 2 },
            ],
        },
        {
            text: { body: 'Question 2?' },
            answers: [
                {
                    id: 1,
                    label: { body: subtitle() },
                    points: 0,
                },
                { id: 2, label: { body: subtitle() }, points: 3 },
                { id: 3, label: { body: subtitle() }, points: 10 },
                { id: 4, label: { body: subtitle() }, points: 1 },
            ],
            background: backgroundColor(),
        },
    ],
    results: [
        {
            title: { body: subtitle('Medium') },
            description: { body: 'Medium' },
            points: 4,
        },
        {
            title: { body: subtitle('Low') },
            description: { body: 'Low' },
            points: 1,
        },
        {
            title: { body: subtitle('High') },
            description: { body: 'High' },
            points: 8,
        },
    ],
    background: backgroundColor(),
    transitions: transitions(),
};
