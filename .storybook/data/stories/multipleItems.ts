import article from './article.json';

const multipleItems = {
    components: [
        {
            id: '1',
            type: 'timeline',
            items: [
                {
                    title: { body: 'A title' },
                    description: {
                        textStyle: {},
                        body: 'The sky above the port was the color of television tuned to a dead channel All this happened more or less I had the story bit by bit from various people and as generally happens in such cases each time it was a different story It was a pleasure to burn The sky above the port was the color of television tuned to a dead channel All this happened more or less',
                    },
                },
            ],
            background: {
                color: { alpha: 1, color: '#CCCCCC' },
            },
        },
        {
            id: '2',
            type: 'timeline-illustrated',
            items: [
                {
                    title: { body: 'A title' },
                    description: {
                        textStyle: {},
                        body: 'The sky above the port was the color of television tuned to a dead channel All this happened more or less I had the story bit by bit from various people and as generally happens in such cases each time it was a different story It was a pleasure to burn The sky above the port was the color of television tuned to a dead channel All this happened more or less',
                    },
                },
            ],
            background: {
                color: { alpha: 1, color: '#CCCCCC' },
            },
        },
        {
            id: '3',
            type: 'gallery-captions',
            images: [
                { media: 'media://11', caption: { body: '<span>L\u00e9gende 1</span>' } },
                { caption: { body: '<span>L\u00e9gende 2</span>' }, media: 'media://8' },
                { caption: { body: '<span>L\u00e9gende 3</span>' }, media: 'media://13' },
            ],
            background: {
                color: { alpha: 1, color: '#CCCCCC' },
            },
        },
        {
            id: '4',
            type: 'gallery-feed-captions',
            images: [
                {
                    media: {
                        url: 'https://picsum.photos/800/800?random=1',
                        metadata: { width: 800, height: 800 },
                    },
                    caption: {
                        textStyle: {},
                        body: 'The sky above the port was the color of television tuned to a dead channel All this happened more or less I had the story bit by bit',
                    },
                },
                {
                    media: {
                        url: 'https://picsum.photos/800/800?random=1',
                        metadata: { width: 800, height: 800 },
                    },
                    caption: {
                        textStyle: {},
                        body: null,
                    },
                },
            ],
            background: {
                color: { alpha: 1, color: '#CCCCCC' },
            },
        },
        {
            id: '5',
            type: 'ranking',
            items: [
                {
                    title: { body: 'A title' },
                    description: {
                        textStyle: {},
                        body: 'The sky above the port was the color of television tuned to a dead channel All this happened more or less I had the story bit by bit from various people and as generally happens in such cases each time it was a different story It was a pleasure to burn The sky above the port was the color of television tuned to a dead channel All this happened more or less',
                    },
                },
            ],
            background: {
                color: { alpha: 1, color: '#CCCCCC' },
            },
        },
    ],
};

export default multipleItems;
