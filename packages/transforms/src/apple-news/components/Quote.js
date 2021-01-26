import QuoteDefinition from '../definitions/Quote.json';
import TextElement from '../elements/TextElement';

const Quote = (story, quote) => TextElement(story, quote, 'quote', QuoteDefinition);

export default Quote;
