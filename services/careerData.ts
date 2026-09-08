import { PresidentCareer } from '../types';

export const presidentCareers: Record<number, PresidentCareer> = {
  119: {
    // Charles de Gaulle
    monarchId: 119,
    educationSummary: "École Spéciale Militaire de Saint-Cyr",
    educationSummaryFr: "École Spéciale Militaire de Saint-Cyr",
    stages: [
      {
        yearStart: 1909,
        yearEnd: 1912,
        role: "Cadet",
        roleFr: "Élève-officier",
        organization: "École Spéciale Militaire de Saint-Cyr",
        type: "education"
      },
      {
        yearStart: 1912,
        yearEnd: 1918,
        role: "Officer",
        roleFr: "Officier",
        organization: "French Army",
        organizationFr: "Armée française",
        type: "military",
        description: "Served in WWI, wounded and captured at the Battle of Verdun."
      },
      {
        yearStart: 1940,
        yearEnd: 1944,
        role: "Leader of Free France",
        roleFr: "Chef de la France Libre",
        organization: "Free French Forces",
        organizationFr: "Forces Françaises Libres",
        type: "military"
      },
      {
        yearStart: 1944,
        yearEnd: 1946,
        role: "Chairman",
        roleFr: "Président",
        organization: "Provisional Government of the French Republic",
        organizationFr: "Gouvernement provisoire de la République française",
        type: "political"
      },
      {
        yearStart: 1958,
        yearEnd: 1959,
        role: "Prime Minister",
        roleFr: "Premier ministre",
        organization: "French Republic",
        organizationFr: "République française",
        type: "political",
        description: "Drafted the constitution of the Fifth Republic."
      }
    ]
  },
  122: {
    // Emmanuel Macron
    monarchId: 122,
    educationSummary: "Sciences Po, ENA (École nationale d'administration)",
    educationSummaryFr: "Sciences Po, ENA (École nationale d'administration)",
    stages: [
      {
        yearStart: 1999,
        yearEnd: 2001,
        role: "Student",
        roleFr: "Étudiant",
        organization: "Sciences Po",
        type: "education"
      },
      {
        yearStart: 2002,
        yearEnd: 2004,
        role: "Student",
        roleFr: "Étudiant",
        organization: "ENA",
        type: "education"
      },
      {
        yearStart: 2004,
        yearEnd: 2008,
        role: "Inspector of Finances",
        roleFr: "Inspecteur des finances",
        organization: "Inspection générale des finances (IGF)",
        type: "civil"
      },
      {
        yearStart: 2008,
        yearEnd: 2012,
        role: "Investment Banker",
        roleFr: "Banquier d'affaires",
        organization: "Rothschild & Cie Banque",
        type: "civil"
      },
      {
        yearStart: 2012,
        yearEnd: 2014,
        role: "Deputy Secretary-General",
        roleFr: "Secrétaire général adjoint",
        organization: "Élysée Palace",
        organizationFr: "Palais de l'Élysée",
        type: "political"
      },
      {
        yearStart: 2014,
        yearEnd: 2016,
        role: "Minister of Economics, Industry and Digital Affairs",
        roleFr: "Ministre de l'Économie, de l'Industrie et du Numérique",
        organization: "Government of France",
        organizationFr: "Gouvernement français",
        type: "political"
      },
      {
        yearStart: 2016,
        yearEnd: 2017,
        role: "Founder & Leader",
        roleFr: "Fondateur et Dirigeant",
        organization: "En Marche!",
        type: "political"
      }
    ]
  }
};

export const getPresidentCareer = (id: number): PresidentCareer => {
  if (presidentCareers[id]) {
    return presidentCareers[id];
  }
  
  // Default fallback for presidents without specific data
  return {
    monarchId: id,
    educationSummary: "Various civil and political education",
    educationSummaryFr: "Formation civile et politique diverse",
    stages: [
      {
        yearStart: 1900,
        role: "Early Education & Career",
        roleFr: "Éducation et début de carrière",
        type: "education",
        description: "Background in law, civil service, or military."
      },
      {
        yearStart: 1920,
        role: "Political Ascension",
        roleFr: "Ascension politique",
        type: "political",
        description: "Held various legislative and ministerial positions before becoming President."
      }
    ]
  };
};
