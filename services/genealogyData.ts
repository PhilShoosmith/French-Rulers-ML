import { MonarchGenealogy } from '../types';

export const monarchGenealogyList: MonarchGenealogy[] = [
  // 1. Philip I (id: 201)
  {
    monarchId: 201,
    monarchName: 'Philip I',
    house: 'Capet',
    parents: {
      father: { name: 'Henry I of France', title: 'King of the Franks' },
      mother: { name: 'Anne of Kiev', title: 'Queen of the Franks' }
    },
    unions: [
      {
        spouse: {
          name: 'Bertha of Holland',
          nameFr: 'Berthe de Hollande',
          marriageYear: '1072 (repudiated 1092)',
          origin: 'Daughter of Floris I, Count of Holland',
          notes: 'Mother of the heir Louis VI'
        },
        children: [
          { name: 'Constance of France', nameFr: 'Constance de France', birthDeath: '1078–1126', title: 'Princess of Antioch, Countess of Troyes' },
          { name: 'Louis VI the Fat', nameFr: 'Louis VI le Gros', birthDeath: '1081–1137', title: 'King of the Franks', becameMonarch: true, monarchId: 202 },
          { name: 'Henry of France', nameFr: 'Henri de France', birthDeath: '1083–1089', notes: 'Died in childhood' },
          { name: 'Charles of France', nameFr: 'Charles de France', birthDeath: '1085–1091', notes: 'Died in childhood' },
          { name: 'Eudes of France', nameFr: 'Eudes de France', birthDeath: '1087–1096', notes: 'Died in childhood' }
        ]
      },
      {
        spouse: {
          name: 'Bertrade de Montfort',
          nameFr: 'Bertrade de Montfort',
          marriageYear: '1092',
          origin: 'Countess of Anjou, daughter of Simon I de Montfort',
          notes: 'Marriage led to Philip I excommunication by Pope Urban II'
        },
        children: [
          { name: 'Philip of France', nameFr: 'Philippe de France', birthDeath: 'c. 1093–1123', title: 'Count of Mantes' },
          { name: 'Floris of France', nameFr: 'Fleury de France', birthDeath: 'c. 1095–1119', title: 'Lord of Nangis' },
          { name: 'Cecilia of France', nameFr: 'Cécile de France', birthDeath: '1097–1145', title: 'Countess of Tripoli, Princess of Galilee' },
          { name: 'Eustachia of France', nameFr: 'Eustachie de France', birthDeath: '1102–1143', title: 'Lady of Étampes' }
        ]
      }
    ]
  },

  // 2. Louis VI (id: 202)
  {
    monarchId: 202,
    monarchName: 'Louis VI',
    house: 'Capet',
    parents: {
      father: { name: 'Philip I', monarchId: 201, title: 'King of the Franks' },
      mother: { name: 'Bertha of Holland', title: 'Queen of the Franks' }
    },
    unions: [
      {
        spouse: {
          name: 'Lucienne de Rochefort',
          nameFr: 'Lucienne de Rochefort',
          marriageYear: '1104 (annulled 1107)',
          origin: 'Daughter of Guy II the Red, Count of Rochefort'
        },
        children: [
          { name: 'Isabelle of France', nameFr: 'Isabelle de France', birthDeath: 'c. 1105–1175', title: 'Lady of Crécy' }
        ]
      },
      {
        spouse: {
          name: 'Adelaide of Maurienne (Savoy)',
          nameFr: 'Adélaïde de Maurienne (Savoie)',
          marriageYear: '1115',
          origin: 'Daughter of Humbert II, Count of Savoy',
          notes: 'Influential queen consort and active politically'
        },
        children: [
          { name: 'Philip of France', nameFr: 'Philippe de France', birthDeath: '1116–1131', title: 'Co-King of France (died from horse fall)' },
          { name: 'Louis VII the Young', nameFr: 'Louis VII le Jeune', birthDeath: '1120–1180', title: 'King of the Franks', becameMonarch: true, monarchId: 203 },
          { name: 'Henry of France', nameFr: 'Henri de France', birthDeath: '1121–1175', title: 'Archbishop of Reims' },
          { name: 'Hugh of France', nameFr: 'Hugues de France', birthDeath: 'c. 1123', notes: 'Died in infancy' },
          { name: 'Robert I of Dreux', nameFr: 'Robert Ier de Dreux', birthDeath: '1123–1188', title: 'Count of Dreux (founder of House of Dreux)' },
          { name: 'Peter I of Courtenay', nameFr: 'Pierre Ier de Courtenay', birthDeath: '1126–1183', title: 'Lord of Courtenay (founder of Capetian Courtenay)' },
          { name: 'Constance of France', nameFr: 'Constance de France', birthDeath: '1128–1176', title: 'Countess of Boulogne & Toulouse' },
          { name: 'Philip of France', nameFr: 'Philippe de France', birthDeath: '1132–1160', title: 'Archdeacon of Paris' }
        ]
      }
    ]
  },

  // 3. Louis VII (id: 203)
  {
    monarchId: 203,
    monarchName: 'Louis VII',
    house: 'Capet',
    parents: {
      father: { name: 'Louis VI', monarchId: 202, title: 'King of the Franks' },
      mother: { name: 'Adelaide of Maurienne', title: 'Queen of the Franks' }
    },
    unions: [
      {
        spouse: {
          name: 'Eleanor of Aquitaine',
          nameFr: "Aliénor d'Aquitaine",
          marriageYear: '1137 (annulled 1152)',
          origin: 'Duchess of Aquitaine in her own right',
          notes: 'Went on the Second Crusade; later married Henry II of England'
        },
        children: [
          { name: 'Marie of France', nameFr: 'Marie de France', birthDeath: '1145–1198', title: 'Countess of Champagne, famous literary patroness' },
          { name: 'Alix of France', nameFr: 'Alix de France', birthDeath: '1150–1197', title: 'Countess of Blois' }
        ]
      },
      {
        spouse: {
          name: 'Constance of Castile',
          nameFr: 'Constance de Castille',
          marriageYear: '1154 (died 1160)',
          origin: 'Daughter of Alfonso VII, King of León and Castile'
        },
        children: [
          { name: 'Margaret of France', nameFr: 'Marguerite de France', birthDeath: '1158–1197', title: 'Queen of England and later Queen of Hungary' },
          { name: 'Alys of France', nameFr: 'Alys de France', birthDeath: '1160–c. 1220', title: 'Countess of the Vexin, betrothed to Richard I' }
        ]
      },
      {
        spouse: {
          name: 'Adela of Champagne',
          nameFr: 'Adèle de Champagne',
          marriageYear: '1160',
          origin: 'Daughter of Theobald II, Count of Champagne',
          notes: 'Gave Louis VII his long-desired male heir'
        },
        children: [
          { name: 'Philip II Augustus', nameFr: 'Philippe II Auguste', birthDeath: '1165–1223', title: 'King of France', becameMonarch: true, monarchId: 204 },
          { name: 'Agnes of France (Anna)', nameFr: 'Agnès de France', birthDeath: '1171–1204', title: 'Byzantine Empress (wife of Alexios II & Andronikos I)' }
        ]
      }
    ]
  },

  // 4. Philip II (id: 204)
  {
    monarchId: 204,
    monarchName: 'Philip II',
    house: 'Capet',
    parents: {
      father: { name: 'Louis VII', monarchId: 203, title: 'King of the Franks' },
      mother: { name: 'Adela of Champagne', title: 'Queen of the Franks' }
    },
    unions: [
      {
        spouse: {
          name: 'Isabella of Hainault',
          nameFr: 'Isabelle de Hainaut',
          marriageYear: '1180 (died 1190)',
          origin: 'Daughter of Baldwin V, Count of Hainault; descendant of Charlemagne'
        },
        children: [
          { name: 'Louis VIII the Lion', nameFr: 'Louis VIII le Lion', birthDeath: '1187–1226', title: 'King of France', becameMonarch: true, monarchId: 205 },
          { name: 'Robert & Philip of France', nameFr: 'Robert et Philippe', birthDeath: '1190–1190', notes: 'Twins, died in infancy with their mother' }
        ]
      },
      {
        spouse: {
          name: 'Ingeborg of Denmark',
          nameFr: 'Ingeborg de Danemark',
          marriageYear: '1193',
          origin: 'Daughter of Valdemar I of Denmark',
          notes: 'Repudiated the day after the wedding; restored as Queen in 1213'
        },
        children: []
      },
      {
        spouse: {
          name: 'Agnes of Merania',
          nameFr: "Agnès de Méranie",
          marriageYear: '1196 (died 1201)',
          origin: 'Daughter of Berthold, Duke of Merania',
          notes: 'Controversial marriage that caused papal interdict on France'
        },
        children: [
          { name: 'Marie of France', nameFr: 'Marie de France', birthDeath: '1198–1224', title: 'Duchess of Brabant' },
          { name: 'Philip I of Boulogne', nameFr: 'Philippe Hurepel', birthDeath: '1200–1234', title: 'Count of Boulogne and Clermont' }
        ]
      }
    ]
  },

  // 5. Louis VIII (id: 205)
  {
    monarchId: 205,
    monarchName: 'Louis VIII',
    house: 'Capet',
    parents: {
      father: { name: 'Philip II', monarchId: 204, title: 'King of France' },
      mother: { name: 'Isabella of Hainault', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Blanche of Castile',
          nameFr: 'Blanche de Castille',
          marriageYear: '1200',
          origin: 'Daughter of Alfonso VIII of Castile and Eleanor of England',
          notes: 'Revered queen regent and mother of Saint Louis'
        },
        children: [
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1205–1206', notes: 'Died in infancy' },
          { name: 'Philip of France', nameFr: 'Philippe de France', birthDeath: '1209–1218', notes: 'Dauphin/heir, died young' },
          { name: 'Alphonse & John', nameFr: 'Alphonse et Jean', birthDeath: '1213–1213', notes: 'Twins, died at birth' },
          { name: 'Louis IX (Saint Louis)', nameFr: 'Louis IX (Saint Louis)', birthDeath: '1214–1270', title: 'King of France', becameMonarch: true, monarchId: 102 },
          { name: 'Robert I of Artois', nameFr: "Robert Ier d'Artois", birthDeath: '1216–1250', title: 'Count of Artois (founder of House of Artois)' },
          { name: 'John of France', nameFr: 'Jean de France', birthDeath: '1219–1232', title: 'Count of Anjou and Maine' },
          { name: 'Alphonse of Poitiers', nameFr: 'Alphonse de Poitiers', birthDeath: '1220–1271', title: 'Count of Poitiers and Toulouse' },
          { name: 'Saint Isabelle of France', nameFr: 'Sainte Isabelle de France', birthDeath: '1225–1270', title: 'Abbess of Longchamp, Roman Catholic Saint' },
          { name: 'Charles I of Anjou', nameFr: "Charles Ier d'Anjou", birthDeath: '1227–1285', title: 'King of Sicily & Naples (founder of Capetian House of Anjou)' }
        ]
      }
    ]
  },

  // 6. Louis IX (Saint Louis) (id: 102)
  {
    monarchId: 102,
    monarchName: 'Louis IX',
    house: 'Capet',
    parents: {
      father: { name: 'Louis VIII', monarchId: 205, title: 'King of France' },
      mother: { name: 'Blanche of Castile', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Margaret of Provence',
          nameFr: 'Marguerite de Provence',
          marriageYear: '1234',
          origin: 'Daughter of Ramon Berenguer IV, Count of Provence',
          notes: 'Accompanied Saint Louis on the Seventh Crusade'
        },
        children: [
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1240–1243', notes: 'Died in childhood' },
          { name: 'Isabella of France', nameFr: 'Isabelle de France', birthDeath: '1241–1271', title: 'Queen of Navarre (wife of Theobald II)' },
          { name: 'Louis of France', nameFr: 'Louis de France', birthDeath: '1244–1260', title: 'Crown Prince, died aged 16' },
          { name: 'Philip III the Bold', nameFr: 'Philippe III le Hardi', birthDeath: '1245–1285', title: 'King of France', becameMonarch: true, monarchId: 206 },
          { name: 'John Tristan', nameFr: 'Jean Tristan', birthDeath: '1250–1270', title: 'Count of Valois (born in Damietta during Crusade)' },
          { name: 'Peter of France', nameFr: 'Pierre de France', birthDeath: '1251–1284', title: 'Count of Alençon and Perche' },
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1253–1323', title: 'Infanta of Castile (wife of Ferdinand de la Cerda)' },
          { name: 'Margaret of France', nameFr: 'Marguerite de France', birthDeath: '1254–1271', title: 'Duchess of Brabant' },
          { name: 'Robert, Count of Clermont', nameFr: 'Robert de Clermont', birthDeath: '1256–1317', title: 'Count of Clermont (Patriarch of the Royal House of Bourbon!)' },
          { name: 'Agnes of France', nameFr: 'Agnès de France', birthDeath: '1260–1327', title: 'Duchess of Burgundy (wife of Robert II)' }
        ]
      }
    ]
  },

  // 7. Philip III (id: 206)
  {
    monarchId: 206,
    monarchName: 'Philip III',
    house: 'Capet',
    parents: {
      father: { name: 'Louis IX', monarchId: 102, title: 'King of France' },
      mother: { name: 'Margaret of Provence', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Isabella of Aragon',
          nameFr: "Isabelle d'Aragon",
          marriageYear: '1262 (died 1271)',
          origin: 'Daughter of James I the Conqueror, King of Aragon'
        },
        children: [
          { name: 'Louis of France', nameFr: 'Louis de France', birthDeath: '1264–1276', title: 'Crown Prince, died young' },
          { name: 'Philip IV the Fair', nameFr: 'Philippe IV le Bel', birthDeath: '1268–1314', title: 'King of France', becameMonarch: true, monarchId: 103 },
          { name: 'Robert of France', nameFr: 'Robert de France', birthDeath: '1269–1271', notes: 'Died in infancy' },
          { name: 'Charles, Count of Valois', nameFr: 'Charles de Valois', birthDeath: '1270–1325', title: 'Count of Valois (Founder of the Royal House of Valois!)' }
        ]
      },
      {
        spouse: {
          name: 'Marie of Brabant',
          nameFr: 'Marie de Brabant',
          marriageYear: '1274',
          origin: 'Daughter of Henry III, Duke of Brabant'
        },
        children: [
          { name: 'Louis of France', nameFr: "Louis d'Évreux", birthDeath: '1276–1319', title: "Count of Évreux (founder of House of Évreux)" },
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1278–1305', title: 'Duchess of Austria (wife of Rudolf I of Bohemia)' },
          { name: 'Margaret of France', nameFr: 'Marguerite de France', birthDeath: '1282–1318', title: 'Queen of England (second wife of King Edward I)' }
        ]
      }
    ]
  },

  // 8. Philip IV (id: 103)
  {
    monarchId: 103,
    monarchName: 'Philip IV',
    house: 'Capet',
    parents: {
      father: { name: 'Philip III', monarchId: 206, title: 'King of France' },
      mother: { name: 'Isabella of Aragon', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Joan I of Navarre',
          nameFr: 'Jeanne Ire de Navarre',
          marriageYear: '1284',
          origin: 'Queen regnant of Navarre, Countess of Champagne',
          notes: 'Brought the Kingdom of Navarre and Champagne into French royal union'
        },
        children: [
          { name: 'Margaret of France', nameFr: 'Marguerite de France', birthDeath: '1288–1294', notes: 'Died in childhood' },
          { name: 'Louis X the Quarreler', nameFr: 'Louis X le Hutin', birthDeath: '1289–1316', title: 'King of France & Navarre', becameMonarch: true, monarchId: 207 },
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1290–1294', notes: 'Died in childhood' },
          { name: 'Philip V the Tall', nameFr: 'Philippe V le Long', birthDeath: '1293–1322', title: 'King of France & Navarre', becameMonarch: true, monarchId: 209 },
          { name: 'Charles IV the Fair', nameFr: 'Charles IV le Bel', birthDeath: '1294–1328', title: 'King of France & Navarre', becameMonarch: true, monarchId: 210 },
          { name: 'Isabella of France', nameFr: 'Isabelle de France', birthDeath: '1295–1358', title: "Queen of England ('She-Wolf of France', mother of Edward III)" },
          { name: 'Robert of France', nameFr: 'Robert de France', birthDeath: '1297–1308', notes: 'Died young' }
        ]
      }
    ]
  },

  // 9. Louis X (id: 207)
  {
    monarchId: 207,
    monarchName: 'Louis X',
    house: 'Capet',
    parents: {
      father: { name: 'Philip IV', monarchId: 103, title: 'King of France' },
      mother: { name: 'Joan I of Navarre', title: 'Queen of Navarre and France' }
    },
    unions: [
      {
        spouse: {
          name: 'Margaret of Burgundy',
          nameFr: 'Marguerite de Bourgogne',
          marriageYear: '1305 (died 1315)',
          origin: 'Daughter of Robert II, Duke of Burgundy',
          notes: 'Implicated in the Tour de Nesle affair; died imprisoned'
        },
        children: [
          { name: 'Joan II of Navarre', nameFr: 'Jeanne II de Navarre', birthDeath: '1312–1349', title: 'Queen regnant of Navarre' }
        ]
      },
      {
        spouse: {
          name: 'Clementia of Hungary',
          nameFr: 'Clémence de Hongrie',
          marriageYear: '1315',
          origin: 'Daughter of Charles Martel of Anjou, titular King of Hungary',
          notes: 'Pregnant at Louis X death; gave birth to John I the Posthumous'
        },
        children: [
          { name: 'John I the Posthumous', nameFr: 'Jean Ier le Posthume', birthDeath: '1316–1316', title: 'King of France (lived for 5 days)', becameMonarch: true, monarchId: 208 }
        ]
      }
    ]
  },

  // 10. John I (id: 208)
  {
    monarchId: 208,
    monarchName: 'John I',
    house: 'Capet',
    parents: {
      father: { name: 'Louis X', monarchId: 207, title: 'King of France' },
      mother: { name: 'Clementia of Hungary', title: 'Queen of France' }
    },
    unions: [],
    bioSummary: 'King of France from his birth to his death 5 days later (15–20 November 1316). He is the youngest person to be King of France, the only one to have been king from birth, and the only one to have held the title for his entire life.'
  },

  // 11. Philip V (id: 209)
  {
    monarchId: 209,
    monarchName: 'Philip V',
    house: 'Capet',
    parents: {
      father: { name: 'Philip IV', monarchId: 103, title: 'King of France' },
      mother: { name: 'Joan I of Navarre', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Joan II, Countess of Burgundy',
          nameFr: 'Jeanne II de Bourgogne',
          marriageYear: '1307',
          origin: 'Countess regnant of Burgundy and Artois',
          notes: 'Daughter of Otto IV, Count of Burgundy and Mahaut of Artois'
        },
        children: [
          { name: 'Joan III of Burgundy', nameFr: 'Jeanne III de Bourgogne', birthDeath: '1308–1347', title: 'Countess of Burgundy and Artois' },
          { name: 'Margaret I of Burgundy', nameFr: 'Marguerite Ire de Bourgogne', birthDeath: '1309–1382', title: 'Countess of Burgundy and Artois (wife of Louis I of Flanders)' },
          { name: 'Isabelle of France', nameFr: 'Isabelle de France', birthDeath: '1312–1348', title: 'Dauphine of Viennois' },
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1313–1358', title: 'Nun at Longchamp Abbey' },
          { name: 'Philip of France', nameFr: 'Philippe de France', birthDeath: '1316–1317', notes: 'Died in infancy' }
        ]
      }
    ]
  },

  // 12. Charles IV (id: 210)
  {
    monarchId: 210,
    monarchName: 'Charles IV',
    house: 'Capet',
    parents: {
      father: { name: 'Philip IV', monarchId: 103, title: 'King of France' },
      mother: { name: 'Joan I of Navarre', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Blanche of Burgundy',
          nameFr: 'Blanche de Bourgogne',
          marriageYear: '1308 (annulled 1322)',
          origin: 'Daughter of Otto IV of Burgundy',
          notes: 'Imprisoned after the Tour de Nesle scandal'
        },
        children: [
          { name: 'Philip of France', nameFr: 'Philippe de France', birthDeath: '1314–1322', notes: 'Died in childhood' },
          { name: 'Joan of France', nameFr: 'Jeanne de France', birthDeath: '1315–1321', notes: 'Died in childhood' }
        ]
      },
      {
        spouse: {
          name: 'Marie of Luxembourg',
          nameFr: 'Marie de Luxembourg',
          marriageYear: '1322 (died 1324)',
          origin: 'Daughter of Holy Roman Emperor Henry VII'
        },
        children: [
          { name: 'Louis of France', nameFr: 'Louis de France', birthDeath: '1324–1324', notes: 'Died at birth following carriage accident' }
        ]
      },
      {
        spouse: {
          name: "Jeanne d'Évreux",
          nameFr: "Jeanne d'Évreux",
          marriageYear: '1325',
          origin: "Daughter of Louis, Count of Évreux (paternal cousin)",
          notes: 'Pregnant at Charles IV death; gave birth to a daughter, ending Capet male line'
        },
        children: [
          { name: 'Jeanne of France', nameFr: 'Jeanne de France', birthDeath: '1326–1327', notes: 'Died in infancy' },
          { name: 'Marie of France', nameFr: 'Marie de France', birthDeath: '1327–1341', notes: 'Died young' },
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1328–1393', title: "Duchess of Orléans (wife of Philip of Valois)" }
        ]
      }
    ]
  },

  // 13. Philip VI (id: 104)
  {
    monarchId: 104,
    monarchName: 'Philip VI',
    house: 'Valois',
    parents: {
      father: { name: 'Charles, Count of Valois', title: 'Count of Valois' },
      mother: { name: 'Margaret of Anjou', title: 'Countess of Anjou' }
    },
    unions: [
      {
        spouse: {
          name: 'Joan the Lame of Burgundy',
          nameFr: 'Jeanne de Bourgogne (la Boiteuse)',
          marriageYear: '1313 (died 1349)',
          origin: 'Daughter of Robert II, Duke of Burgundy',
          notes: 'Capable regent during Philip VI wartime campaigns'
        },
        children: [
          { name: 'John II the Good', nameFr: 'Jean II le Bon', birthDeath: '1319–1364', title: 'King of France', becameMonarch: true, monarchId: 211 },
          { name: 'Marie of France', nameFr: 'Marie de France', birthDeath: '1326–1333', notes: 'Died in childhood' },
          { name: 'John of France', nameFr: 'Jean de France', birthDeath: '1333–1333', notes: 'Died at birth' },
          { name: 'Philip of Valois', nameFr: 'Philippe de Valois', birthDeath: '1336–1375', title: "Duke of Orléans and Touraine" },
          { name: 'Joan of France', nameFr: 'Jeanne de France', birthDeath: '1337–1337', notes: 'Died at birth' }
        ]
      },
      {
        spouse: {
          name: 'Blanche of Navarre',
          nameFr: 'Blanche de Navarre',
          marriageYear: '1350',
          origin: 'Daughter of Philip III of Navarre and Joan II of Navarre',
          notes: 'Famous for her great beauty'
        },
        children: [
          { name: 'Joan (Blanche) of France', nameFr: 'Jeanne (Blanche) de France', birthDeath: '1351–1371', notes: 'Posthumous daughter, betrothed to John I of Aragon' }
        ]
      }
    ]
  },

  // 14. John II (id: 211)
  {
    monarchId: 211,
    monarchName: 'John II',
    house: 'Valois',
    parents: {
      father: { name: 'Philip VI', monarchId: 104, title: 'King of France' },
      mother: { name: 'Joan of Burgundy', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Bonne of Luxembourg',
          nameFr: 'Bonne de Luxembourg',
          marriageYear: '1332 (died 1349)',
          origin: 'Daughter of John the Blind, King of Bohemia',
          notes: 'Died of Black Death before John II became king'
        },
        children: [
          { name: 'Charles V the Wise', nameFr: 'Charles V le Sage', birthDeath: '1338–1380', title: 'King of France', becameMonarch: true, monarchId: 105 },
          { name: 'Louis I of Anjou', nameFr: "Louis Ier d'Anjou", birthDeath: '1339–1384', title: 'Duke of Anjou, titular King of Naples' },
          { name: 'John, Duke of Berry', nameFr: 'Jean de Berry', birthDeath: '1340–1416', title: 'Duke of Berry (commissioner of the Très Riches Heures)' },
          { name: 'Philip the Bold', nameFr: 'Philippe le Hardi', birthDeath: '1342–1404', title: 'Duke of Burgundy (Founder of Valois-Burgundy empire)' },
          { name: 'Joan of France', nameFr: 'Jeanne de France', birthDeath: '1343–1373', title: 'Queen of Navarre (wife of Charles II the Bad)' },
          { name: 'Marie of France', nameFr: 'Marie de France', birthDeath: '1344–1404', title: 'Duchess of Bar' },
          { name: 'Isabella of France', nameFr: 'Isabelle de France', birthDeath: '1348–1372', title: 'Countess of Vertus (mother of Valentina Visconti)' }
        ]
      },
      {
        spouse: {
          name: 'Joan I, Countess of Auvergne',
          nameFr: "Jeanne Ire d'Auvergne",
          marriageYear: '1350',
          origin: "Countess regnant of Auvergne and Boulogne"
        },
        children: [
          { name: 'Blanche of France', nameFr: 'Blanche de France', birthDeath: '1350–1350', notes: 'Died at birth' },
          { name: 'Catherine of France', nameFr: 'Catherine de France', birthDeath: '1352–1352', notes: 'Died in infancy' }
        ]
      }
    ]
  },

  // 15. Charles V (id: 105)
  {
    monarchId: 105,
    monarchName: 'Charles V',
    house: 'Valois',
    parents: {
      father: { name: 'John II', monarchId: 211, title: 'King of France' },
      mother: { name: 'Bonne of Luxembourg', title: 'Duchess of Normandy' }
    },
    unions: [
      {
        spouse: {
          name: 'Joan of Bourbon',
          nameFr: 'Jeanne de Bourbon',
          marriageYear: '1350',
          origin: 'Daughter of Peter I, Duke of Bourbon and Isabella of Valois'
        },
        children: [
          { name: 'Jeanne of France', nameFr: 'Jeanne de France', birthDeath: '1357–1360', notes: 'Died in childhood' },
          { name: 'John of France', nameFr: 'Jean de France', birthDeath: '1359–1364', notes: 'Dauphin, died in childhood' },
          { name: 'Charles VI the Mad', nameFr: 'Charles VI le Fou', birthDeath: '1368–1422', title: 'King of France', becameMonarch: true, monarchId: 212 },
          { name: 'Marie of France', nameFr: 'Marie de France', birthDeath: '1370–1377', notes: 'Died in childhood' },
          { name: 'Louis I, Duke of Orléans', nameFr: "Louis Ier d'Orléans", birthDeath: '1372–1407', title: 'Duke of Orléans (Patriarch of Kings Louis XII & Francis I)' },
          { name: 'Catherine of France', nameFr: 'Catherine de France', birthDeath: '1378–1388', title: 'Countess of Montpensier' }
        ]
      }
    ]
  },

  // 16. Charles VI (id: 212)
  {
    monarchId: 212,
    monarchName: 'Charles VI',
    house: 'Valois',
    parents: {
      father: { name: 'Charles V', monarchId: 105, title: 'King of France' },
      mother: { name: 'Joan of Bourbon', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Isabeau of Bavaria',
          nameFr: 'Isabeau de Bavière',
          marriageYear: '1385',
          origin: 'Daughter of Stephen III, Duke of Bavaria-Ingolstadt',
          notes: 'Regent during Charles VI mental illness episodes; signed Treaty of Troyes (1420)'
        },
        children: [
          { name: 'Charles of France', nameFr: 'Charles de France', birthDeath: '1386–1386', notes: 'Dauphin, died in infancy' },
          { name: 'Isabella of Valois', nameFr: 'Isabelle de Valois', birthDeath: '1389–1409', title: 'Queen of England (wife of Richard II) & Duchess of Orléans' },
          { name: 'Joan of France', nameFr: 'Jeanne de France', birthDeath: '1391–1433', title: 'Duchess of Brittany (wife of John V)' },
          { name: 'Marie of France', nameFr: 'Marie de France', birthDeath: '1393–1438', title: 'Prioress of Poissy' },
          { name: 'Michelle of Valois', nameFr: 'Michelle de Valois', birthDeath: '1395–1422', title: 'Duchess of Burgundy (wife of Philip the Good)' },
          { name: 'Louis, Duke of Guyenne', nameFr: 'Louis de Guyenne', birthDeath: '1397–1415', title: 'Dauphin of France, died aged 18' },
          { name: 'John, Duke of Touraine', nameFr: 'Jean de Touraine', birthDeath: '1398–1417', title: 'Dauphin of France, died aged 18' },
          { name: 'Catherine of Valois', nameFr: 'Catherine de Valois', birthDeath: '1401–1437', title: 'Queen of England (wife of Henry V, mother of Henry VI, wife of Owen Tudor)' },
          { name: 'Charles VII the Victorious', nameFr: 'Charles VII le Victorieux', birthDeath: '1403–1461', title: 'King of France', becameMonarch: true, monarchId: 106 },
          { name: 'Philip of France', nameFr: 'Philippe de France', birthDeath: '1407–1407', notes: 'Died at birth' }
        ]
      }
    ]
  },

  // 17. Charles VII (id: 106)
  {
    monarchId: 106,
    monarchName: 'Charles VII',
    house: 'Valois',
    parents: {
      father: { name: 'Charles VI', monarchId: 212, title: 'King of France' },
      mother: { name: 'Isabeau of Bavaria', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Marie of Anjou',
          nameFr: "Marie d'Anjou",
          marriageYear: '1422',
          origin: 'Daughter of Louis II of Anjou and Yolande of Aragon'
        },
        children: [
          { name: 'Louis XI the Prudent', nameFr: 'Louis XI le Prudent', birthDeath: '1423–1483', title: 'King of France', becameMonarch: true, monarchId: 213 },
          { name: 'Radegonde of France', nameFr: 'Radegonde de France', birthDeath: '1428–1445', notes: 'Betrothed to Sigismund of Austria, died young' },
          { name: 'Catherine of France', nameFr: 'Catherine de France', birthDeath: '1428–1446', title: 'Countess of Charolais (wife of Charles the Bold)' },
          { name: 'Yolande of France', nameFr: 'Yolande de France', birthDeath: '1434–1478', title: 'Duchess of Savoy & Regent of Savoy' },
          { name: 'Joan of France', nameFr: 'Jeanne de France', birthDeath: '1435–1482', title: 'Duchess of Bourbon' },
          { name: 'Madeleine of France', nameFr: 'Madeleine de France', birthDeath: '1443–1495', title: 'Princess of Viana, Regent of Navarre' },
          { name: 'Charles, Duke of Berry', nameFr: 'Charles de Berry', birthDeath: '1446–1472', title: 'Duke of Berry, Normandy and Guyenne' }
        ]
      }
    ],
    otherChildren: [
      { name: 'Marie de Valois', nameFr: 'Marie de Valois', birthDeath: '1444–1473', title: 'Countess of Vendôme (daughter with Agnès Sorel)' },
      { name: 'Charlotte de Valois', nameFr: 'Charlotte de Valois', birthDeath: '1446–1477', title: 'Countess of Maulévrier (daughter with Agnès Sorel)' },
      { name: 'Jeanne de Valois', nameFr: 'Jeanne de Valois', birthDeath: '1448–1467', notes: 'Daughter with Agnès Sorel' }
    ]
  },

  // 18. Louis XI (id: 213)
  {
    monarchId: 213,
    monarchName: 'Louis XI',
    house: 'Valois',
    parents: {
      father: { name: 'Charles VII', monarchId: 106, title: 'King of France' },
      mother: { name: 'Marie of Anjou', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Margaret Stewart of Scotland',
          nameFr: "Marguerite d'Écosse",
          marriageYear: '1436 (died 1445)',
          origin: 'Daughter of James I, King of Scots',
          notes: 'Died aged 20 without children'
        },
        children: []
      },
      {
        spouse: {
          name: 'Charlotte of Savoy',
          nameFr: 'Charlotte de Savoie',
          marriageYear: '1451',
          origin: 'Daughter of Louis, Duke of Savoy'
        },
        children: [
          { name: 'Anne of France', nameFr: 'Anne de France (Anne de Beaujeu)', birthDeath: '1461–1522', title: 'Regent of France for Charles VIII, Duchess of Bourbon' },
          { name: 'Joan of France', nameFr: 'Jeanne de France', birthDeath: '1464–1505', title: 'Queen of France (wife of Louis XII), Saint Joan of Valois' },
          { name: 'Charles VIII the Affable', nameFr: "Charles VIII l'Affable", birthDeath: '1470–1498', title: 'King of France', becameMonarch: true, monarchId: 214 },
          { name: 'Francis of France', nameFr: 'François de France', birthDeath: '1472–1473', title: 'Duke of Berry, died in infancy' }
        ]
      }
    ]
  },

  // 19. Charles VIII (id: 214)
  {
    monarchId: 214,
    monarchName: 'Charles VIII',
    house: 'Valois',
    parents: {
      father: { name: 'Louis XI', monarchId: 213, title: 'King of France' },
      mother: { name: 'Charlotte of Savoy', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Anne of Brittany',
          nameFr: 'Anne de Bretagne',
          marriageYear: '1491',
          origin: 'Duchess regnant of Brittany',
          notes: 'United Brittany with the French Crown; later married Louis XII'
        },
        children: [
          { name: 'Charles-Orland', nameFr: 'Charles-Orland', birthDeath: '1492–1495', title: 'Dauphin of France, died of measles aged 3' },
          { name: 'Francis of France', nameFr: 'François de France', birthDeath: '1493–1493', notes: 'Died at birth' },
          { name: 'Charles of France', nameFr: 'Charles de France', birthDeath: '1496–1496', notes: 'Died in infancy' },
          { name: 'Francis of France', nameFr: 'François de France', birthDeath: '1497–1497', notes: 'Died in infancy' },
          { name: 'Anne of France', nameFr: 'Anne de France', birthDeath: '1498–1498', notes: 'Died at birth' }
        ]
      }
    ]
  },

  // 20. Louis XII (id: 215)
  {
    monarchId: 215,
    monarchName: 'Louis XII',
    house: 'Valois',
    parents: {
      father: { name: "Charles, Duke of Orléans", title: "Duke of Orléans, poet" },
      mother: { name: 'Marie of Cleves', title: 'Duchess of Orléans' }
    },
    unions: [
      {
        spouse: {
          name: 'Joan of France',
          nameFr: 'Jeanne de France',
          marriageYear: '1476 (annulled 1498)',
          origin: 'Daughter of King Louis XI',
          notes: 'Annulled on accession so he could marry Anne of Brittany; founder of the Annonciade Order, canonized Saint'
        },
        children: []
      },
      {
        spouse: {
          name: 'Anne of Brittany',
          nameFr: 'Anne de Bretagne',
          marriageYear: '1499 (died 1514)',
          origin: 'Duchess regnant of Brittany, widow of Charles VIII',
          notes: 'Queen of France twice'
        },
        children: [
          { name: 'Claude of France', nameFr: 'Claude de France', birthDeath: '1499–1524', title: 'Queen of France, Duchess of Brittany, wife of Francis I', notes: 'Mother of King Henry II' },
          { name: 'Renée of France', nameFr: 'Renée de France', birthDeath: '1510–1574', title: 'Duchess of Ferrara, prominent supporter of the Protestant Reformation' }
        ]
      },
      {
        spouse: {
          name: 'Mary Tudor of England',
          nameFr: "Marie d'Angleterre",
          marriageYear: '1514',
          origin: 'Daughter of Henry VII of England, sister of Henry VIII',
          notes: 'Married 3 months before Louis XII died'
        },
        children: []
      }
    ]
  },

  // 21. Francis I (id: 107)
  {
    monarchId: 107,
    monarchName: 'Francis I',
    house: 'Valois',
    parents: {
      father: { name: "Charles of Orléans, Count of Angoulême", title: "Count of Angoulême" },
      mother: { name: 'Louise of Savoy', title: 'Duchess of Auvergne, Regent of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Claude of France',
          nameFr: 'Claude de France',
          marriageYear: '1514 (died 1524)',
          origin: 'Daughter of King Louis XII and Anne of Brittany',
          notes: 'Reine Claude plum named in her honour'
        },
        children: [
          { name: 'Louise of France', nameFr: 'Louise de France', birthDeath: '1515–1518', notes: 'Died in childhood' },
          { name: 'Charlotte of France', nameFr: 'Charlotte de France', birthDeath: '1516–1524', notes: 'Died in childhood' },
          { name: 'Francis III of Brittany', nameFr: 'François III de Bretagne', birthDeath: '1518–1536', title: 'Dauphin of France, Duke of Brittany, died aged 18' },
          { name: 'Henry II', nameFr: 'Henri II', birthDeath: '1519–1559', title: 'King of France', becameMonarch: true, monarchId: 216 },
          { name: 'Madeleine of Valois', nameFr: 'Madeleine de France', birthDeath: '1520–1537', title: 'Queen of Scotland (first wife of King James V)' },
          { name: 'Charles, Duke of Orléans', nameFr: "Charles d'Orléans", birthDeath: '1522–1545', title: 'Duke of Orléans, died of the plague aged 23' },
          { name: 'Margaret of France', nameFr: 'Marguerite de France', birthDeath: '1523–1574', title: 'Duchess of Berry and Savoy (wife of Emmanuel Philibert)' }
        ]
      },
      {
        spouse: {
          name: 'Eleanor of Austria',
          nameFr: "Éléonore d'Autriche",
          marriageYear: '1530',
          origin: 'Sister of Emperor Charles V, Queen dowager of Portugal',
          notes: 'Dynastic marriage sealed by Treaty of Cambrai'
        },
        children: []
      }
    ]
  },

  // 22. Henry II (id: 216)
  {
    monarchId: 216,
    monarchName: 'Henry II',
    house: 'Valois',
    parents: {
      father: { name: 'Francis I', monarchId: 107, title: 'King of France' },
      mother: { name: 'Claude of France', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: "Catherine de' Medici",
          nameFr: 'Catherine de Médicis',
          marriageYear: '1533',
          origin: 'Noble Florentine family, niece of Pope Clement VII',
          notes: 'Queen Mother of three French kings (Francis II, Charles IX, Henry III)'
        },
        children: [
          { name: 'Francis II', nameFr: 'François II', birthDeath: '1544–1560', title: 'King of France', becameMonarch: true, monarchId: 217 },
          { name: 'Elisabeth of Valois', nameFr: 'Élisabeth de Valois', birthDeath: '1545–1568', title: 'Queen of Spain (third wife of Philip II of Spain)' },
          { name: 'Claude of Valois', nameFr: 'Claude de Valois', birthDeath: '1547–1575', title: 'Duchess of Lorraine (wife of Charles III)' },
          { name: 'Louis, Duke of Orléans', nameFr: "Louis d'Orléans", birthDeath: '1549–1550', notes: 'Died in infancy' },
          { name: 'Charles IX', nameFr: 'Charles IX', birthDeath: '1550–1574', title: 'King of France', becameMonarch: true, monarchId: 218 },
          { name: 'Henry III', nameFr: 'Henri III', birthDeath: '1551–1589', title: 'King of France and Poland', becameMonarch: true, monarchId: 219 },
          { name: 'Margaret of Valois (Queen Margot)', nameFr: 'Marguerite de Valois (Reine Margot)', birthDeath: '1553–1615', title: 'Queen of France and Navarre (wife of Henry IV)' },
          { name: 'Hercule François, Duke of Anjou', nameFr: "François d'Anjou", birthDeath: '1555–1584', title: 'Duke of Anjou and Alençon, suitor of Elizabeth I' },
          { name: 'Victoria & Joan', nameFr: 'Victoire et Jeanne', birthDeath: '1556–1556', notes: 'Twins, died in infancy' }
        ]
      }
    ]
  },

  // 23. Francis II (id: 217)
  {
    monarchId: 217,
    monarchName: 'Francis II',
    house: 'Valois',
    parents: {
      father: { name: 'Henry II', monarchId: 216, title: 'King of France' },
      mother: { name: "Catherine de' Medici", title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Mary, Queen of Scots (Mary Stuart)',
          nameFr: "Marie Stuart, reine d'Écosse",
          marriageYear: '1558',
          origin: 'Queen regnant of Scotland, daughter of James V of Scotland',
          notes: 'Queen consort of France until Francis II premature death at age 16'
        },
        children: []
      }
    ],
    bioSummary: 'Reigned for just 17 months before dying of an ear infection at age 16 without issue. His crown passed to his younger brother Charles IX.'
  },

  // 24. Charles IX (id: 218)
  {
    monarchId: 218,
    monarchName: 'Charles IX',
    house: 'Valois',
    parents: {
      father: { name: 'Henry II', monarchId: 216, title: 'King of France' },
      mother: { name: "Catherine de' Medici", title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Elisabeth of Austria',
          nameFr: "Élisabeth d'Autriche",
          marriageYear: '1570',
          origin: 'Daughter of Holy Roman Emperor Maximilian II',
          notes: 'Renowned for piety and virtue'
        },
        children: [
          { name: 'Marie-Élisabeth of France', nameFr: 'Marie-Élisabeth de France', birthDeath: '1572–1578', notes: 'Died aged 5' }
        ]
      }
    ],
    otherChildren: [
      { name: 'Charles de Valois', nameFr: 'Charles de Valois', birthDeath: '1573–1650', title: "Duke of Angoulême (son with Marie Touchet)" }
    ]
  },

  // 25. Henry III (id: 219)
  {
    monarchId: 219,
    monarchName: 'Henry III',
    house: 'Valois',
    parents: {
      father: { name: 'Henry II', monarchId: 216, title: 'King of France' },
      mother: { name: "Catherine de' Medici", title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Louise of Lorraine',
          nameFr: 'Louise de Lorraine-Vaudémont',
          marriageYear: '1575',
          origin: 'Daughter of Nicholas, Duke of Mercœur',
          notes: 'Devoted marriage; known as the White Queen during her long mourning after Henry III assassination'
        },
        children: []
      }
    ],
    bioSummary: 'Last French king of the House of Valois. Assassinated by a fanatical friar in 1589. Having no children, he recognized Henry of Navarre as his legitimate heir, founding the Bourbon dynasty.'
  },

  // 26. Henry IV (id: 108)
  {
    monarchId: 108,
    monarchName: 'Henry IV',
    house: 'Bourbon',
    parents: {
      father: { name: 'Antoine de Bourbon', title: 'King of Navarre, Duke of Vendôme' },
      mother: { name: "Jeanne d'Albret", title: 'Queen regnant of Navarre' }
    },
    unions: [
      {
        spouse: {
          name: 'Margaret of Valois (Queen Margot)',
          nameFr: 'Marguerite de Valois (Reine Margot)',
          marriageYear: '1572 (annulled 1599)',
          origin: 'Daughter of King Henry II and Catherine de Medici',
          notes: 'Wedding took place just days before the St. Bartholomew Day Massacre; annulled amicably'
        },
        children: []
      },
      {
        spouse: {
          name: "Marie de' Medici",
          nameFr: 'Marie de Médicis',
          marriageYear: '1600',
          origin: 'Daughter of Francesco I de Medici, Grand Duke of Tuscany',
          notes: 'Regent of France for Louis XIII; built the Luxembourg Palace'
        },
        children: [
          { name: 'Louis XIII the Just', nameFr: 'Louis XIII le Juste', birthDeath: '1601–1643', title: 'King of France', becameMonarch: true, monarchId: 109 },
          { name: 'Elisabeth of France', nameFr: 'Élisabeth de France', birthDeath: '1602–1644', title: 'Queen of Spain (first wife of Philip IV of Spain)' },
          { name: 'Christine Marie of France', nameFr: 'Christine de France', birthDeath: '1606–1663', title: 'Duchess and Regent of Savoy' },
          { name: 'Nicolas Henri, Duke of Orléans', nameFr: "Nicolas Henri d'Orléans", birthDeath: '1607–1611', notes: 'Died in early childhood' },
          { name: 'Gaston, Duke of Orléans', nameFr: "Gaston d'Orléans", birthDeath: '1608–1660', title: 'Duke of Orléans, frequent conspirator' },
          { name: 'Henrietta Maria of France', nameFr: 'Henriette Marie de France', birthDeath: '1609–1669', title: 'Queen of England (wife of Charles I, mother of Charles II & James II)' }
        ]
      }
    ],
    otherChildren: [
      { name: 'César de Bourbon', nameFr: 'César de Vendôme', birthDeath: '1594–1665', title: 'Duke of Vendôme (son with Gabrielle d\'Estrées)' },
      { name: 'Catherine Henriette', nameFr: 'Catherine Henriette de Bourbon', birthDeath: '1596–1663', title: 'Duchess of Elbeuf (daughter with Gabrielle d\'Estrées)' },
      { name: 'Alexandre de Vendôme', nameFr: 'Alexandre de Vendôme', birthDeath: '1598–1629', title: 'Grand Prior of France (son with Gabrielle d\'Estrées)' }
    ]
  },

  // 27. Louis XIII (id: 109)
  {
    monarchId: 109,
    monarchName: 'Louis XIII',
    house: 'Bourbon',
    parents: {
      father: { name: 'Henry IV', monarchId: 108, title: 'King of France' },
      mother: { name: "Marie de' Medici", title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Anne of Austria',
          nameFr: "Anne d'Autriche",
          marriageYear: '1615',
          origin: 'Infanta of Spain, daughter of Philip III of Spain',
          notes: 'Regent of France during Louis XIV minority alongside Cardinal Mazarin'
        },
        children: [
          { name: 'Louis XIV the Sun King', nameFr: 'Louis XIV le Roi-Soleil', birthDeath: '1638–1715', title: 'King of France', becameMonarch: true, monarchId: 110 },
          { name: 'Philippe I, Duke of Orléans', nameFr: "Philippe Ier d'Orléans ('Monsieur')", birthDeath: '1640–1701', title: 'Duke of Orléans (Founder of the modern House of Orléans)' }
        ]
      }
    ]
  },

  // 28. Louis XIV (id: 110)
  {
    monarchId: 110,
    monarchName: 'Louis XIV',
    house: 'Bourbon',
    parents: {
      father: { name: 'Louis XIII', monarchId: 109, title: 'King of France' },
      mother: { name: 'Anne of Austria', title: 'Queen of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Maria Theresa of Spain',
          nameFr: "Marie-Thérèse d'Autriche (Espagne)",
          marriageYear: '1660 (died 1683)',
          origin: 'Infanta of Spain, daughter of Philip IV of Spain',
          notes: 'Queen consort during the golden age of Versailles'
        },
        children: [
          { name: 'Louis, Le Grand Dauphin', nameFr: 'Louis de France (le Grand Dauphin)', birthDeath: '1661–1711', title: 'Dauphin of France, father of Philip V of Spain and grandfather of Louis XV' },
          { name: 'Anne-Élisabeth of France', nameFr: 'Anne-Élisabeth de France', birthDeath: '1662–1662', notes: 'Died in infancy' },
          { name: 'Marie-Anne of France', nameFr: 'Marie-Anne de France', birthDeath: '1664–1664', notes: 'Died in infancy' },
          { name: 'Marie-Thérèse (Madame Royale)', nameFr: 'Marie-Thérèse de France', birthDeath: '1667–1672', notes: 'Died aged 5' },
          { name: 'Philippe Charles of France', nameFr: 'Philippe Charles de France', birthDeath: '1668–1671', title: 'Duke of Anjou, died aged 2' },
          { name: 'Louis François of France', nameFr: 'Louis François de France', birthDeath: '1672–1672', title: 'Duke of Anjou, died in infancy' }
        ]
      },
      {
        spouse: {
          name: "Françoise d'Aubigné, Madame de Maintenon",
          nameFr: "Françoise d'Aubigné, Madame de Maintenon",
          marriageYear: 'c. 1683 (secret morganatic marriage)',
          origin: 'Governess to the royal children, created Marquise de Maintenon',
          notes: 'Founded the famous school for girls at Saint-Cyr'
        },
        children: []
      }
    ],
    otherChildren: [
      { name: 'Louis-Auguste, Duke of Maine', nameFr: 'Louis-Auguste de Bourbon, duc du Maine', birthDeath: '1670–1736', title: 'Duke of Maine (legitimized son with Madame de Montespan)' },
      { name: 'Louis-Alexandre, Count of Toulouse', nameFr: 'Louis-Alexandre de Bourbon, comte de Toulouse', birthDeath: '1678–1737', title: 'Count of Toulouse, Grand Admiral (son with Madame de Montespan)' },
      { name: 'Françoise-Marie de Bourbon', nameFr: 'Françoise-Marie de Bourbon', birthDeath: '1677–1749', title: 'Duchess of Orléans (wife of Philippe II of Orléans)' }
    ]
  },

  // 29. Louis XV (id: 111)
  {
    monarchId: 111,
    monarchName: 'Louis XV',
    house: 'Bourbon',
    parents: {
      father: { name: 'Louis, Duke of Burgundy (Petit Dauphin)', title: 'Dauphin of France, grandson of Louis XIV' },
      mother: { name: 'Marie Adélaïde of Savoy', title: 'Dauphine of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Marie Leszczyńska',
          nameFr: 'Marie Leszczyńska',
          marriageYear: '1725',
          origin: 'Princess of Poland, daughter of King Stanislaus I Leszczyński',
          notes: 'Revered for charity and piety; longest-serving queen consort of France'
        },
        children: [
          { name: 'Marie Louise Élisabeth', nameFr: 'Louise-Élisabeth de France (Madame Première)', birthDeath: '1727–1759', title: 'Duchess of Parma (wife of Philip of Spain)' },
          { name: 'Anne Henriette', nameFr: 'Henriette de France (Madame Seconde)', birthDeath: '1727–1752', title: 'Twin of Louise-Élisabeth, skilled musician' },
          { name: 'Marie Louise', nameFr: 'Marie-Louise de France', birthDeath: '1728–1733', notes: 'Died in childhood' },
          { name: 'Louis, Dauphin of France', nameFr: 'Louis de France (le Dauphin)', birthDeath: '1729–1765', title: 'Dauphin of France (Father of Louis XVI, Louis XVIII, and Charles X)' },
          { name: 'Philippe, Duke of Anjou', nameFr: "Philippe de France, duc d'Anjou", birthDeath: '1730–1733', notes: 'Died in childhood' },
          { name: 'Marie Adélaïde', nameFr: 'Adélaïde de France (Madame Adélaïde)', birthDeath: '1732–1800', title: 'Prominent royal princess, survived into exile during the Revolution' },
          { name: 'Marie Louise Thérèse Victoire', nameFr: 'Victoire de France (Madame Victoire)', birthDeath: '1733–1799', title: 'Princess of France' },
          { name: 'Sophie Philippine', nameFr: 'Sophie de France (Madame Sophie)', birthDeath: '1734–1782', title: 'Duchess of Louvois' },
          { name: 'Thérèse Félicité', nameFr: 'Thérèse de France', birthDeath: '1736–1744', notes: 'Died aged 8 at Fontevraud Abbey' },
          { name: 'Louise Marie', nameFr: 'Louise de France (Madame Louise)', birthDeath: '1737–1787', title: 'Carmelite nun (Mother Thérèse of Saint Augustine), Venerable in Catholic Church' }
        ]
      }
    ]
  },

  // 30. Louis XVI (id: 112)
  {
    monarchId: 112,
    monarchName: 'Louis XVI',
    house: 'Bourbon',
    parents: {
      father: { name: 'Louis, Dauphin of France', title: 'Dauphin of France (son of Louis XV)' },
      mother: { name: 'Maria Josepha of Saxony', title: 'Dauphine of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Marie Antoinette of Austria',
          nameFr: "Marie-Antoinette d'Autriche",
          marriageYear: '1770',
          origin: 'Archduchess of Austria, daughter of Empress Maria Theresa',
          notes: 'Executed by guillotine on 16 October 1793 during the French Revolution'
        },
        children: [
          { name: 'Marie-Thérèse Charlotte (Madame Royale)', nameFr: 'Marie-Thérèse de France (Madame Royale)', birthDeath: '1778–1851', title: 'Duchess of Angoulême, sole surviving royal child of Louis XVI' },
          { name: 'Louis-Joseph, Dauphin of France', nameFr: 'Louis-Joseph de France', birthDeath: '1781–1789', title: 'Dauphin of France, died of tuberculosis aged 7' },
          { name: 'Louis-Charles (Louis XVII)', nameFr: 'Louis-Charles de France (Louis XVII)', birthDeath: '1785–1795', title: 'Titular King of France, died in Temple Prison aged 10' },
          { name: 'Sophie-Hélène-Béatrice', nameFr: 'Sophie de France', birthDeath: '1786–1787', notes: 'Died in infancy' }
        ]
      }
    ]
  },

  // 31. Napoleon I (id: 113)
  {
    monarchId: 113,
    monarchName: 'Napoleon I',
    house: 'Bonaparte',
    parents: {
      father: { name: 'Carlo Buonaparte', title: 'Corsican diplomat and lawyer' },
      mother: { name: 'Letizia Ramolino', title: "Madame Mère de l'Empereur" }
    },
    unions: [
      {
        spouse: {
          name: 'Joséphine de Beauharnais',
          nameFr: 'Joséphine de Beauharnais',
          marriageYear: '1796 (divorced 1810)',
          origin: 'Born in Martinique, widow of Alexandre de Beauharnais',
          notes: 'Crowned Empress in Notre-Dame in 1804; no biological children with Napoleon'
        },
        children: []
      },
      {
        spouse: {
          name: 'Marie Louise of Austria',
          nameFr: "Marie-Louise d'Autriche",
          marriageYear: '1810',
          origin: 'Archduchess of Austria, daughter of Emperor Francis I of Austria',
          notes: 'Empress of the French, later Duchess of Parma'
        },
        children: [
          { name: 'Napoleon II (The King of Rome)', nameFr: 'Napoléon II (Roi de Rome, l\'Aiglon)', birthDeath: '1811–1832', title: 'King of Rome, titular Emperor of the French, Duke of Reichstadt' }
        ]
      }
    ],
    otherChildren: [
      { name: 'Count Charles Léon', nameFr: 'Comte Charles Léon', birthDeath: '1806–1881', title: 'Son with Catherine Éléonore Denuelle' },
      { name: 'Alexandre, Count Colonna-Walewski', nameFr: 'Alexandre Colonna Walewski', birthDeath: '1810–1868', title: 'French Foreign Minister (son with Countess Marie Walewska)' }
    ]
  },

  // 32. Louis XVIII (id: 225)
  {
    monarchId: 225,
    monarchName: 'Louis XVIII',
    house: 'Bourbon',
    parents: {
      father: { name: 'Louis, Dauphin of France', title: 'Dauphin of France' },
      mother: { name: 'Maria Josepha of Saxony', title: 'Dauphine of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Marie Joséphine of Savoy',
          nameFr: 'Marie-Joséphine de Savoie',
          marriageYear: '1771 (died in exile 1810)',
          origin: 'Princess of Savoy, daughter of Victor Amadeus III of Sardinia',
          notes: 'Died in exile in England before the Bourbon Restoration'
        },
        children: []
      }
    ],
    bioSummary: 'Brother of Louis XVI. Restored to the throne in 1814 and again in 1815 after Waterloo. He died without surviving children in 1824, passing the crown to his younger brother Charles X.'
  },

  // 33. Charles X (id: 226)
  {
    monarchId: 226,
    monarchName: 'Charles X',
    house: 'Bourbon',
    parents: {
      father: { name: 'Louis, Dauphin of France', title: 'Dauphin of France' },
      mother: { name: 'Maria Josepha of Saxony', title: 'Dauphine of France' }
    },
    unions: [
      {
        spouse: {
          name: 'Marie Thérèse of Savoy',
          nameFr: 'Marie-Thérèse de Savoie',
          marriageYear: '1773 (died in exile 1805)',
          origin: 'Princess of Savoy, sister of Queen Marie Joséphine',
          notes: 'Countess of Artois, died before Charles X became king'
        },
        children: [
          { name: 'Louis Antoine, Duke of Angoulême', nameFr: "Louis-Antoine d'Artois, duc d'Angoulême", birthDeath: '1775–1844', title: 'Titular King Louis XIX (for 20 minutes in 1830), husband of Madame Royale' },
          { name: 'Sophie d’Artois', nameFr: "Sophie d'Artois", birthDeath: '1776–1783', notes: 'Died in childhood' },
          { name: 'Charles Ferdinand, Duke of Berry', nameFr: "Charles-Ferdinand d'Artois, duc de Berry", birthDeath: '1778–1820', title: 'Duke of Berry (father of Henri, Count of Chambord, the legitimist pretender)' },
          { name: 'Marie Thérèse d’Artois', nameFr: "Marie-Thérèse d'Artois", birthDeath: '1783–1783', notes: 'Died in infancy' }
        ]
      }
    ]
  },

  // 34. Louis-Philippe I (id: 227)
  {
    monarchId: 227,
    monarchName: 'Louis-Philippe I',
    house: 'Orléans',
    parents: {
      father: { name: 'Louis Philippe II, Duke of Orléans', title: "Philippe Égalité" },
      mother: { name: 'Louise Marie Adélaïde de Bourbon', title: 'Duchess of Orléans' }
    },
    unions: [
      {
        spouse: {
          name: 'Maria Amalia of Naples and Sicily',
          nameFr: 'Marie-Amélie de Bourbon-Siciles',
          marriageYear: '1809',
          origin: 'Princess of the Two Sicilies, daughter of King Ferdinand I',
          notes: 'Queen of the French; known for family values and philanthropic devotion'
        },
        children: [
          { name: 'Ferdinand Philippe, Duke of Orléans', nameFr: "Ferdinand-Philippe d'Orléans", birthDeath: '1810–1842', title: 'Prince Royal, Duke of Orléans, tragic death in carriage accident' },
          { name: 'Louise of Orléans', nameFr: "Louise d'Orléans", birthDeath: '1812–1850', title: 'Queen of the Belgians (first queen consort of Leopold I)' },
          { name: 'Marie of Orléans', nameFr: "Marie d'Orléans", birthDeath: '1813–1839', title: 'Duchess of Württemberg, celebrated Romantic sculptor' },
          { name: 'Louis, Duke of Nemours', nameFr: "Louis d'Orléans, duc de Nemours", birthDeath: '1814–1896', title: 'Duke of Nemours, French military officer' },
          { name: 'Clémentine of Orléans', nameFr: "Clémentine d'Orléans", birthDeath: '1817–1907', title: 'Princess of Saxe-Coburg and Gotha (mother of Tsar Ferdinand I of Bulgaria)' },
          { name: 'François, Prince of Joinville', nameFr: 'François d\'Orléans, prince de Joinville', birthDeath: '1818–1900', title: 'French Admiral, brought Napoleon ashes back to France in 1840' },
          { name: 'Henri, Duke of Aumale', nameFr: "Henri d'Orléans, duc d'Aumale", birthDeath: '1822–1897', title: 'Military general, historian, gifted Château de Chantilly to the nation' },
          { name: 'Antoine, Duke of Montpensier', nameFr: "Antoine d'Orléans, duc de Montpensier", birthDeath: '1824–1890', title: 'Duke of Montpensier, Spanish Infante' }
        ]
      }
    ]
  },

  // 35 & 36. Louis-Napoléon Bonaparte / Napoleon III (ids: 220 & 221)
  {
    monarchId: 220,
    monarchName: 'Louis-Napoléon Bonaparte',
    house: 'Bonaparte',
    parents: {
      father: { name: 'Louis Bonaparte', title: 'King of Holland (brother of Napoleon I)' },
      mother: { name: 'Hortense de Beauharnais', title: 'Queen of Holland (daughter of Empress Joséphine)' }
    },
    unions: [
      {
        spouse: {
          name: 'Eugénie de Montijo',
          nameFr: 'Eugénie de Montijo',
          marriageYear: '1853',
          origin: 'Spanish noblewoman, Countess of Teba and Marquise of Ardales',
          notes: 'Empress of the French, fashion icon and political regent during Napoleon III absences'
        },
        children: [
          { name: 'Louis-Napoléon, Prince Imperial', nameFr: 'Louis-Napoléon Bonaparte (Prince Impérial)', birthDeath: '1856–1879', title: 'Prince Imperial, only child; killed fighting in British uniform during the Anglo-Zulu War' }
        ]
      }
    ],
    otherChildren: [
      { name: 'Eugène Bure', nameFr: 'Eugène Bure', birthDeath: '1843–1910', title: 'Count of Orx (diplomat)' },
      { name: 'Alexandre Bure', nameFr: 'Alexandre Bure', birthDeath: '1845–1882', title: 'Count of Labenne' }
    ]
  },
  {
    monarchId: 221,
    monarchName: 'Napoleon III',
    house: 'Bonaparte',
    parents: {
      father: { name: 'Louis Bonaparte', title: 'King of Holland (brother of Napoleon I)' },
      mother: { name: 'Hortense de Beauharnais', title: 'Queen of Holland (daughter of Empress Joséphine)' }
    },
    unions: [
      {
        spouse: {
          name: 'Eugénie de Montijo',
          nameFr: 'Eugénie de Montijo',
          marriageYear: '1853',
          origin: 'Spanish noblewoman, Countess of Teba and Marquise of Ardales',
          notes: 'Empress of the French, fashion icon and political regent during Napoleon III absences'
        },
        children: [
          { name: 'Louis-Napoléon, Prince Imperial', nameFr: 'Louis-Napoléon Bonaparte (Prince Impérial)', birthDeath: '1856–1879', title: 'Prince Imperial, only child; killed fighting in British uniform during the Anglo-Zulu War' }
        ]
      }
    ],
    otherChildren: [
      { name: 'Eugène Bure', nameFr: 'Eugène Bure', birthDeath: '1843–1910', title: 'Count of Orx (diplomat)' },
      { name: 'Alexandre Bure', nameFr: 'Alexandre Bure', birthDeath: '1845–1882', title: 'Count of Labenne' }
    ]
  }
];

export const getMonarchGenealogy = (monarchId: number): MonarchGenealogy | undefined => {
  return monarchGenealogyList.find(g => g.monarchId === monarchId);
};
