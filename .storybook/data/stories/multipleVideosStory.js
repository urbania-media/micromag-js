import {
    bigVideoMediaWithSound,
    gifVideoMedia,
    video360Media,
    videoMedia,
    callToActionWithStyles,
} from '../../data';

export default {
    components: [
        {
            id: '1',
            type: 'video',
            layout: 'full',
            video: {
                media: bigVideoMediaWithSound(),
                withSeekBar: true,
                withControls: true,
                loop: false,
                autoPlay: true,
            },
            background: {
                color: { alpha: 1, color: '#FFFF00' },
            },
        },
        {
            id: '2',
            type: 'video',
            video: {
                withSeekBar: true,
                withControls: false,
                media: gifVideoMedia(),
                autoPlay: true,
                color: { alpha: 1, color: '#012400' },
                progressColor: { alpha: 1, color: '#8891cc' },
            },
            background: {
                color: { alpha: 1, color: '#123456' },
            },
            gotoNextScreenOnEnd: true,
        },
        {
            id: '3',
            type: 'video',
            layout: 'full',
            video: {
                media: video360Media(),
            },
            background: {
                color: { alpha: 1, color: '#00FFFF' },
                video: videoMedia({ big: true }),
            },
        },
        {
            id: '4',
            type: 'video',
            video: {
                media: videoMedia({ big: true }),
                withSeekBar: false,
                withControls: false,
                autoPlay: true,
                color: { alpha: 1, color: '#000000' },
                progressColor: { alpha: 1, color: '#0000FF' },
            },
            background: {
                color: { alpha: 1, color: '#00FF00' },
                video: videoMedia({ big: true }),
            },
            gotoNextScreenOnEnd: false,
        },
        {
            id: '5',
            type: 'video',
            video: {
                media: videoMedia({ big: true }),
                withSeekBar: true,
                withControls: true,
                autoPlay: true,
                color: { alpha: 1, color: '#00ffff' },
                progressColor: { alpha: 1, color: '#FF0000' },
            },
            background: {
                color: { alpha: 1, color: '#FFFF00' },
            },
            gotoNextScreenOnEnd: false,
        },
        {
            id: '6',
            type: 'video',
            video: {
                media: videoMedia({ big: true }),
                withSeekBar: false,
                withControls: true,
                autoPlay: true,
                color: { alpha: 1, color: '#000000' },
                progressColor: { alpha: 1, color: '#00FF00' },
            },
            background: {
                color: { alpha: 1, color: '#FF00FF' },
                video: videoMedia({ big: true }),
            },
            gotoNextScreenOnEnd: false,
            callToAction: callToActionWithStyles(),
        },
    ],
};
