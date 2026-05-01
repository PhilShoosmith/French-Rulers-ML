import fs from 'fs';

const translations = {
  "201": {
    "nameFr": "Philippe Ier",
    "contextFr": "Son long règne a été marqué par un conflit avec Guillaume le Conquérant et son excommunication par le pape suite à un mariage contesté.",
    "titleFr": "Roi des Francs"
  },
  "202": {
    "nameFr": "Louis VI",
    "contextFr": "Surnommé 'le Gros', il a passé une grande partie de son règne à consolider le pouvoir royal en combattant les seigneurs brigands autour de Paris.",
    "titleFr": "Roi des Francs"
  },
  "203": {
    "nameFr": "Louis VII",
    "contextFr": "Son mariage avec Aliénor d'Aquitaine fut annulé, ce qui la conduisit à épouser Henri II d'Angleterre, une cause majeure de conflits futurs.",
    "titleFr": "Roi des Francs"
  },
  "204": {
    "nameFr": "Philippe II",
    "contextFr": "Figure clé de la France médiévale, il a quadruplé le domaine royal et fait de la France un royaume prospère et puissant.",
    "titleFr": "Roi de France"
  },
  "205": {
    "nameFr": "Louis VIII",
    "contextFr": "Surnommé 'le Lion', son court règne fut marqué par son intervention en Angleterre et ses conquêtes dans le sud de la France.",
    "titleFr": "Roi de France"
  },
  "102": {
    "nameFr": "Louis IX",
    "contextFr": "Connu sous le nom de Saint Louis, il fut un souverain juste, un mécène des arts et un chef des septième et huitième croisades.",
    "titleFr": "Roi de France"
  },
  "206": {
    "nameFr": "Philippe III",
    "contextFr": "Surnommé 'le Hardi', il hérita du trône à Tunis lors de la huitième croisade et agrandit le domaine royal.",
    "titleFr": "Roi de France"
  },
  "103": {
    "nameFr": "Philippe IV",
    "contextFr": "Surnommé 'le Bel' pour sa belle apparence, il renforça la monarchie, expulsa les Juifs et détruisit les Templiers.",
    "titleFr": "Roi de France"
  },
  "207": {
    "nameFr": "Louis X",
    "contextFr": "Surnommé 'le Hutin', son bref règne fut miné par des luttes de factions parmi la noblesse.",
    "titleFr": "Roi de France et de Navarre"
  },
  "208": {
    "nameFr": "Jean Ier",
    "contextFr": "Surnommé 'le Posthume', il fut roi dès sa naissance mais ne vécut que cinq jours, provoquant une crise de succession.",
    "titleFr": "Roi de France et de Navarre"
  },
  "209": {
    "nameFr": "Philippe V",
    "contextFr": "Surnommé 'le Long', il devint roi après la mort de son neveu en bas âge Jean Ier, établissant le principe selon lequel les femmes ne pouvaient hériter du trône de France.",
    "titleFr": "Roi de France et de Navarre"
  },
  "210": {
    "nameFr": "Charles IV",
    "contextFr": "Le dernier roi de la lignée directe des Capétiens. Sa mort sans héritier mâle a conduit la dynastie des Valois à monter sur le trône.",
    "titleFr": "Roi de France et de Navarre"
  },
  "104": {
    "nameFr": "Philippe VI",
    "contextFr": "Sa prétention au trône fut contestée par Édouard III d'Angleterre, déclenchant la guerre de Cent Ans.",
    "titleFr": "Roi de France"
  },
  "211": {
    "nameFr": "Jean II",
    "contextFr": "Surnommé 'le Bon', il fut capturé par les Anglais à la bataille de Poitiers et mourut prisonnier à Londres.",
    "titleFr": "Roi de France"
  },
  "105": {
    "nameFr": "Charles V",
    "contextFr": "Surnommé 'le Sage', il réussit à récupérer une grande partie du territoire perdu aux mains des Anglais pendant la guerre de Cent Ans.",
    "titleFr": "Roi de France"
  },
  "212": {
    "nameFr": "Charles VI",
    "contextFr": "Surnommé 'le Fou', son règne fut gâché par ses fréquents accès de psychose, conduisant au chaos politique et aux victoires anglaises, dont Azincourt.",
    "titleFr": "Roi de France"
  },
  "106": {
    "nameFr": "Charles VII",
    "contextFr": "Son règne fut marqué par l'apparition de Jeanne d'Arc, qui aida à lever le siège d'Orléans et à renverser le cours de la guerre de Cent Ans.",
    "titleFr": "Roi de France"
  },
  "213": {
    "nameFr": "Louis XI",
    "contextFr": "Surnommé 'le Prudent' ou 'l'Universelle Aragne' pour ses intrigues politiques, il mit fin à la guerre de Cent Ans et centralisa le pouvoir.",
    "titleFr": "Roi de France"
  },
  "214": {
    "nameFr": "Charles VIII",
    "contextFr": "Son invasion de l'Italie en 1494 déclencha les guerres d'Italie, qui allaient dominer la politique européenne pendant les 60 années suivantes.",
    "titleFr": "Roi de France"
  },
  "215": {
    "nameFr": "Louis XII",
    "contextFr": "Connu comme le 'Père du Peuple', il fut un roi populaire qui réforma le système judiciaire et réduisit les impôts.",
    "titleFr": "Roi de France"
  },
  "107": {
    "nameFr": "François Ier",
    "contextFr": "Grand mécène des arts, il initia la Renaissance française, faisant venir Léonard de Vinci en France.",
    "titleFr": "Roi de France"
  },
  "216": {
    "nameFr": "Henri II",
    "contextFr": "Chasseur passionné, il mourut célèbrement dans un accident de joute lors d'un tournoi célébrant un traité de paix.",
    "titleFr": "Roi de France"
  },
  "217": {
    "nameFr": "François II",
    "contextFr": "Le premier mari maladif de Marie, reine d'Écosse, il ne régna que dix-sept mois avant de mourir d'une otite.",
    "titleFr": "Roi de France"
  },
  "218": {
    "nameFr": "Charles IX",
    "contextFr": "Son règne fut dominé par les guerres de religion françaises et le tristement célèbre massacre de la Saint-Barthélemy.",
    "titleFr": "Roi de France"
  },
  "219": {
    "nameFr": "Henri III",
    "contextFr": "Le dernier roi Valois, il fut assassiné par un moine fanatique, conduisant à la succession de la dynastie des Bourbons.",
    "titleFr": "Roi de France et de Pologne"
  },
  "108": {
    "nameFr": "Henri IV",
    "contextFr": "Mit fin aux guerres de religion françaises en promulguant l'édit de Nantes, accordant des droits aux protestants. A célèbrement dit 'Paris vaut bien une messe'.",
    "titleFr": "Roi de France et de Navarre"
  },
  "109": {
    "nameFr": "Louis XIII",
    "contextFr": "S'appuya fortement sur son principal ministre, le cardinal de Richelieu, pour centraliser le pouvoir et écraser la dissidence intérieure.",
    "titleFr": "Roi de France et de Navarre"
  },
  "110": {
    "nameFr": "Louis XIV",
    "contextFr": "Le 'Roi-Soleil', son règne de 72 ans est le plus long de tous les monarques de l'histoire européenne. Il a construit le château de Versailles.",
    "titleFr": "Roi de France et de Navarre"
  },
  "111": {
    "nameFr": "Louis XV",
    "contextFr": "Son règne a vu la France perdre ses colonies nord-américaines lors de la guerre de Sept Ans, contribuant au déclin de l'autorité royale.",
    "titleFr": "Roi de France et de Navarre"
  },
  "112": {
    "nameFr": "Louis XVI",
    "contextFr": "Le dernier roi avant la Révolution française, il fut déposé en 1792 et exécuté par guillotine l'année suivante.",
    "titleFr": "Roi de France et de Navarre"
  },
  "113": {
    "nameFr": "Napoléon Ier",
    "contextFr": "Un génie militaire qui s'est élevé de la Révolution française pour devenir Empereur, conquérant une grande partie de l'Europe avant sa défaite finale à Waterloo.",
    "titleFr": "Empereur des Français"
  },
  "225": {
    "nameFr": "Louis XVIII",
    "contextFr": "Frère de Louis XVI, il fut restauré sur le trône après l'abdication de Napoléon, régnant en tant que monarque constitutionnel pendant la Restauration bourbonienne.",
    "titleFr": "Roi de France et de Navarre"
  },
  "226": {
    "nameFr": "Charles X",
    "contextFr": "Un ultra-royaliste convaincu dont les politiques réactionnaires ont conduit à son renversement lors de la révolution de Juillet 1830, mettant fin au règne de la branche principale des Bourbons.",
    "titleFr": "Roi de France et de Navarre"
  },
  "227": {
    "nameFr": "Louis-Philippe Ier",
    "contextFr": "Surnommé le 'Roi citoyen', son règne (la monarchie de Juillet) fut une période de croissance industrielle mais aussi de troubles politiques, se terminant par la révolution de 1848.",
    "titleFr": "Roi des Français"
  },
  "220": {
    "nameFr": "Louis-Napoléon Bonaparte",
    "contextFr": "Neveu de Napoléon Ier, il fut le premier président de la France élu au suffrage universel. Il a établi la Deuxième République avant d'organiser un coup d'État pour devenir Empereur.",
    "titleFr": "Président de la République française"
  },
  "221": {
    "nameFr": "Napoléon III",
    "contextFr": "En tant qu'Empereur, il a modernisé l'économie française et supervisé la grande reconstruction de Paris, créant la ville que nous connaissons aujourd'hui. Son règne s'est terminé par une défaite lors de la guerre franco-prussienne.",
    "titleFr": "Empereur des Français"
  },
  "117": {
    "nameFr": "Adolphe Thiers",
    "contextFr": "Le premier président de la Troisième République française, il a négocié la fin de la guerre franco-prussienne et écrasé la Commune de Paris.",
    "titleFr": "Président de la République française"
  },
  "222": {
    "nameFr": "Patrice de Mac Mahon",
    "contextFr": "Général monarchiste devenu président, son mandat a été défini par une crise politique qui a finalement confirmé le pouvoir du Parlement sur le Président sous la Troisième République.",
    "titleFr": "Président de la République française"
  },
  "123": {
    "nameFr": "Jules Grévy",
    "contextFr": "Le premier président de la France à accomplir un mandat complet, il a cherché à diminuer les pouvoirs de la présidence au profit du Parlement, définissant le rôle pour des décennies.",
    "titleFr": "Président de la République française"
  },
  "223": {
    "nameFr": "Sadi Carnot",
    "contextFr": "Un président populaire qui a supervisé l'Exposition universelle de 1889 mettant en vedette la nouvelle tour Eiffel. Sa présidence a été tragiquement écourtée lorsqu'il a été assassiné par un anarchiste.",
    "titleFr": "Président de la République française"
  },
  "224": {
    "nameFr": "Jean Casimir-Perier",
    "contextFr": "Sa présidence est la plus courte de l'histoire de France. Il a démissionné après seulement 205 jours, frustré par les conflits de l'affaire Dreyfus et son manque d'influence politique.",
    "titleFr": "Président de la République française"
  },
  "135": {
    "nameFr": "Félix Faure",
    "contextFr": "Il a renforcé les liens franco-russes et présidé l'affaire Dreyfus. Sa présidence s'est terminée soudainement lorsqu'il est mort en fonction dans des circonstances controversées.",
    "titleFr": "Président de la République française"
  },
  "136": {
    "nameFr": "Émile Loubet",
    "contextFr": "Sa présidence a vu l'Exposition universelle de Paris de 1900, la séparation de l'Église et de l'État en 1905 et la grâce d'Alfred Dreyfus.",
    "titleFr": "Président de la République française"
  },
  "137": {
    "nameFr": "Armand Fallières",
    "contextFr": "Président discret, il a supervisé l'expansion de l'empire colonial français en Afrique du Nord, notamment au Maroc.",
    "titleFr": "Président de la République française"
  },
  "118": {
    "nameFr": "Raymond Poincaré",
    "contextFr": "Il fut président pendant la Première Guerre mondiale, assurant un leadership fort en temps de guerre et prônant une ligne dure contre l'Allemagne.",
    "titleFr": "Président de la République française"
  },
  "131": {
    "nameFr": "Paul Deschanel",
    "contextFr": "Sa présidence a duré moins d'un an, se terminant brusquement en raison de la détérioration de sa santé mentale après qu'il soit célèbrement tombé d'un train présidentiel.",
    "titleFr": "Président de la République française"
  },
  "132": {
    "nameFr": "Alexandre Millerand",
    "contextFr": "Ancien socialiste devenu conservateur, il s'est heurté au Parlement sur son désir d'accroître les pouvoirs présidentiels, forçant finalement sa démission.",
    "titleFr": "Président de la République française"
  },
  "133": {
    "nameFr": "Gaston Doumergue",
    "contextFr": "Le premier président protestant de France, sa présidence populaire a coïncidé avec une période de dynamisme artistique et de prospérité relative connue sous le nom d'« Années folles ».",
    "titleFr": "Président de la République française"
  },
  "134": {
    "nameFr": "Paul Doumer",
    "contextFr": "Sa présidence a été tragiquement écourtée après moins d'un an lorsqu'il a été assassiné par un émigré russe mentalement instable lors d'un salon du livre parisien.",
    "titleFr": "Président de la République française"
  },
  "124": {
    "nameFr": "Albert Lebrun",
    "contextFr": "Le dernier président de la Troisième République, sa présidence a été marquée par la montée du nazisme et la chute de la France lors de la Seconde Guerre mondiale.",
    "titleFr": "Président de la République française"
  },
  "125": {
    "nameFr": "Vincent Auriol",
    "contextFr": "Le premier président de la Quatrième République, il a présidé au début de la reconstruction d'après-guerre et aux premières étapes de la décolonisation.",
    "titleFr": "Président de la République française"
  },
  "130": {
    "nameFr": "René Coty",
    "contextFr": "Le dernier président de la Quatrième République, il a présidé une période d'instabilité politique et la crise qui a conduit au retour au pouvoir de Charles de Gaulle.",
    "titleFr": "Président de la République française"
  },
  "119": {
    "nameFr": "Charles de Gaulle",
    "contextFr": "Fondateur de la Cinquième République et son premier président. Il a accordé l'indépendance à l'Algérie et a retiré la France du commandement militaire de l'OTAN.",
    "titleFr": "Président de la République française"
  },
  "126": {
    "nameFr": "Georges Pompidou",
    "contextFr": "Successeur de de Gaulle, il a poussé à l'industrialisation et modernisé Paris, plus célèbrement avec la construction du Centre Pompidou.",
    "titleFr": "Président de la République française"
  },
  "127": {
    "nameFr": "Valéry Giscard d'Estaing",
    "contextFr": "Président modernisateur, il a abaissé l'âge de la majorité à 18 ans, légalisé le divorce par consentement mutuel et promu l'intégration européenne.",
    "titleFr": "Président de la République française"
  },
  "120": {
    "nameFr": "François Mitterrand",
    "contextFr": "Le premier président socialiste de la Cinquième République et celui ayant servi le plus longtemps. Il a aboli la peine de mort et supervisé des projets comme la pyramide du Louvre.",
    "titleFr": "Président de la République française"
  },
  "121": {
    "nameFr": "Jacques Chirac",
    "contextFr": "Sa présidence a vu l'adoption de l'euro par la France. Il s'est célèbrement opposé à l'invasion de l'Irak en 2003.",
    "titleFr": "Président de la République française"
  },
  "128": {
    "nameFr": "Nicolas Sarkozy",
    "contextFr": "Connu pour son style très énergique, sa présidence s'est concentrée sur la libéralisation de l'économie et la réponse à la crise financière de 2008.",
    "titleFr": "Président de la République française"
  },
  "129": {
    "nameFr": "François Hollande",
    "contextFr": "Son mandat a été marqué par des difficultés économiques et plusieurs attentats terroristes majeurs à Paris. Il fut le premier président sortant à ne pas se représenter depuis la Seconde Guerre mondiale.",
    "titleFr": "Président de la République française"
  },
  "122": {
    "nameFr": "Emmanuel Macron",
    "contextFr": "Le plus jeune président de France, il est arrivé au pouvoir avec un nouveau parti centriste, battant les forces politiques traditionnelles.",
    "titleFr": "Président de la République française"
  }
};

const content = fs.readFileSync('services/gameService.ts', 'utf-8');

// We will parse the array and inject the translations.
// Since it's a TS file, we can just replace the array string.
// Let's use a regex to find the array.

const match = content.match(/export const allMonarchs: Monarch\[\] = (\[[\s\S]*?\]);/);
if (match) {
  const arrayStr = match[1];
  const array = eval(arrayStr);
  
  const newArray = array.map((m: any) => {
    const t = (translations as any)[m.id.toString()];
    if (t) {
      return {
        ...m,
        nameFr: t.nameFr,
        contextFr: t.contextFr,
        titleFr: t.titleFr
      };
    }
    return m;
  });
  
  const newArrayStr = JSON.stringify(newArray, null, 2);
  const newContent = content.replace(arrayStr, newArrayStr);
  fs.writeFileSync('services/gameService.ts', newContent);
  console.log('Updated gameService.ts');
} else {
  console.log('Could not find allMonarchs array');
}
