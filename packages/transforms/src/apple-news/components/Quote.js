import QuoteDefinition from '../definitions/Quote.json';
import GenericText from '../elements/GenericText';

const Quote = (story, quote) => GenericText(story, quote, 'quote', QuoteDefinition);

export default Quote;
