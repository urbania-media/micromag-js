import { QuizMultipleScreen, QuizScreen } from './component';
import definition from './definition';

const components = { quiz: QuizScreen, 'quiz-multiple': QuizMultipleScreen };

// The definitions with their components
export default definition.map((screen) => ({ ...screen, component: components[screen.id] }));

export { QuizScreen } from './component';
export { QuizMultipleScreen } from './component';
