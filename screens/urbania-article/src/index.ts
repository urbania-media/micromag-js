import { UrbaniaArticle, UrbaniaArticleCard } from './component';
import definition, { definitionCard as cardDefinition } from './definition';

// The definitions with their components
export default { ...definition, component: UrbaniaArticle };
export const definitionCard = { ...cardDefinition, component: UrbaniaArticleCard };

export {
    UrbaniaArticle,
    UrbaniaArticleCard,
    UrbaniaBaseArticle,
    UrbaniaBaseArticleCard,
} from './component';
