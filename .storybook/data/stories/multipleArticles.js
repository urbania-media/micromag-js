import {
    bigVideoMediaWithSound,
} from '../../data';
import article from './article.json';
import article2 from './article2.json';
import articleVideo from './article-video.json';
import articleVideo2 from './article-video2.json';

const multipleArticles = {
    components: [
        {
            type: 'urbania-article',
            overTitle: {
                body: 'En vedette',
            },
            id: '7e14dec0-304f-11ed-a252-99adbd79786f',
            title: {
                body: '<span>Cool beans</span>',
            },
            background: {
                color: {
                    color: '#ff9b00',
                    alpha: 1,
                },
            },
            author: {
                name: {
                    body: '<p>Fred Mercy</p>',
                },
                image: {
                    id: '19',
                    type: 'image',
                    name: '00728_941201_fa.jpg',
                    url: 'https://urbania-submissions.s3-ca-central-1.amazonaws.com/60/e9c5420ae74109adf43f4066d4daf3/00728_941201_fa.jpg',
                    thumbnail_url:
                        'https://urbania-submissions.s3-ca-central-1.amazonaws.com/6c/6301388b2b45dba2e3b2973d255932/00728_941201_fa.jpg',
                    metadata: {
                        filename: '00728_941201_fa.jpg',
                        size: 158897,
                        mime: 'image/jpeg',
                        width: 512,
                        height: 768,
                    },
                },
            },
            sponsor: {
                body: '<span>Toyota</span>',
            },
            sponsorColor: {
                color: '#ff0000',
                alpha: 1,
            },
            image: {
                ...(bigVideoMediaWithSound())
            }
        },
        {
            id: '1',
            type: 'urbania-article',
            article,
            background: {
                color: { alpha: 1, color: '#FF00FF' },
            },
        },
        {
            id: '2',
            type: 'urbania-article',
            article: article2,
            overTitle: {
                body: 'Guide des universités',
                textStyle: {
                    color: { alpha: 1, color: '#ff0000' },
                },
            },
            description: {
                body: "Petite virée sur le campus de l'École de technologie supérieure (ÉTS)",
                textStyle: {
                    fontStyle: {
                        italic: true,
                        bold: false,
                    },
                    fontSize: 13,
                    color: { alpha: 1, color: '#ff0000' },
                },
            },
            background: {
                color: { alpha: 1, color: '#ffffff' },
            },
        },
        articleVideo,
        articleVideo2,
    ],
};

export default multipleArticles;
