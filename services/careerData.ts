import { PresidentCareer } from '../types';

export const presidentCareers: Record<number, PresidentCareer> = {
  // 1. Adolphe Thiers (1871-1873)
  117: {
    monarchId: 117,
    educationSummary: "Lycée de Marseille, University of Aix-en-Provence (Faculty of Law)",
    educationSummaryFr: "Lycée de Marseille, Faculté de droit d'Aix-en-Provence",
    stages: [
      {
        yearStart: 1818,
        yearEnd: 1821,
        role: "Law Graduate & Advocate",
        roleFr: "Licencié en droit & Avocat",
        organization: "Bar of Aix-en-Provence",
        organizationFr: "Barreau d'Aix-en-Provence",
        type: "education",
        description: "Admitted to the bar; developed oratorical skills and passion for political history.",
        descriptionFr: "Reçu au barreau; développe ses talents oratoires et sa passion pour l'histoire politique."
      },
      {
        yearStart: 1821,
        yearEnd: 1830,
        role: "Journalist & Historian",
        roleFr: "Journaliste & Historien",
        organization: "Le National & Le Constitutionnel",
        organizationFr: "Le National & Le Constitutionnel",
        type: "civil",
        description: "Authored the celebrated multi-volume 'History of the French Revolution' and co-founded liberal opposition paper Le National.",
        descriptionFr: "Auteur de la célèbre 'Histoire de la Révolution française' et cofondateur du journal d'opposition Le National."
      },
      {
        yearStart: 1830,
        yearEnd: 1836,
        role: "Deputy & Minister of the Interior",
        roleFr: "Député & Ministre de l'Intérieur",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Key leader in the July Revolution; held several prominent ministerial portfolios under the July Monarchy.",
        descriptionFr: "Artisan clé de la Révolution de Juillet; occupe plusieurs portefeuilles ministériels sous la monarchie de Juillet."
      },
      {
        yearStart: 1836,
        yearEnd: 1840,
        role: "President of the Council (Prime Minister)",
        roleFr: "Président du Conseil",
        organization: "Kingdom of France",
        organizationFr: "Royaume de France",
        type: "political",
        description: "Headed the government twice under King Louis-Philippe and orchestrated the return of Napoleon's ashes to Les Invalides.",
        descriptionFr: "Dirige le gouvernement à deux reprises sous Louis-Philippe et négocie le retour des cendres de Napoléon."
      },
      {
        yearStart: 1871,
        yearEnd: 1871,
        role: "Chief of the Executive Power",
        roleFr: "Chef du Pouvoir exécutif",
        organization: "French National Assembly",
        organizationFr: "Assemblée nationale",
        type: "political",
        description: "Appointed head of executive power by the Assembly to negotiate peace ending the Franco-Prussian War.",
        descriptionFr: "Nommé chef du pouvoir exécutif par l'Assemblée pour négocier la paix concluant la guerre franco-prussienne."
      }
    ]
  },

  // 2. Patrice de MacMahon (1873-1879)
  222: {
    monarchId: 222,
    educationSummary: "Collège Sainte-Barbe, École Spéciale Militaire de Saint-Cyr",
    educationSummaryFr: "Collège Sainte-Barbe, École Spéciale Militaire de Saint-Cyr",
    stages: [
      {
        yearStart: 1825,
        yearEnd: 1827,
        role: "Cadet",
        roleFr: "Élève-officier",
        organization: "École Spéciale Militaire de Saint-Cyr",
        organizationFr: "École Spéciale Militaire de Saint-Cyr",
        type: "education",
        description: "Graduated with honors into the General Staff corps.",
        descriptionFr: "Sort avec les honneurs dans le corps d'état-major."
      },
      {
        yearStart: 1830,
        yearEnd: 1855,
        role: "General & Hero of Malakoff",
        roleFr: "Général & Héros de Malakoff",
        organization: "French Army",
        organizationFr: "Armée française",
        type: "military",
        description: "Distinguished himself in North Africa and stormed the Malakoff redoubt during the Crimean War, famously declaring 'J'y suis, j'y reste!'.",
        descriptionFr: "S'illustre en Algérie et prend d'assaut la tour Malakoff en Crimée ('J'y suis, j'y reste!')."
      },
      {
        yearStart: 1859,
        yearEnd: 1859,
        role: "Marshal of France & Duke of Magenta",
        roleFr: "Maréchal de France & Duc de Magenta",
        organization: "Imperial Guard",
        organizationFr: "Garde impériale",
        type: "military",
        description: "Won decisive victory at the Battle of Magenta during the Italian Campaign, elevated to Marshal on the battlefield.",
        descriptionFr: "Remporte la victoire décisive de Magenta en Italie; élevé à la dignité de maréchal sur le champ de bataille."
      },
      {
        yearStart: 1864,
        yearEnd: 1870,
        role: "Governor-General of Algeria",
        roleFr: "Gouverneur général de l'Algérie",
        organization: "Colonial Administration",
        organizationFr: "Administration coloniale",
        type: "civil",
        description: "Administered colonial affairs and tribal relations under Napoleon III.",
        descriptionFr: "Gouverne l'Algérie et gère les réformes administratives et militaires sous Napoléon III."
      },
      {
        yearStart: 1871,
        yearEnd: 1873,
        role: "Commander of the Army of Versailles",
        roleFr: "Commandant de l'Armée de Versailles",
        organization: "French Armed Forces",
        organizationFr: "Forces armées françaises",
        type: "military",
        description: "Appointed supreme commander by Thiers during the civil strife following the Franco-Prussian War.",
        descriptionFr: "Commandant suprême désigné par Thiers pour rétablir l'ordre républicain."
      }
    ]
  },

  // 3. Jules Grévy (1879-1887)
  123: {
    monarchId: 123,
    educationSummary: "Collège de Poligny, Faculty of Law of Paris (Licence en droit)",
    educationSummaryFr: "Collège de Poligny, Faculté de droit de Paris",
    stages: [
      {
        yearStart: 1830,
        yearEnd: 1836,
        role: "Law Graduate & Barrister",
        roleFr: "Licencié en droit & Avocat",
        organization: "Paris Bar",
        organizationFr: "Barreau de Paris",
        type: "education",
        description: "Trained at the Paris Bar; defended republicans accused of political dissent against the monarchy.",
        descriptionFr: "Avocat à Paris; défend avec ferveur les républicains poursuivis pour délits d'opinion."
      },
      {
        yearStart: 1848,
        yearEnd: 1851,
        role: "Vice-President of the Constituent Assembly",
        roleFr: "Vice-président de l'Assemblée constituante",
        organization: "National Constituent Assembly (Second Republic)",
        organizationFr: "Assemblée constituante (Deuxième République)",
        type: "political",
        description: "Authored the famous 'Grévy Amendment' warning against electing a single President of the Republic with unchecked power.",
        descriptionFr: "Auteur du célèbre amendement Grévy préconisant un président du Conseil élu par l'Assemblée."
      },
      {
        yearStart: 1868,
        yearEnd: 1870,
        role: "Bâtonnier of the Paris Bar & Deputy",
        roleFr: "Bâtonnier de l'Ordre des avocats & Député",
        organization: "Corps Législatif & Bar of Paris",
        organizationFr: "Corps législatif & Barreau de Paris",
        type: "civil",
        description: "Elected head of the Paris bar association and returned to parliament as a staunch opponent of the Empire.",
        descriptionFr: "Élu bâtonnier de l'Ordre des avocats de Paris et député d'opposition à l'Empire."
      },
      {
        yearStart: 1871,
        yearEnd: 1873,
        role: "President of the National Assembly",
        roleFr: "Président de l'Assemblée nationale",
        organization: "French Parliament",
        organizationFr: "Parlement français",
        type: "political",
        description: "Presided over the assembly debates establishing peace treaties and the framework of the Third Republic.",
        descriptionFr: "Préside les débats parlementaires fondateurs de la Troisième République naissante."
      },
      {
        yearStart: 1876,
        yearEnd: 1879,
        role: "President of the Chamber of Deputies",
        roleFr: "Président de la Chambre des députés",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Led the parliamentary majority in resisting royalist dissolution during the 16 May 1877 crisis.",
        descriptionFr: "Mène la résistance républicaine lors de la crise du 16 mai 1877 face au maréchal de MacMahon."
      }
    ]
  },

  // 4. Sadi Carnot (1887-1894)
  223: {
    monarchId: 223,
    educationSummary: "Lycée Condorcet, École Polytechnique, École des Ponts et Chaussées",
    educationSummaryFr: "Lycée Condorcet, École Polytechnique, École des Ponts et Chaussées",
    stages: [
      {
        yearStart: 1857,
        yearEnd: 1863,
        role: "Engineering Graduate",
        roleFr: "Élève-ingénieur",
        organization: "École Polytechnique & Ponts et Chaussées",
        organizationFr: "École Polytechnique & Ponts et Chaussées",
        type: "education",
        description: "Graduated among the top of both prestigious engineering institutions; descendant of revolutionary hero Lazare Carnot.",
        descriptionFr: "Diplômé brillant de Polytechnique et des Ponts et Chaussées; petit-fils de Lazare Carnot."
      },
      {
        yearStart: 1864,
        yearEnd: 1870,
        role: "State Civil Engineer",
        roleFr: "Ingénieur des Ponts et Chaussées",
        organization: "Corps des Ponts et Chaussées",
        organizationFr: "Corps des Ponts et Chaussées",
        type: "civil",
        description: "Supervised civil infrastructure, bridge construction, and municipal public works in Annecy and Haute-Savoie.",
        descriptionFr: "Supervise la construction de ponts et infrastructures de transport en Haute-Savoie."
      },
      {
        yearStart: 1871,
        yearEnd: 1879,
        role: "Prefect of Seine-Inférieure & Deputy",
        roleFr: "Préfet de Seine-Inférieure & Député",
        organization: "Ministry of the Interior & National Assembly",
        organizationFr: "Ministère de l'Intérieur & Assemblée nationale",
        type: "political",
        description: "Served as wartime prefect organizing territorial defense, then elected Republican deputy for Côte-d'Or.",
        descriptionFr: "Préfet organisant la défense de Normandie pendant la guerre, puis député de la Côte-d'Or."
      },
      {
        yearStart: 1880,
        yearEnd: 1881,
        role: "Minister of Public Works",
        roleFr: "Ministre des Travaux publics",
        organization: "Government of Jules Ferry",
        organizationFr: "Gouvernement Jules Ferry",
        type: "political",
        description: "Accelerated the Freycinet Plan to expand railroads, canals, and ports across France.",
        descriptionFr: "Accélère la modernisation des voies ferrées, canaux et ports dans le cadre du plan Freycinet."
      },
      {
        yearStart: 1885,
        yearEnd: 1886,
        role: "Minister of Finance",
        roleFr: "Ministre des Finances",
        organization: "Brisson and de Freycinet Cabinets",
        organizationFr: "Cabinets Brisson et de Freycinet",
        type: "political",
        description: "Managed the national budget with recognized integrity and financial discipline during turbulent economic times.",
        descriptionFr: "Gère les finances publiques avec une rigueur et une intégrité remarquées par tous les partis."
      }
    ]
  },

  // 5. Jean Casimir-Perier (1894-1895)
  224: {
    monarchId: 224,
    educationSummary: "Lycée Condorcet, Faculty of Law of Paris (Licence ès lettres, Licence en droit)",
    educationSummaryFr: "Lycée Condorcet, Faculté de droit de Paris",
    stages: [
      {
        yearStart: 1867,
        yearEnd: 1870,
        role: "Law Graduate & Scholar",
        roleFr: "Étudiant en droit & Lettres",
        organization: "University of Paris",
        organizationFr: "Université de Paris",
        type: "education",
        description: "Earned dual degrees in literature and law from prestigious Parisian faculties.",
        descriptionFr: "Diplômé en lettres et en droit des facultés parisiennes."
      },
      {
        yearStart: 1870,
        yearEnd: 1871,
        role: "Captain in the Garde Mobile",
        roleFr: "Capitaine des mobiles de la Seine",
        organization: "Army of Paris",
        organizationFr: "Armée de Paris",
        type: "military",
        description: "Fought gallantly in the Siege of Paris during the Franco-Prussian War, awarded the Legion of Honour.",
        descriptionFr: "Participe héroïquement à la défense de Paris lors du siège de 1870; décoré de la Légion d'honneur."
      },
      {
        yearStart: 1876,
        yearEnd: 1893,
        role: "Deputy for Aube & Under-Secretary",
        roleFr: "Député de l'Aube & Sous-secrétaire d'État",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Heir to a historic political family; served as influential Republican deputy and Under-Secretary of Public Instruction.",
        descriptionFr: "Héritier d'une grande lignée républicaine; sous-secrétaire d'État à l'Instruction publique."
      },
      {
        yearStart: 1893,
        yearEnd: 1894,
        role: "President of the Chamber of Deputies",
        roleFr: "Président de la Chambre des députés",
        organization: "French Parliament",
        organizationFr: "Parlement français",
        type: "political",
        description: "Presided over the assembly with celebrated calm when an anarchist bomb exploded in the hemicycle in 1893.",
        descriptionFr: "Garde son sang-froid légendaire lors de l'attentat anarchiste d'Auguste Vaillant à la Chambre."
      },
      {
        yearStart: 1893,
        yearEnd: 1894,
        role: "Prime Minister & Foreign Minister",
        roleFr: "Président du Conseil & Ministre des Affaires étrangères",
        organization: "Government of France",
        organizationFr: "Gouvernement français",
        type: "political",
        description: "Formed a moderate Republican ministry passing landmark press and security legislation.",
        descriptionFr: "Forme un gouvernement modéré et mène la politique extérieure de la France."
      }
    ]
  },

  // 6. Félix Faure (1895-1899)
  135: {
    monarchId: 135,
    educationSummary: "École Pompée in Ivry, Commercial Apprenticeship in England",
    educationSummaryFr: "École Pompée à Ivry, Apprentissage commercial en Angleterre",
    stages: [
      {
        yearStart: 1858,
        yearEnd: 1863,
        role: "Commercial Trainee & Tanner",
        roleFr: "Apprenti du commerce & Tanneur",
        organization: "Leather Trade in England & France",
        organizationFr: "Industrie du cuir en Angleterre et en France",
        type: "education",
        description: "Acquired fluent English and commercial mastery in the international tanneries trade.",
        descriptionFr: "Se forme aux échanges commerciaux internationaux et perfectionne son anglais en Grande-Bretagne."
      },
      {
        yearStart: 1863,
        yearEnd: 1881,
        role: "Shipping Merchant & Chamber of Commerce Leader",
        roleFr: "Négociant-armateur & Juge consulaire",
        organization: "Port of Le Havre",
        organizationFr: "Port du Havre",
        type: "civil",
        description: "Founded a prosperous import-export shipping firm; served as deputy mayor and commercial judge in Le Havre.",
        descriptionFr: "Fonde une grande maison de négoce au Havre; adjoint au maire et figure majeure du port."
      },
      {
        yearStart: 1870,
        yearEnd: 1871,
        role: "Captain in the National Guard",
        roleFr: "Capitaine de la Garde nationale",
        organization: "National Guard of Le Havre",
        organizationFr: "Garde nationale du Havre",
        type: "military",
        description: "Raised local volunteer companies to secure maritime defense during the Franco-Prussian War.",
        descriptionFr: "Organise les compagnies de volontaires pour défendre les côtes normandes."
      },
      {
        yearStart: 1881,
        yearEnd: 1894,
        role: "Deputy for Seine-Inférieure & Under-Secretary for Colonies",
        roleFr: "Député de Seine-Inférieure & Sous-secrétaire aux Colonies",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Advocated for modern merchant shipping, maritime infrastructure, and colonial expansion.",
        descriptionFr: "Député spécialiste de la marine marchande et de l'administration coloniale."
      },
      {
        yearStart: 1894,
        yearEnd: 1895,
        role: "Minister of the Navy",
        roleFr: "Ministre de la Marine",
        organization: "Dupuy Cabinet",
        organizationFr: "Gouvernement Charles Dupuy",
        type: "political",
        description: "Oversaw modernization of the naval fleet and organized the Madagascar naval expedition.",
        descriptionFr: "Modernise la flotte cuirassée et supervise l'expédition navale de Madagascar."
      }
    ]
  },

  // 7. Émile Loubet (1899-1906)
  136: {
    monarchId: 136,
    educationSummary: "Faculty of Law of Paris (Doctor of Laws - Doctorat en droit)",
    educationSummaryFr: "Faculté de droit de Paris (Doctorat en droit)",
    stages: [
      {
        yearStart: 1860,
        yearEnd: 1865,
        role: "Doctor of Laws",
        roleFr: "Docteur en droit",
        organization: "University of Paris",
        organizationFr: "Faculté de droit de Paris",
        type: "education",
        description: "Completed doctoral dissertation in Paris before joining the bar of Montélimar.",
        descriptionFr: "Obtient son doctorat en droit avant de s'inscrire au barreau de Montélimar."
      },
      {
        yearStart: 1870,
        yearEnd: 1899,
        role: "Mayor of Montélimar",
        roleFr: "Maire de Montélimar",
        organization: "Municipality of Montélimar",
        organizationFr: "Ville de Montélimar",
        type: "civil",
        description: "Served as beloved mayor for nearly 30 years, transforming local schools, railways, and municipal services.",
        descriptionFr: "Maire emblématique de Montélimar pendant près de 30 ans, modernisant écoles et services urbains."
      },
      {
        yearStart: 1876,
        yearEnd: 1885,
        role: "Deputy for Drôme",
        roleFr: "Député de la Drôme",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Supported the Jules Ferry educational laws and institutional secular reforms of the Third Republic.",
        descriptionFr: "Soutient activement les lois scolaires de Jules Ferry et la laïcisation de l'enseignement."
      },
      {
        yearStart: 1892,
        yearEnd: 1892,
        role: "Prime Minister & Minister of the Interior",
        roleFr: "Président du Conseil & Ministre de l'Intérieur",
        organization: "Government of France",
        organizationFr: "Gouvernement français",
        type: "political",
        description: "Formed cabinet during the Carmaux miners' strike, mediating labor disputes with notable impartiality.",
        descriptionFr: "Dirige le gouvernement et arbitre avec modération la grève des mineurs de Carmaux."
      },
      {
        yearStart: 1896,
        yearEnd: 1899,
        role: "President of the Senate",
        roleFr: "Président du Sénat",
        organization: "French Senate",
        organizationFr: "Sénat",
        type: "political",
        description: "Led the upper house of parliament with broad bipartisan consensus before his election to the Élysée.",
        descriptionFr: "Préside la haute assemblée avec sagesse avant d'accéder à la magistrature suprême."
      }
    ]
  },

  // 8. Armand Fallières (1906-1913)
  137: {
    monarchId: 137,
    educationSummary: "Faculty of Law of Paris (Licence en droit)",
    educationSummaryFr: "Faculté de droit de Paris",
    stages: [
      {
        yearStart: 1862,
        yearEnd: 1867,
        role: "Law Graduate & Barrister",
        roleFr: "Avocat au barreau",
        organization: "Bar of Nérac",
        organizationFr: "Barreau de Nérac",
        type: "education",
        description: "Established legal practice in Lot-et-Garonne; championed rural civil rights and free education.",
        descriptionFr: "Installe son cabinet à Nérac et défend ardemment les libertés publiques républicaines."
      },
      {
        yearStart: 1871,
        yearEnd: 1875,
        role: "Mayor of Nérac",
        roleFr: "Maire de Nérac",
        organization: "Municipality of Nérac",
        organizationFr: "Ville de Nérac",
        type: "civil",
        description: "Youngest mayor in the department; briefly dismissed by the conservative monarchist government for republican convictions.",
        descriptionFr: "Plus jeune maire du département; révoqué par le gouvernement d'Ordre moral pour son républicanisme."
      },
      {
        yearStart: 1876,
        yearEnd: 1890,
        role: "Deputy for Lot-et-Garonne",
        roleFr: "Député de Lot-et-Garonne",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Elected to parliament; held several key posts including Under-Secretary of the Interior and Minister of Justice.",
        descriptionFr: "Député influent, nommé sous-secrétaire d'État puis ministre de la Justice."
      },
      {
        yearStart: 1883,
        yearEnd: 1883,
        role: "Prime Minister & Foreign Minister",
        roleFr: "Président du Conseil",
        organization: "Government of France",
        organizationFr: "Gouvernement français",
        type: "political",
        description: "Led the government during the contentious parliamentary debates over the pretenders to the throne.",
        descriptionFr: "Préside le Conseil des ministres lors de la crise sur l'exil des princes prétendants."
      },
      {
        yearStart: 1899,
        yearEnd: 1906,
        role: "President of the Senate",
        roleFr: "Président du Sénat",
        organization: "French Senate",
        organizationFr: "Sénat",
        type: "political",
        description: "Presided over the Senate during the High Court trial of nationalist conspirators and the 1905 Separation law.",
        descriptionFr: "Préside le Sénat lors des débats historiques sur la loi de séparation des Églises et de l'État."
      }
    ]
  },

  // 9. Raymond Poincaré (1913-1920)
  118: {
    monarchId: 118,
    educationSummary: "Lycée Louis-le-Grand, Faculty of Law of Paris (Doctorate in Law)",
    educationSummaryFr: "Lycée Louis-le-Grand, Faculté de droit de Paris (Doctorat en droit)",
    stages: [
      {
        yearStart: 1880,
        yearEnd: 1887,
        role: "Doctor of Laws & Advocate at the Court of Appeal",
        roleFr: "Docteur en droit & Avocat à la Cour d'appel",
        organization: "Paris Bar",
        organizationFr: "Barreau de Paris",
        type: "education",
        description: "One of the most brilliant and sought-after appellate lawyers in France; renowned for rigorous legal scholarship.",
        descriptionFr: "L'un des plus brillants avocats d'affaires et de plaidoirie de sa génération à Paris."
      },
      {
        yearStart: 1887,
        yearEnd: 1903,
        role: "Deputy for Meuse",
        roleFr: "Député de la Meuse",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Elected the youngest deputy in France at age 27; gained national renown as a financial prodigy.",
        descriptionFr: "Plus jeune député de France à 27 ans; rapporteur général du budget très écouté."
      },
      {
        yearStart: 1894,
        yearEnd: 1895,
        role: "Minister of Finance & Minister of Public Instruction",
        roleFr: "Ministre des Finances & de l'Instruction publique",
        organization: "Government of France",
        organizationFr: "Gouvernement français",
        type: "political",
        description: "Balanced the national budget and reformed higher university curricula across France.",
        descriptionFr: "Équilibre le budget national et modernise les statuts universitaires."
      },
      {
        yearStart: 1909,
        yearEnd: 1934,
        role: "Academician",
        roleFr: "Membre de l'Académie française",
        organization: "Académie française (Fauteuil 34)",
        organizationFr: "Académie française (Fauteuil 34)",
        type: "civil",
        description: "Elected to the Académie française in recognition of his political memoirs and legal writings.",
        descriptionFr: "Élu sous la Coupole en reconnaissance de ses écrits historiques et politiques."
      },
      {
        yearStart: 1912,
        yearEnd: 1913,
        role: "Prime Minister & Foreign Minister",
        roleFr: "Président du Conseil & Ministre des Affaires étrangères",
        organization: "French Republic",
        organizationFr: "République française",
        type: "political",
        description: "Strengthened the Franco-Russian Alliance and negotiated diplomatic alignment with the United Kingdom.",
        descriptionFr: "Renforce l'Alliance franco-russe et l'Entente cordiale à la veille de la Grande Guerre."
      }
    ]
  },

  // 10. Paul Deschanel (1920-1920)
  131: {
    monarchId: 131,
    educationSummary: "Lycée Condorcet, Faculty of Law of Paris (Licence en droit, Licence ès lettres)",
    educationSummaryFr: "Lycée Condorcet, Faculté de droit de Paris",
    stages: [
      {
        yearStart: 1874,
        yearEnd: 1877,
        role: "Scholar & Legal Graduate",
        roleFr: "Diplômé en droit et en lettres",
        organization: "University of Paris",
        organizationFr: "Université de Paris",
        type: "education",
        description: "Son of exiled professor Émile Deschanel; acquired exceptional literary polish and oratorical mastery.",
        descriptionFr: "Fils du proscrit Émile Deschanel; développe un talent d'orateur et de styliste hors pair."
      },
      {
        yearStart: 1877,
        yearEnd: 1881,
        role: "Sub-Prefect of Dreux and Brest",
        roleFr: "Sous-préfet de Dreux et de Brest",
        organization: "Ministry of the Interior",
        organizationFr: "Corps préfectoral",
        type: "civil",
        description: "Youngest sub-prefect in France, administering maritime and regional districts with distinction.",
        descriptionFr: "Plus jeune sous-préfet de France, administrant les arrondissements de Dreux et Brest."
      },
      {
        yearStart: 1885,
        yearEnd: 1898,
        role: "Deputy for Eure-et-Loir",
        roleFr: "Député d'Eure-et-Loir",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Celebrated orator of the progressive Republican center; published influential works on French foreign policy.",
        descriptionFr: "Orateur réputé du centre républicain; auteur d'essais diplomatiques remarqués."
      },
      {
        yearStart: 1899,
        yearEnd: 1922,
        role: "Academician",
        roleFr: "Membre de l'Académie française",
        organization: "Académie française (Fauteuil 23)",
        organizationFr: "Académie française (Fauteuil 23)",
        type: "civil",
        description: "Elected to the prestigious literary academy for his essays on Gambetta and political literature.",
        descriptionFr: "Élu à l'Académie française pour ses biographies historiques et essais littéraires."
      },
      {
        yearStart: 1898,
        yearEnd: 1920,
        role: "President of the Chamber of Deputies",
        roleFr: "Président de la Chambre des députés",
        organization: "French Parliament",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Presided over the assembly during the entire duration of World War I, delivering historic wartime speeches.",
        descriptionFr: "Préside la Chambre durant toute la Première Guerre mondiale, galvanisant le moral national."
      }
    ]
  },

  // 11. Alexandre Millerand (1920-1924)
  132: {
    monarchId: 132,
    educationSummary: "Lycée Henri-IV, Lycée Michelet, University of Paris (Faculté de droit)",
    educationSummaryFr: "Lycée Henri-IV, Lycée Michelet, Faculté de droit de Paris",
    stages: [
      {
        yearStart: 1881,
        yearEnd: 1885,
        role: "Labor Lawyer & Journalist",
        roleFr: "Avocat des syndicats & Journaliste",
        organization: "Paris Bar & La Justice",
        organizationFr: "Barreau de Paris & Journal La Justice",
        type: "education",
        description: "Defended miners and striking workers; wrote leading editorials alongside Georges Clemenceau.",
        descriptionFr: "Défend les syndicats ouvriers et écrit des éditoriaux politiques avec Georges Clemenceau."
      },
      {
        yearStart: 1885,
        yearEnd: 1919,
        role: "Deputy for Paris",
        roleFr: "Député de la Seine",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Leader of independent socialists; authored the Saint-Mandé Program establishing reformist democratic socialism.",
        descriptionFr: "Dirigeant des socialistes indépendants; formule le programme réformiste de Saint-Mandé."
      },
      {
        yearStart: 1899,
        yearEnd: 1902,
        role: "Minister of Commerce and Industry",
        roleFr: "Ministre du Commerce et de l'Industrie",
        organization: "Waldeck-Rousseau Cabinet",
        organizationFr: "Gouvernement Waldeck-Rousseau",
        type: "political",
        description: "First socialist minister in French history; introduced landmark laws reducing work hours to 10 hours.",
        descriptionFr: "Premier socialiste à entrer au gouvernement; fait voter la journée de travail de 10 heures."
      },
      {
        yearStart: 1912,
        yearEnd: 1915,
        role: "Minister of War",
        roleFr: "Ministre de la Guerre",
        organization: "Poincaré and Viviani Governments",
        organizationFr: "Gouvernements Poincaré et Viviani",
        type: "political",
        description: "Reorganized the French armed forces on the eve of WWI and mobilized war industries after the Battle of the Marne.",
        descriptionFr: "Modernise l'armée à la veille du conflit et organise l'effort de guerre industriel après la Marne."
      },
      {
        yearStart: 1920,
        yearEnd: 1920,
        role: "Prime Minister & Foreign Minister",
        roleFr: "Président du Conseil & Ministre des Affaires étrangères",
        organization: "Bloc National Government",
        organizationFr: "Gouvernement du Bloc national",
        type: "political",
        description: "Led the victorious conservative-centrist Bloc National and provided military aid to Poland during the Polish-Soviet War.",
        descriptionFr: "Mène le Bloc national à la victoire et envoie la mission militaire française en Pologne."
      }
    ]
  },

  // 12. Gaston Doumergue (1924-1931)
  133: {
    monarchId: 133,
    educationSummary: "Faculty of Law of Paris (Licence en droit)",
    educationSummaryFr: "Faculté de droit de Paris",
    stages: [
      {
        yearStart: 1885,
        yearEnd: 1890,
        role: "Magistrate & Colonial Judge",
        roleFr: "Magistrat colonial",
        organization: "Department of Justice in Indochina and Algeria",
        organizationFr: "Justice coloniale en Indochine et en Algérie",
        type: "education",
        description: "Served as a dedicated magistrate in Cochinchina (Saigon) and justice of the peace in Algeria.",
        descriptionFr: "Magistrat en Indochine (Saïgon) puis juge de paix en Algérie, acquérant une vaste expérience d'outre-mer."
      },
      {
        yearStart: 1893,
        yearEnd: 1910,
        role: "Radical-Socialist Deputy for Gard",
        roleFr: "Député du Gard",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Represented Nîmes for 17 years as a champion of public secular schooling and cooperative agriculture.",
        descriptionFr: "Représente le Gard pendant 17 ans; ardent défenseur de la laïcité républicaine."
      },
      {
        yearStart: 1902,
        yearEnd: 1910,
        role: "Minister of the Colonies & Minister of Commerce",
        roleFr: "Ministre des Colonies & Ministre du Commerce",
        organization: "Combes, Rouvier and Clemenceau Cabinets",
        organizationFr: "Gouvernements Combes, Rouvier et Clemenceau",
        type: "political",
        description: "Reformed colonial administrative statutes and regulated industrial working conditions.",
        descriptionFr: "Modernise l'administration coloniale et les lois régissant le travail ouvrier."
      },
      {
        yearStart: 1913,
        yearEnd: 1914,
        role: "Prime Minister & Foreign Minister",
        roleFr: "Président du Conseil",
        organization: "Government of France",
        organizationFr: "Gouvernement français",
        type: "political",
        description: "Formed a cabinet supporting the Three-Year military service law and introduced France's first progressive income tax.",
        descriptionFr: "Dirige le cabinet qui prépare la défense nationale et fait voter l'impôt général sur le revenu."
      },
      {
        yearStart: 1923,
        yearEnd: 1924,
        role: "President of the Senate",
        roleFr: "Président du Sénat",
        organization: "French Senate",
        organizationFr: "Sénat",
        type: "political",
        description: "Elected leader of the Senate; admired across party lines for his genial warmth and constitutional mastery.",
        descriptionFr: "Élu au plateau du Sénat; réputé pour sa bonhomie légendaire et son impartialité."
      }
    ]
  },

  // 13. Paul Doumer (1931-1932)
  134: {
    monarchId: 134,
    educationSummary: "Conservatoire National des Arts et Métiers, Faculty of Law",
    educationSummaryFr: "Conservatoire National des Arts et Métiers, Faculté de droit",
    stages: [
      {
        yearStart: 1877,
        yearEnd: 1888,
        role: "Professor of Mathematics & Editor",
        roleFr: "Professeur de mathématiques & Journaliste",
        organization: "Collège de Mende & Le Courrier de l'Aisne",
        organizationFr: "Collège de Mende & Le Courrier de l'Aisne",
        type: "education",
        description: "Self-made scholar from a modest background; taught mathematics before directing regional republican newspapers.",
        descriptionFr: "Autodidacte méritant issu d'un milieu modeste; enseigne les mathématiques avant de diriger un journal."
      },
      {
        yearStart: 1888,
        yearEnd: 1895,
        role: "Deputy for Aisne & Minister of Finance",
        roleFr: "Député de l'Aisne & Ministre des Finances",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Early advocate of modern fiscal reform who introduced the first comprehensive income tax bill.",
        descriptionFr: "Porte le premier projet complet d'impôt sur le revenu à la tribune de la Chambre."
      },
      {
        yearStart: 1897,
        yearEnd: 1902,
        role: "Governor-General of French Indochina",
        roleFr: "Gouverneur général de l'Indochine",
        organization: "Colonial Government in Hanoi",
        organizationFr: "Gouvernement général à Hanoï",
        type: "civil",
        description: "Centralized colonial finances, built the Yunnan Railway and the famous Long Biên Bridge (Paul Doumer Bridge) in Hanoi.",
        descriptionFr: "Bâtisseur des grandes infrastructures indochinoises, dont le chemin de fer du Yunnan et le pont de Hanoï."
      },
      {
        yearStart: 1905,
        yearEnd: 1906,
        role: "President of the Chamber of Deputies",
        roleFr: "Président de la Chambre des députés",
        organization: "French Parliament",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Defeated the government candidate to win election as presiding officer of the lower house.",
        descriptionFr: "Élu au perchoir de la Chambre contre le candidat soutenu par le cabinet Combes."
      },
      {
        yearStart: 1927,
        yearEnd: 1931,
        role: "President of the Senate",
        roleFr: "Président du Sénat",
        organization: "French Senate",
        organizationFr: "Sénat",
        type: "political",
        description: "Revered patriarch who had lost four of his sons in World War I; led the Senate with solemn dignity.",
        descriptionFr: "Figure vénérée ayant sacrifié quatre de ses fils pour la patrie lors de la Grande Guerre."
      }
    ]
  },

  // 14. Albert Lebrun (1932-1940)
  124: {
    monarchId: 124,
    educationSummary: "Lycée de Nancy, École Polytechnique, École des Mines de Paris (Major de promotion)",
    educationSummaryFr: "Lycée de Nancy, École Polytechnique, École des Mines de Paris (Major)",
    stages: [
      {
        yearStart: 1890,
        yearEnd: 1896,
        role: "State Mining Engineer",
        roleFr: "Ingénieur du Corps des Mines",
        organization: "École Polytechnique & Corps des Mines",
        organizationFr: "École Polytechnique & Corps des Mines",
        type: "education",
        description: "Graduated ranked first in his class (major) from both École Polytechnique and École des Mines.",
        descriptionFr: "Sort major de promotion de Polytechnique et de l'École des Mines de Paris."
      },
      {
        yearStart: 1900,
        yearEnd: 1920,
        role: "Deputy for Meurthe-et-Moselle",
        roleFr: "Député de Meurthe-et-Moselle",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Youngest deputy in France at age 29; specialist in labor safety in iron mines and heavy metallurgy.",
        descriptionFr: "Plus jeune député de France à 29 ans; spécialiste des mines de fer et de la sidérurgie lorraine."
      },
      {
        yearStart: 1911,
        yearEnd: 1913,
        role: "Minister of the Colonies & Minister of War",
        roleFr: "Ministre des Colonies & Ministre de la Guerre",
        organization: "Caillaux and Poincaré Cabinets",
        organizationFr: "Gouvernements Caillaux et Poincaré",
        type: "political",
        description: "Managed colonial strategy during the Agadir Crisis and organized national defenses.",
        descriptionFr: "Gère les affaires coloniales lors du coup d'Agadir et renforce les armements terrestres."
      },
      {
        yearStart: 1917,
        yearEnd: 1919,
        role: "Minister of Blockade and Liberated Regions",
        roleFr: "Ministre des Régions libérées",
        organization: "Clemenceau War Cabinet",
        organizationFr: "Gouvernement de guerre Clemenceau",
        type: "political",
        description: "Key member of Clemenceau's wartime ministry directing industrial supplies and post-war reconstruction.",
        descriptionFr: "Membre du gouvernement de la Victoire avec Clemenceau; organise la reconstruction des départements dévastés."
      },
      {
        yearStart: 1931,
        yearEnd: 1932,
        role: "President of the Senate",
        roleFr: "Président du Sénat",
        organization: "French Senate",
        organizationFr: "Sénat",
        type: "political",
        description: "Elected President of the Senate; succeeded Paul Doumer following the latter's tragic assassination.",
        descriptionFr: "Élu au plateau du Sénat avant d'être appelé à l'Élysée après la tragique disparition de Doumer."
      }
    ]
  },

  // 15. Vincent Auriol (1947-1954)
  125: {
    monarchId: 125,
    educationSummary: "Faculty of Law of Toulouse (Doctorate in Law)",
    educationSummaryFr: "Faculté de droit de Toulouse (Doctorat en droit)",
    stages: [
      {
        yearStart: 1905,
        yearEnd: 1914,
        role: "Doctor of Laws & Journalist",
        roleFr: "Docteur en droit & Journaliste",
        organization: "Toulouse Bar & Le Midi Socialiste",
        organizationFr: "Barreau de Toulouse & Le Midi Socialiste",
        type: "education",
        description: "Co-founded Le Midi Socialiste alongside Jean Jaurès; defended regional trade unionists.",
        descriptionFr: "Cofondateur avec Jean Jaurès du Midi Socialiste; avocat dévoué aux causes syndicales."
      },
      {
        yearStart: 1914,
        yearEnd: 1940,
        role: "Socialist Deputy & Mayor of Muret",
        roleFr: "Député socialiste & Maire de Muret",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "SFIO parliamentary leader and chief economic spokesman for democratic socialism.",
        descriptionFr: "Porte-parole économique de la SFIO et figure de proue du socialisme démocratique."
      },
      {
        yearStart: 1936,
        yearEnd: 1937,
        role: "Minister of Finance",
        roleFr: "Ministre des Finances",
        organization: "Popular Front (Front Populaire) of Léon Blum",
        organizationFr: "Gouvernement du Front populaire de Léon Blum",
        type: "political",
        description: "Financed the historic Matignon Agreements, introducing 40-hour workweeks and paid annual leave.",
        descriptionFr: "Finance les accords de Matignon, les 40 heures et les premiers congés payés de l'histoire de France."
      },
      {
        yearStart: 1940,
        yearEnd: 1944,
        role: "Resistance Member & Free France Delegate",
        roleFr: "Résistant & Délégué de la France Libre",
        organization: "French Resistance & CFLN in Algiers",
        organizationFr: "Résistance intérieure & CFLN à Alger",
        type: "military",
        description: "Voted against full powers to Pétain among the historic 'Eighty'; went underground and joined de Gaulle in Algiers.",
        descriptionFr: "Fait partie des 80 parlementaires refusant les pleins pouvoirs à Pétain; rejoint de Gaulle à Alger."
      },
      {
        yearStart: 1946,
        yearEnd: 1947,
        role: "President of the National Constituent Assembly",
        roleFr: "Président de l'Assemblée nationale constituante",
        organization: "French Constituent Assembly",
        organizationFr: "Assemblée constituante",
        type: "political",
        description: "Guided the drafting and ratification of the Constitution of the Fourth French Republic.",
        descriptionFr: "Préside les travaux constituants fondant les institutions de la Quatrième République."
      }
    ]
  },

  // 16. René Coty (1954-1959)
  130: {
    monarchId: 130,
    educationSummary: "University of Caen (Degrees in Law and Philosophy)",
    educationSummaryFr: "Université de Caen (Licences en droit et philosophie)",
    stages: [
      {
        yearStart: 1902,
        yearEnd: 1914,
        role: "Barrister at the Bar of Le Havre",
        roleFr: "Avocat au barreau du Havre",
        organization: "Bar of Le Havre",
        organizationFr: "Barreau du Havre",
        type: "education",
        description: "Specialized in maritime and commercial law; elected bâtonnier and local municipal councillor.",
        descriptionFr: "Avocat maritime de premier plan; bâtonnier de l'Ordre et conseiller municipal du Havre."
      },
      {
        yearStart: 1914,
        yearEnd: 1918,
        role: "Volunteer Infantry Soldier",
        roleFr: "Soldat volontaire d'infanterie",
        organization: "129th Infantry Regiment",
        organizationFr: "129e Régiment d'infanterie",
        type: "military",
        description: "Enlisted as a combat volunteer despite parliamentary exemption; fought at the Battle of Verdun.",
        descriptionFr: "S'engage volontairement au front malgré son mandat parlementaire; combat héroïquement à Verdun."
      },
      {
        yearStart: 1923,
        yearEnd: 1936,
        role: "Deputy for Seine-Inférieure",
        roleFr: "Député de Seine-Inférieure",
        organization: "Chamber of Deputies",
        organizationFr: "Chambre des députés",
        type: "political",
        description: "Moderate Republican leader focusing on commercial shipping and constitutional reform.",
        descriptionFr: "Député républicain modéré, spécialiste des questions maritimes et de réforme de l'État."
      },
      {
        yearStart: 1947,
        yearEnd: 1948,
        role: "Minister of Reconstruction and Town Planning",
        roleFr: "Ministre de la Reconstruction et de l'Urbanisme",
        organization: "Schuman and Marie Cabinets",
        organizationFr: "Gouvernements Robert Schuman et André Marie",
        type: "political",
        description: "Rebuilt destroyed French cities and Normandy harbors following the devastation of World War II.",
        descriptionFr: "Dirige la reconstruction colossale des cités détruites et des ports de Normandie après-guerre."
      },
      {
        yearStart: 1948,
        yearEnd: 1953,
        role: "Vice-President of the Council of the Republic",
        roleFr: "Vice-président du Conseil de la République",
        organization: "Council of the Republic (Senate)",
        organizationFr: "Conseil de la République (Sénat)",
        type: "political",
        description: "Respected senior statesman of the upper house known for his scrupulous adherence to republican law.",
        descriptionFr: "Vice-président de la haute assemblée, estimé de tous les bancs pour sa loyauté républicaine."
      }
    ]
  },

  // 17. Charles de Gaulle (1959-1969)
  119: {
    monarchId: 119,
    educationSummary: "Collège Stanislas, École Spéciale Militaire de Saint-Cyr, École Supérieure de Guerre",
    educationSummaryFr: "Collège Stanislas, École Spéciale Militaire de Saint-Cyr, École Supérieure de Guerre",
    stages: [
      {
        yearStart: 1909,
        yearEnd: 1912,
        role: "Cadet",
        roleFr: "Élève-officier",
        organization: "École Spéciale Militaire de Saint-Cyr",
        organizationFr: "École Spéciale Militaire de Saint-Cyr",
        type: "education",
        description: "Graduated with distinction into the 33rd Infantry Regiment commanded by Colonel Philippe Pétain.",
        descriptionFr: "Diplômé de la promotion de Fès; affecté au 33e régiment d'infanterie d'Arras."
      },
      {
        yearStart: 1914,
        yearEnd: 1918,
        role: "Captain & WWI Combatant",
        roleFr: "Capitaine & Combattant de 14-18",
        organization: "French Army",
        organizationFr: "Armée française",
        type: "military",
        description: "Wounded three times, cited for bravery, and captured at the Battle of Douaumont (Verdun); attempted five escapes.",
        descriptionFr: "Blessé trois fois, fait prisonnier à Douaumont après un combat héroïque; tente cinq évasions."
      },
      {
        yearStart: 1934,
        yearEnd: 1940,
        role: "Military Theorist & Tank Commander",
        roleFr: "Théoricien militaire & Colonel des blindés",
        organization: "Armoured Corps (507th Tank Regiment)",
        organizationFr: "Chars de combat (507e RCC)",
        type: "military",
        description: "Published prophetic book 'Vers l'Armée de Métier' advocating mechanized tank warfare; won tank battle at Montcornet (1940).",
        descriptionFr: "Auteur précurseur de 'Vers l'armée de métier'; mène la victorieuse contre-attaque de Montcornet en mai 1940."
      },
      {
        yearStart: 1940,
        yearEnd: 1944,
        role: "Leader of Free France",
        roleFr: "Chef de la France Libre",
        organization: "Free French Forces (Forces Françaises Libres)",
        organizationFr: "Forces Françaises Libres",
        type: "military",
        description: "Broadcast the historic 18 June Appeal from London, rallied the French Empire, and unified the Resistance.",
        descriptionFr: "Lance l'Appel du 18 juin depuis Londres, rassemble l'Empire et unifie la Résistance française."
      },
      {
        yearStart: 1944,
        yearEnd: 1946,
        role: "President of the Provisional Government",
        roleFr: "Président du Gouvernement provisoire (GPRF)",
        organization: "Provisional Government of the French Republic",
        organizationFr: "Gouvernement provisoire de la République française",
        type: "political",
        description: "Restored republican legality, extended voting rights to women, and founded the French Social Security system.",
        descriptionFr: "Rétablit la République, accorde le droit de vote aux femmes et fonde la Sécurité sociale."
      },
      {
        yearStart: 1958,
        yearEnd: 1959,
        role: "Last Prime Minister of the Fourth Republic",
        roleFr: "Dernier Président du Conseil de la IVe République",
        organization: "French Republic",
        organizationFr: "République française",
        type: "political",
        description: "Recalled to power amid the Algerian crisis; drafted the Constitution of the Fifth Republic approved by referendum.",
        descriptionFr: "Rappelé au pouvoir lors de la crise de mai 1958; fait rédiger la Constitution de la Ve République."
      }
    ]
  },

  // 18. Georges Pompidou (1969-1974)
  126: {
    monarchId: 126,
    educationSummary: "Lycée Louis-le-Grand, École Normale Supérieure (Ulm), Sciences Po Paris (Agrégé de lettres)",
    educationSummaryFr: "Lycée Louis-le-Grand, École Normale Supérieure (Ulm), Sciences Po Paris (Agrégation)",
    stages: [
      {
        yearStart: 1931,
        yearEnd: 1935,
        role: "Normalien & Agrégé Professor",
        roleFr: "Normalien & Professeur agrégé",
        organization: "École Normale Supérieure & Lycée Henri-IV",
        organizationFr: "ENS Ulm & Lycée Henri-IV",
        type: "education",
        description: "Brilliant classical scholar; taught literature before being called to state service after the Liberation.",
        descriptionFr: "Reçu premier à l'agrégation de lettres; enseigne les humanités classiques au lycée Henri-IV."
      },
      {
        yearStart: 1944,
        yearEnd: 1954,
        role: "Advisor to de Gaulle & Maître des Requêtes",
        roleFr: "Conseiller du général de Gaulle & Maître des requêtes",
        organization: "Cabinet du Général & Conseil d'État",
        organizationFr: "Cabinet de Gaulle & Conseil d'État",
        type: "civil",
        description: "Served as trusted policy advisor to Charles de Gaulle and member of the highest administrative court.",
        descriptionFr: "Collaborateur de confiance du Général à la Libération et membre du Conseil d'État."
      },
      {
        yearStart: 1954,
        yearEnd: 1958,
        role: "General Director",
        roleFr: "Directeur général",
        organization: "Rothschild & Cie Banque",
        organizationFr: "Banque Rothschild Frères",
        type: "civil",
        description: "Led corporate banking operations and major industrial investment financing in post-war Europe.",
        descriptionFr: "Dirige les affaires de la banque d'affaires et structure de grands investissements industriels."
      },
      {
        yearStart: 1958,
        yearEnd: 1962,
        role: "Chief of Staff & Constitutional Council Member",
        roleFr: "Directeur de cabinet & Membre du Conseil constitutionnel",
        organization: "Prime Minister's Office & Constitutional Council",
        organizationFr: "Hôtel Matignon & Conseil constitutionnel",
        type: "political",
        description: "Managed the return of de Gaulle to power and conducted secret negotiations with the Algerian FLN.",
        descriptionFr: "Bras droit du Général lors de son retour au pouvoir et négociateur secret avec le FLN."
      },
      {
        yearStart: 1962,
        yearEnd: 1968,
        role: "Prime Minister of France",
        roleFr: "Premier ministre",
        organization: "Government of the Fifth Republic",
        organizationFr: "Gouvernement de la Ve République",
        type: "political",
        description: "Longest-serving Prime Minister of modern France (over 6 years); steered the nation through the May 1968 crisis.",
        descriptionFr: "Premier ministre record de la Ve République; désamorce la crise de mai 68 avec les accords de Grenelle."
      }
    ]
  },

  // 19. Valéry Giscard d'Estaing (1974-1981)
  127: {
    monarchId: 127,
    educationSummary: "Lycée Louis-le-Grand, École Polytechnique, ENA (École nationale d'administration)",
    educationSummaryFr: "Lycée Louis-le-Grand, École Polytechnique, ENA",
    stages: [
      {
        yearStart: 1944,
        yearEnd: 1945,
        role: "Tank Volunteer in 1st French Army",
        roleFr: "Engagé volontaire dans la 1ère Armée",
        organization: "2nd Dragoon Regiment",
        organizationFr: "2e Régiment de dragons",
        type: "military",
        description: "Participated as an 18-year-old in the liberation of France and Germany; awarded the Croix de Guerre.",
        descriptionFr: "S'engage à 18 ans pour libérer la patrie; décoré de la Croix de guerre sur le front du Rhin."
      },
      {
        yearStart: 1946,
        yearEnd: 1951,
        role: "Student & Inspector of Finances",
        roleFr: "Élève à l'ENA & Inspecteur des finances",
        organization: "École Polytechnique & ENA (Europe class)",
        organizationFr: "Polytechnique & ENA (promotion Europe)",
        type: "education",
        description: "Graduated into the elite Inspection Générale des Finances (IGF).",
        descriptionFr: "Brillant polytechnicien et énarque; intègre l'Inspection générale des finances."
      },
      {
        yearStart: 1956,
        yearEnd: 1962,
        role: "Deputy for Puy-de-Dôme & Secretary of State",
        roleFr: "Député du Puy-de-Dôme & Secrétaire d'État",
        organization: "National Assembly & Ministry of Finance",
        organizationFr: "Assemblée nationale & Ministère des Finances",
        type: "political",
        description: "Youngest deputy of his class; promoted to junior minister for financial affairs under Pinay.",
        descriptionFr: "Élu député d'Auvergne et nommé plus jeune secrétaire d'État aux Finances."
      },
      {
        yearStart: 1962,
        yearEnd: 1966,
        role: "Minister of the Economy and Finance",
        roleFr: "Ministre de l'Économie et des Finances",
        organization: "De Gaulle Presidency (Pompidou Cabinet)",
        organizationFr: "Gouvernement Georges Pompidou",
        type: "political",
        description: "Introduced the landmark Franc Stabilization Plan and modern corporate taxation reforms.",
        descriptionFr: "Met en œuvre le plan de stabilisation financière et modernise la fiscalité des entreprises."
      },
      {
        yearStart: 1969,
        yearEnd: 1974,
        role: "Minister of Economy and Finance",
        roleFr: "Ministre de l'Économie et des Finances",
        organization: "Pompidou Presidency (Chaban-Delmas and Messmer Cabinets)",
        organizationFr: "Présidence Pompidou",
        type: "political",
        description: "Navigated the 1973 oil crisis, supported the TGV and French nuclear energy independence program.",
        descriptionFr: "Gère le premier choc pétrolier et lance le programme TGV ainsi que l'indépendance électronucléaire."
      }
    ]
  },

  // 20. François Mitterrand (1981-1995)
  120: {
    monarchId: 120,
    educationSummary: "Collège Saint-Paul in Angoulême, Faculty of Law of Paris, Sciences Po Paris",
    educationSummaryFr: "Collège Saint-Paul d'Angoulême, Faculté de droit de Paris, Sciences Po",
    stages: [
      {
        yearStart: 1934,
        yearEnd: 1939,
        role: "Law Graduate & Literary Journalist",
        roleFr: "Diplômé en droit & Rédacteur",
        organization: "University of Paris & Sciences Po",
        organizationFr: "Faculté de droit de Paris & Sciences Po",
        type: "education",
        description: "Completed dual diplomas in public law and political science in the Latin Quarter.",
        descriptionFr: "Diplômé de droit et de sciences politiques; fréquente le milieu littéraire parisien."
      },
      {
        yearStart: 1939,
        yearEnd: 1944,
        role: "Sergeant, POW Escapee & Resistance Leader",
        roleFr: "Sergent, Évadé de guerre & Chef de réseau résistant",
        organization: "French Army & National Movement of POWs (RNPG)",
        organizationFr: "Armée française & Réseau Résistance (RNPG)",
        type: "military",
        description: "Wounded at Verdun (1940), escaped from German Stalag camp on third attempt, unified resistance networks for POWs.",
        descriptionFr: "Blessé à Verdun, s'évade d'un stalag en Allemagne et crée le grand mouvement résistant des prisonniers de guerre."
      },
      {
        yearStart: 1947,
        yearEnd: 1957,
        role: "Minister 11 Times in the Fourth Republic",
        roleFr: "Ministre à 11 reprises sous la IVe République",
        organization: "Ministries of Veterans, Overseas, and Interior",
        organizationFr: "Ministères des Anciens Combattants, de la France d'Outre-mer et de l'Intérieur",
        type: "political",
        description: "Held multiple cabinet posts, becoming Minister of the Interior and Minister of Justice during decolonization.",
        descriptionFr: "L'un des plus jeunes ministres de France; détient 11 portefeuilles dont l'Intérieur et la Justice."
      },
      {
        yearStart: 1959,
        yearEnd: 1981,
        role: "Senator, Mayor of Château-Chinon & Opposition Leader",
        roleFr: "Sénateur, Maire de Château-Chinon & Chef de l'opposition",
        organization: "Senate, Nièvre & FGDS",
        organizationFr: "Sénat, Nièvre & Fédération de la gauche démocrate et socialiste",
        type: "political",
        description: "Stood as unified left candidate against Charles de Gaulle in 1965, forcing the General into an unexpected runoff.",
        descriptionFr: "Candidat unique de la gauche en 1965, il met le général de Gaulle en ballottage."
      },
      {
        yearStart: 1971,
        yearEnd: 1981,
        role: "First Secretary of the Socialist Party",
        roleFr: "Premier secrétaire du Parti socialiste",
        organization: "Parti Socialiste (PS)",
        organizationFr: "Parti Socialiste (PS)",
        type: "political",
        description: "Founded the modern Socialist Party at the Épinay Congress and concluded the Common Programme of the Left.",
        descriptionFr: "Prend la tête du Parti socialiste au congrès d'Épinay et scelle le Programme commun de la gauche."
      }
    ]
  },

  // 21. Jacques Chirac (1995-2007)
  121: {
    monarchId: 121,
    educationSummary: "Lycée Louis-le-Grand, Sciences Po Paris, ENA (École nationale d'administration), Harvard Summer School",
    educationSummaryFr: "Lycée Louis-le-Grand, Sciences Po Paris, ENA (Promotion Vauban), Harvard Summer School",
    stages: [
      {
        yearStart: 1951,
        yearEnd: 1959,
        role: "Sciences Po & ENA Graduate",
        roleFr: "Diplômé de Sciences Po & Énarque",
        organization: "Sciences Po & ENA (Vauban class)",
        organizationFr: "Sciences Po & ENA (promotion Vauban)",
        type: "education",
        description: "Audited courses at Harvard University before graduating into the Court of Audit (Cour des Comptes).",
        descriptionFr: "Suit des cours d'été à Harvard avant d'entrer à l'ENA et de sortir à la Cour des comptes."
      },
      {
        yearStart: 1956,
        yearEnd: 1957,
        role: "Cavalry Officer (Sous-Lieutenant)",
        roleFr: "Officier de cavalerie (Sous-lieutenant)",
        organization: "French Armed Forces in Algerian War",
        organizationFr: "Armée de terre en Algérie",
        type: "military",
        description: "Volunteered for frontline combat duty in Algeria; wounded in action and cited for valor.",
        descriptionFr: "Part volontairement au combat en Algérie; blessé au feu et cité pour sa bravoure."
      },
      {
        yearStart: 1962,
        yearEnd: 1974,
        role: "Advisor to Pompidou & Deputy for Corrèze",
        roleFr: "Conseiller à Matignon & Député de la Corrèze",
        organization: "Prime Minister's Office & National Assembly",
        organizationFr: "Cabinet Pompidou & Assemblée nationale",
        type: "political",
        description: "Nicknamed 'the Bulldozer' by Pompidou for tireless work ethic; served as Minister of Agriculture and Interior.",
        descriptionFr: "Surnommé 'le Bulldozer' par Pompidou pour son énergie prodigieuse; ministre de l'Agriculture très populaire."
      },
      {
        yearStart: 1974,
        yearEnd: 1976,
        role: "Prime Minister of France",
        roleFr: "Premier ministre",
        organization: "Giscard d'Estaing Presidency",
        organizationFr: "Présidence Valéry Giscard d'Estaing",
        type: "political",
        description: "Appointed head of government by President Giscard; resigned over policy disagreements and founded the RPR Gaullist party.",
        descriptionFr: "Premier ministre de Giscard; démissionne en 1976 pour fonder le grand parti gaulliste, le RPR."
      },
      {
        yearStart: 1977,
        yearEnd: 1995,
        role: "Mayor of Paris & Prime Minister (1986-1988)",
        roleFr: "Maire de Paris & Premier ministre de cohabitation",
        organization: "City of Paris & National Government",
        organizationFr: "Ville de Paris & Hôtel Matignon",
        type: "political",
        description: "First modern elected Mayor of Paris for 18 years; also served as Prime Minister in the first 'cohabitation' with Mitterrand.",
        descriptionFr: "Premier maire élu de Paris moderne pendant 18 ans; Premier ministre de la première cohabitation."
      }
    ]
  },

  // 22. Nicolas Sarkozy (2007-2012)
  128: {
    monarchId: 128,
    educationSummary: "University of Paris X Nanterre (Master in Private Law, DEA), Sciences Po Paris, Paris Bar Exam",
    educationSummaryFr: "Université Paris X Nanterre (Maîtrise de droit privé, DEA), Sciences Po, CAPA",
    stages: [
      {
        yearStart: 1978,
        yearEnd: 1981,
        role: "Law Graduate & Barrister",
        roleFr: "Titulaire du CAPA & Avocat",
        organization: "Paris Bar",
        organizationFr: "Barreau de Paris",
        type: "education",
        description: "Completed legal studies in private and business law; co-founded a prominent Paris law firm specializing in property and corporate law.",
        descriptionFr: "Avocat au barreau de Paris; cofonde un cabinet spécialisé en droit des affaires et droit immobilier."
      },
      {
        yearStart: 1983,
        yearEnd: 2002,
        role: "Mayor of Neuilly-sur-Seine",
        roleFr: "Maire de Neuilly-sur-Seine",
        organization: "Municipality of Neuilly-sur-Seine",
        organizationFr: "Ville de Neuilly-sur-Seine",
        type: "political",
        description: "Elected at age 28 as the youngest mayor of a French city with over 50,000 residents; gained national acclaim during the 1993 kindergarten hostage crisis.",
        descriptionFr: "Élu maire à 28 ans; acquiert une renommée nationale lors de la prise d'otages de la maternelle de Neuilly en 1993."
      },
      {
        yearStart: 1993,
        yearEnd: 1995,
        role: "Minister of the Budget & Government Spokesperson",
        roleFr: "Ministre du Budget & Porte-parole du gouvernement",
        organization: "Balladur Government",
        organizationFr: "Gouvernement Édouard Balladur",
        type: "political",
        description: "Managed fiscal policy and state accounts; served as the chief political voice of the government.",
        descriptionFr: "Gère les comptes publics et assure la communication gouvernementale comme porte-parole."
      },
      {
        yearStart: 2002,
        yearEnd: 2004,
        role: "Minister of the Interior",
        roleFr: "Ministre de l'Intérieur, de la Sécurité intérieure et des Libertés locales",
        organization: "Raffarin Cabinet (Chirac Presidency)",
        organizationFr: "Gouvernement Jean-Pierre Raffarin",
        type: "political",
        description: "Spearheaded high-profile security policies, proximity policing reforms, and founded the French Council of the Muslim Faith (CFCM).",
        descriptionFr: "Ministre de terrain très médiatique; crée le Conseil français du culte musulman (CFCM)."
      },
      {
        yearStart: 2005,
        yearEnd: 2007,
        role: "Minister of State & President of the UMP",
        roleFr: "Ministre d'État, Ministre de l'Intérieur & Président de l'UMP",
        organization: "Government of France & Union for a Popular Movement",
        organizationFr: "Hôtel de Beauvau & Union pour un Mouvement Populaire",
        type: "political",
        description: "Elected head of the ruling center-right party; built a formidable campaign machine around the theme of 'Rupture' and labor value.",
        descriptionFr: "Prend la tête de l'UMP et mène la campagne victorieuse de 2007 autour de la valeur travail ('Travailler plus pour gagner plus')."
      }
    ]
  },

  // 23. François Hollande (2012-2017)
  129: {
    monarchId: 129,
    educationSummary: "HEC Paris, Sciences Po Paris, ENA (École nationale d'administration - Promotion Voltaire)",
    educationSummaryFr: "HEC Paris, Sciences Po Paris, ENA (Promotion Voltaire)",
    stages: [
      {
        yearStart: 1974,
        yearEnd: 1980,
        role: "HEC, Sciences Po & ENA Graduate",
        roleFr: "Diplômé d'HEC, Sciences Po & Énarque",
        organization: "HEC, Sciences Po & ENA (Voltaire class)",
        organizationFr: "HEC Paris, Sciences Po & ENA (promotion Voltaire)",
        type: "education",
        description: "Achieved the rare distinction of graduating from France's top business school (HEC), Sciences Po, and ENA in the famed Voltaire class.",
        descriptionFr: "Fait le prestigieux grand chelem HEC, Sciences Po et l'ENA dans la célèbre promotion Voltaire."
      },
      {
        yearStart: 1980,
        yearEnd: 1988,
        role: "Auditor & Councillor at the Court of Audit",
        roleFr: "Auditeur & Conseiller référendaire à la Cour des comptes",
        organization: "Cour des Comptes",
        organizationFr: "Cour des comptes",
        type: "civil",
        description: "Served as state financial magistrate and economic advisor to President François Mitterrand at the Élysée.",
        descriptionFr: "Magistrat financier à la Cour des comptes et chargé de mission à l'Élysée auprès de Mitterrand."
      },
      {
        yearStart: 1988,
        yearEnd: 1997,
        role: "Deputy for Corrèze",
        roleFr: "Député de la Corrèze",
        organization: "National Assembly",
        organizationFr: "Assemblée nationale",
        type: "political",
        description: "Rooted his national political career in rural Tulle and Corrèze; respected parliamentary debater on taxation and budget.",
        descriptionFr: "Implanté à Tulle; débatteur réputé pour sa finesse d'esprit et sa maîtrise budgétaire."
      },
      {
        yearStart: 1997,
        yearEnd: 2008,
        role: "First Secretary of the Socialist Party",
        roleFr: "Premier secrétaire du Parti socialiste",
        organization: "Parti Socialiste (PS)",
        organizationFr: "Parti Socialiste (PS)",
        type: "political",
        description: "Longest-tenured leader of the French Socialist Party (11 years); preserved party unity through cohabitation and referendums.",
        descriptionFr: "Record de longévité comme Premier secrétaire du PS (11 ans); rassembleur des courants socialistes."
      },
      {
        yearStart: 2008,
        yearEnd: 2012,
        role: "President of the General Council of Corrèze",
        roleFr: "Président du Conseil général de la Corrèze",
        organization: "Department of Corrèze",
        organizationFr: "Département de la Corrèze",
        type: "political",
        description: "Led departmental executive governance before winning the first nationwide socialist open presidential primary in 2011.",
        descriptionFr: "Préside le département de la Corrèze avant de remporter la primaire citoyenne ouverte de 2011."
      }
    ]
  },

  // 24. Emmanuel Macron (2017-present)
  122: {
    monarchId: 122,
    educationSummary: "Lycée Henri-IV, University of Paris Nanterre (DEA in Philosophy), Sciences Po Paris, ENA (Léopold Sédar Senghor class)",
    educationSummaryFr: "Lycée Henri-IV, Université Paris Nanterre (DEA de philosophie), Sciences Po, ENA (Promotion Senghor)",
    stages: [
      {
        yearStart: 1999,
        yearEnd: 2004,
        role: "Philosophy Scholar, Sciences Po & ENA Graduate",
        roleFr: "Étudiant en philosophie, Sciences Po & Énarque",
        organization: "Sciences Po & ENA (Senghor class)",
        organizationFr: "Sciences Po & ENA (promotion Senghor)",
        type: "education",
        description: "Served as editorial assistant to philosopher Paul Ricœur; graduated from ENA into the prestigious Inspection of Finances.",
        descriptionFr: "Assistant éditorial du philosophe Paul Ricœur; sort de l'ENA dans l'Inspection générale des finances."
      },
      {
        yearStart: 2004,
        yearEnd: 2008,
        role: "Inspector of Finances",
        roleFr: "Inspecteur des finances",
        organization: "Inspection Générale des Finances (IGF)",
        organizationFr: "Inspection générale des finances (IGF)",
        type: "civil",
        description: "Conducted national audits on state spending and served as deputy rapporteur for the Attali Commission on economic growth.",
        descriptionFr: "Mène des missions d'audit d'État et devient rapporteur adjoint de la commission Attali pour la libération de la croissance."
      },
      {
        yearStart: 2008,
        yearEnd: 2012,
        role: "Investment Banker & Managing Director",
        roleFr: "Banquier d'affaires & Associé-gérant",
        organization: "Rothschild & Cie Banque",
        organizationFr: "Rothschild & Cie Banque",
        type: "civil",
        description: "Advised on major cross-border corporate mergers and acquisitions, including the Nestlé-Pfizer transaction.",
        descriptionFr: "Conseille de grandes fusions-acquisitions d'entreprises internationales, dont le rachat par Nestlé de la filiale de Pfizer."
      },
      {
        yearStart: 2012,
        yearEnd: 2014,
        role: "Deputy Secretary-General of the Élysée",
        roleFr: "Secrétaire général adjoint de l'Élysée",
        organization: "Presidency of the French Republic",
        organizationFr: "Présidence de la République (Palais de l'Élysée)",
        type: "political",
        description: "Chief economic and financial advisor to President François Hollande; structured the Competitiveness and Employment Tax Credit (CICE).",
        descriptionFr: "Conseiller économique et financier en chef du président François Hollande; architecte du CICE."
      },
      {
        yearStart: 2014,
        yearEnd: 2016,
        role: "Minister of Economics, Industry and Digital Affairs",
        roleFr: "Ministre de l'Économie, de l'Industrie et du Numérique",
        organization: "Valls Government",
        organizationFr: "Gouvernement Manuel Valls",
        type: "political",
        description: "Spearheaded the 'Macron Law' for growth, economic deregulation, and French tech innovation.",
        descriptionFr: "Fait adopter la loi Macron pour la croissance et soutient activement l'écosystème French Tech."
      },
      {
        yearStart: 2016,
        yearEnd: 2017,
        role: "Founder & Presidential Candidate",
        roleFr: "Fondateur d'En Marche! & Candidat à la présidentielle",
        organization: "En Marche!",
        organizationFr: "En Marche!",
        type: "political",
        description: "Launched an unprecedented trans-partisan political movement from scratch, leading to an extraordinary election victory at age 39.",
        descriptionFr: "Crée un mouvement politique inédit transcendant les clivages traditionnels et remporte la présidentielle à 39 ans."
      }
    ]
  },

  // Bonus: Louis-Napoléon Bonaparte (1848-1852 - First President of the Republic)
  220: {
    monarchId: 220,
    educationSummary: "Arenenberg (Switzerland), Artillery School of Thun",
    educationSummaryFr: "Arenenberg (Suisse), École militaire de Thoune",
    stages: [
      {
        yearStart: 1830,
        yearEnd: 1834,
        role: "Artillery Officer & Swiss Citizen",
        roleFr: "Capitaine d'artillerie & Citoyen suisse",
        organization: "Swiss Federal Army",
        organizationFr: "Armée fédérale suisse",
        type: "military",
        description: "Trained in artillery under General Dufour; published tactical military manuals.",
        descriptionFr: "Officier d'artillerie sous les ordres du général Dufour; publie des manuels de tactique militaire."
      },
      {
        yearStart: 1836,
        yearEnd: 1846,
        role: "Political Essayist & Prisoner of Ham",
        roleFr: "Essayiste politique & Prisonnier du fort de Ham",
        organization: "Napoleonic Movement",
        organizationFr: "Mouvement bonapartiste",
        type: "political",
        description: "Authored 'Des Idées Napoléoniennes' and 'L'Extinction du Paupérisme'; escaped disguised as workman 'Badinguet'.",
        descriptionFr: "Auteur de 'L'Extinction du paupérisme'; s'évade du fort de Ham sous les habits de l'ouvrier Badinguet."
      },
      {
        yearStart: 1848,
        yearEnd: 1848,
        role: "Deputy to the Constituent Assembly",
        roleFr: "Représentant du peuple à l'Assemblée constituante",
        organization: "National Constituent Assembly (Second Republic)",
        organizationFr: "Assemblée constituante (Deuxième République)",
        type: "political",
        description: "Elected overwhelmingly in five departments during by-elections following the February 1848 Revolution.",
        descriptionFr: "Élu triomphalement dans cinq départements lors des élections partielles de 1848."
      }
    ]
  }
};

export const getPresidentCareer = (id: number): PresidentCareer => {
  if (presidentCareers[id]) {
    return presidentCareers[id];
  }
  
  // Clean fallback if an unknown id is provided
  return {
    monarchId: id,
    educationSummary: "Faculty of Law & Higher Civil Administration",
    educationSummaryFr: "Faculté de droit & Haute administration",
    stages: [
      {
        yearStart: 1900,
        role: "Legal & Civil Studies",
        roleFr: "Études juridiques et administratives",
        type: "education",
        description: "Education in legal, municipal, or higher administrative institutions.",
        descriptionFr: "Formation en droit, administration ou affaires publiques."
      },
      {
        yearStart: 1915,
        role: "Parliamentary & Ministerial Career",
        roleFr: "Carrière parlementaire et ministérielle",
        type: "political",
        description: "Served as deputy or senator and held ministerial portfolios prior to election.",
        descriptionFr: "Mandats de député ou sénateur et fonctions ministérielles avant l'accession à l'Élysée."
      }
    ]
  };
};
