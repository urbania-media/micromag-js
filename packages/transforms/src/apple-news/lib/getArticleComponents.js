import Heading1 from '../components/Heading1';
import Heading2 from '../components/Heading2';

const getArticleComponents = (story) => {
    const { title = null, metadata = {} } = story || {};
    const { description = 'Ma description' } = metadata || {};
    const { component: heading1 } = title ? Heading1(story, { body: title }) : null;
    const { component: heading2 } = description ? Heading2(story, { body: description }) : null;

    return {
        components: [heading1, heading2],
    };
};

export default getArticleComponents;
