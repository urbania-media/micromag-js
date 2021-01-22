import QuoteDefinition from '../definitions/Quote.json';
import GenericText from '../elements/GenericText';

const Quote = (story, text) => GenericText(story, text, 'quote', QuoteDefinition);

export default Quote;
