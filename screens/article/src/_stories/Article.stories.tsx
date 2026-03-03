/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    author,
    backgroundColor,
    headerFooter,
    imageMedia,
    paragraph, // videoMediaWithSound,
    title,
    transitions,
    videoMedia,
} from '../../../../.storybook/data';
import ArticleScreen from '../Article';
import definition from '../definition';

const bodyWithImages = `<p><strong>On veut tous un 18e anniversaire dont on se souvient. Le mien fut inoubliable. </strong>Avec l’une de mes meilleures amies, on cherchait un endroit où organiser la fête du siècle. Un midi, alors que je déjeunais à la cafétéria, un membre du personnel avec qui j’étais amie, Aziz, a proposé de nous prêter les clés de la cafèt’… si on promettait de ne pas faire n’importe quoi ! Le samedi soir de la fête,&nbsp;<br>on débarque environ une heure à l’avance.</p><p><img src="https://cdn.microm.ag/image/2025-01-15/52954-050602.png" width="1080" height="736"></p><p><strong>On allume des bougies. On apporte des tonnes de nourriture.</strong> Aziz nous confie l’endroit, et s’en va. La trentaine d’invités arrive, on allume l’énorme sono. Assez vite, ça a dérapé. Des gens marchaient avec leurs chaussures boueuses sur les tables, d’autres étaient rentrés dans la chambre froide… La situation dégénérait.&nbsp;</p><p>Plusieurs garçons avaient pris des vélos, des ballons, des trottinettes dans la cour des primaires, se sont baladés avec dans le parc. Et étaient revenus sans…<strong> </strong>Arrive l’heure des cadeaux . On boit du champagne dans des flûtes en plastique, tout a l’air de mieux se passer… jusqu’à ce qu’on me dise qu’un de mes potes, Clément, est parti faire un tour avec sa voiture dans le parc de l’établissement. On sait qu’il adore conduire vite. Il revient hors de lui car il a embouti un poteau de la verrière de la cour des sixièmes. Moi, je flippe que le préau s’écroule ! Il me rassure : il a juste laissé un peu de peinture de sa voiture sur le poteau, par contre les traces de pneus sur le goudron sont, elles, bien visibles…</p><p><img src="https://cdn.microm.ag/image/2025-01-15/52957-051900.png" width="1080" height="876"></p><p><strong>À partir de là, on a décidé de lâcher prise. Le mal était fait.</strong> On a préféré kiffer notre soirée, puis on s’est endormies avec mon amie sur un matelas gonflable. Au réveil, l’horreur. Le sol était jonché de bouteilles, de flûtes en plastique explosées. La cour des primaires était remplie de vélos, de ballons, de cerceaux abandonnés. Et Aziz devait arriver vers midi pour vérifier l’état de la cafèt’ !&nbsp;</p><p><img src="https://cdn.microm.ag/image/2025-01-15/52958-051947.png" width="1080" height="953"></p><p><strong>Heureusement, nos parents ont rapporté des seaux, des serpillières, et nous ont aidées à nettoyer. </strong>On a réussi à rattraper le maximum ! Mais on avait oublié les vélos au fond du parc, et la peinture sur le poteau de la verrière ! Le lundi, le principal a convoqué Aziz. Il ne l’a pas viré. Mais on s’en est beaucoup voulu. Et puis, l’histoire s’est tassée. On a eu de la chance de s’en sortir sans une convocation chez le principal. &nbsp; Mais quand tu organises une soirée style &nbsp; &nbsp; &nbsp;« Projet&nbsp;X », tu dois être prêt à parer à toute éventualité… la situation peut vite t’échapper !<br>&nbsp;</p><p><i>Texte : Pierre Garrigues&nbsp;&nbsp;</i><br><i>Illustrations : Loïc Sécheresse</i></p><p>&nbsp;</p>`;

const props = {
    image: imageMedia({ height: 900 }),
    title: { body: title() },
    surtitle: { body: title() },
    date: { body: '1969-04-20' },
    author: { name: { body: author() } },
    text: { body: paragraph({ min: 40, max: 400 }) },
    background: backgroundColor(),
    transitions: transitions(),
};

export default {
    title: 'Screens/Article',
    component: ArticleScreen,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === ArticleScreen),
    },
};

export const Placeholder = (storyProps) => <ArticleScreen {...storyProps} />;

export const Preview = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const Static = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const Capture = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const Edit = (storyProps) => <ArticleScreen {...storyProps} />;

export const Normal = (storyProps) => <ArticleScreen {...storyProps} {...props} />;

export const WithImage = (storyProps) => (
    <ArticleScreen {...storyProps} {...props} text={{ body: bodyWithImages }} />
);

export const WithoutAuthor = (storyProps) => (
    <ArticleScreen {...storyProps} {...props} author={null} />
);

export const Video = (storyProps) => (
    <ArticleScreen {...storyProps} {...props} image={videoMedia()} />
);

export const WithHeaderFooter = (storyProps) => (
    <ArticleScreen {...storyProps} {...headerFooter()} {...props} />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
