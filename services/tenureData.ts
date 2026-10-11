import { Monarch, TenureHighlightsData, TenureLeader } from '../types';

interface HistoricalRulerEntry {
  name: string;
  nameFr?: string;
  start: number;
  end: number;
}

// 1. UK Monarchs (1060 to Present)
export const UK_MONARCHS: HistoricalRulerEntry[] = [
  { name: 'Edward the Confessor', nameFr: 'Édouard le Confesseur', start: 1042, end: 1066 },
  { name: 'Harold Godwinson', nameFr: 'Harold II Godwinson', start: 1066, end: 1066 },
  { name: 'William I (the Conqueror)', nameFr: 'Guillaume Ier le Conquérant', start: 1066, end: 1087 },
  { name: 'William II Rufus', nameFr: 'Guillaume II le Roux', start: 1087, end: 1100 },
  { name: 'Henry I', nameFr: 'Henri Ier Beauclerc', start: 1100, end: 1135 },
  { name: 'Stephen', nameFr: 'Étienne de Blois', start: 1135, end: 1154 },
  { name: 'Empress Matilda', nameFr: 'Mathilde l\'Emperesse', start: 1141, end: 1141 },
  { name: 'Henry II', nameFr: 'Henri II Plantagenêt', start: 1154, end: 1189 },
  { name: 'Richard I (the Lionheart)', nameFr: 'Richard Ier Cœur de Lion', start: 1189, end: 1199 },
  { name: 'John (Lackland)', nameFr: 'Jean sans Terre', start: 1199, end: 1216 },
  { name: 'Henry III', nameFr: 'Henri III', start: 1216, end: 1272 },
  { name: 'Edward I Longshanks', nameFr: 'Édouard Ier', start: 1272, end: 1307 },
  { name: 'Edward II', nameFr: 'Édouard II', start: 1307, end: 1327 },
  { name: 'Edward III', nameFr: 'Édouard III', start: 1327, end: 1377 },
  { name: 'Richard II', nameFr: 'Richard II', start: 1377, end: 1399 },
  { name: 'Henry IV', nameFr: 'Henri IV', start: 1399, end: 1413 },
  { name: 'Henry V', nameFr: 'Henri V', start: 1413, end: 1422 },
  { name: 'Henry VI', nameFr: 'Henri VI', start: 1422, end: 1461 },
  { name: 'Edward IV', nameFr: 'Édouard IV', start: 1461, end: 1470 },
  { name: 'Henry VI (restored)', nameFr: 'Henri VI (restauré)', start: 1470, end: 1471 },
  { name: 'Edward IV (restored)', nameFr: 'Édouard IV (restauré)', start: 1471, end: 1483 },
  { name: 'Edward V', nameFr: 'Édouard V', start: 1483, end: 1483 },
  { name: 'Richard III', nameFr: 'Richard III', start: 1483, end: 1485 },
  { name: 'Henry VII', nameFr: 'Henri VII', start: 1485, end: 1509 },
  { name: 'Henry VIII', nameFr: 'Henri VIII', start: 1509, end: 1547 },
  { name: 'Edward VI', nameFr: 'Édouard VI', start: 1547, end: 1553 },
  { name: 'Lady Jane Grey', nameFr: 'Jeanne Grey', start: 1553, end: 1553 },
  { name: 'Mary I (Tudor)', nameFr: 'Marie Ire Tudor', start: 1553, end: 1558 },
  { name: 'Elizabeth I', nameFr: 'Élisabeth Ire', start: 1558, end: 1603 },
  { name: 'James I', nameFr: 'Jacques Ier', start: 1603, end: 1625 },
  { name: 'Charles I', nameFr: 'Charles Ier', start: 1625, end: 1649 },
  { name: 'Oliver Cromwell (Commonwealth)', nameFr: 'Oliver Cromwell (Commonwealth)', start: 1649, end: 1658 },
  { name: 'Richard Cromwell (Commonwealth)', nameFr: 'Richard Cromwell (Commonwealth)', start: 1658, end: 1659 },
  { name: 'Charles II', nameFr: 'Charles II', start: 1660, end: 1685 },
  { name: 'James II', nameFr: 'Jacques II', start: 1685, end: 1688 },
  { name: 'William III & Mary II', nameFr: 'Guillaume III & Marie II', start: 1689, end: 1702 },
  { name: 'Queen Anne', nameFr: 'Reine Anne', start: 1702, end: 1714 },
  { name: 'George I', nameFr: 'George Ier', start: 1714, end: 1727 },
  { name: 'George II', nameFr: 'George II', start: 1727, end: 1760 },
  { name: 'George III', nameFr: 'George III', start: 1760, end: 1820 },
  { name: 'George IV', nameFr: 'George IV', start: 1820, end: 1830 },
  { name: 'William IV', nameFr: 'Guillaume IV', start: 1830, end: 1837 },
  { name: 'Queen Victoria', nameFr: 'Reine Victoria', start: 1837, end: 1901 },
  { name: 'Edward VII', nameFr: 'Édouard VII', start: 1901, end: 1910 },
  { name: 'George V', nameFr: 'George V', start: 1910, end: 1936 },
  { name: 'Edward VIII', nameFr: 'Édouard VIII', start: 1936, end: 1936 },
  { name: 'George VI', nameFr: 'George VI', start: 1936, end: 1952 },
  { name: 'Queen Elizabeth II', nameFr: 'Reine Élisabeth II', start: 1952, end: 2022 },
  { name: 'King Charles III', nameFr: 'Roi Charles III', start: 2022, end: 2026 }
];

// 2. UK Prime Ministers (1721 to Present)
export const UK_PRIME_MINISTERS: HistoricalRulerEntry[] = [
  { name: 'Sir Robert Walpole', nameFr: 'Sir Robert Walpole', start: 1721, end: 1742 },
  { name: 'Spencer Compton, Earl of Wilmington', nameFr: 'Spencer Compton', start: 1742, end: 1743 },
  { name: 'Henry Pelham', nameFr: 'Henry Pelham', start: 1743, end: 1754 },
  { name: 'Thomas Pelham-Holles, Duke of Newcastle', nameFr: 'Duc de Newcastle', start: 1754, end: 1756 },
  { name: 'William Cavendish, Duke of Devonshire', nameFr: 'Duc de Devonshire', start: 1756, end: 1757 },
  { name: 'Duke of Newcastle (2nd term)', nameFr: 'Duc de Newcastle (2e mandat)', start: 1757, end: 1762 },
  { name: 'John Stuart, Earl of Bute', nameFr: 'Lord Bute', start: 1762, end: 1763 },
  { name: 'George Grenville', nameFr: 'George Grenville', start: 1763, end: 1765 },
  { name: 'Charles Watson-Wentworth, Marquess of Rockingham', nameFr: 'Lord Rockingham', start: 1765, end: 1766 },
  { name: 'William Pitt the Elder (Earl of Chatham)', nameFr: 'William Pitt l\'Ancien', start: 1766, end: 1768 },
  { name: 'Augustus FitzRoy, Duke of Grafton', nameFr: 'Duc de Grafton', start: 1768, end: 1770 },
  { name: 'Frederick North, Lord North', nameFr: 'Lord North', start: 1770, end: 1782 },
  { name: 'Marquess of Rockingham (2nd term)', nameFr: 'Lord Rockingham (2e mandat)', start: 1782, end: 1782 },
  { name: 'William Petty, Earl of Shelburne', nameFr: 'Lord Shelburne', start: 1782, end: 1783 },
  { name: 'William Cavendish-Bentinck, Duke of Portland', nameFr: 'Duc de Portland', start: 1783, end: 1783 },
  { name: 'William Pitt the Younger', nameFr: 'William Pitt le Jeune', start: 1783, end: 1801 },
  { name: 'Henry Addington', nameFr: 'Henry Addington', start: 1801, end: 1804 },
  { name: 'William Pitt the Younger (2nd term)', nameFr: 'William Pitt le Jeune (2e mandat)', start: 1804, end: 1806 },
  { name: 'William Grenville, Lord Grenville', nameFr: 'Lord Grenville', start: 1806, end: 1807 },
  { name: 'Duke of Portland (2nd term)', nameFr: 'Duc de Portland (2e mandat)', start: 1807, end: 1809 },
  { name: 'Spencer Perceval', nameFr: 'Spencer Perceval', start: 1809, end: 1812 },
  { name: 'Robert Jenkinson, Earl of Liverpool', nameFr: 'Lord Liverpool', start: 1812, end: 1827 },
  { name: 'George Canning', nameFr: 'George Canning', start: 1827, end: 1827 },
  { name: 'F. J. Robinson, Viscount Goderich', nameFr: 'Lord Goderich', start: 1827, end: 1828 },
  { name: 'Arthur Wellesley, Duke of Wellington', nameFr: 'Duc de Wellington', start: 1828, end: 1830 },
  { name: 'Charles Grey, Earl Grey', nameFr: 'Lord Grey', start: 1830, end: 1834 },
  { name: 'William Lamb, Viscount Melbourne', nameFr: 'Lord Melbourne', start: 1834, end: 1834 },
  { name: 'Duke of Wellington (caretaker)', nameFr: 'Duc de Wellington', start: 1834, end: 1834 },
  { name: 'Sir Robert Peel', nameFr: 'Sir Robert Peel', start: 1834, end: 1835 },
  { name: 'Viscount Melbourne (2nd term)', nameFr: 'Lord Melbourne (2e mandat)', start: 1835, end: 1841 },
  { name: 'Sir Robert Peel (2nd term)', nameFr: 'Sir Robert Peel (2e mandat)', start: 1841, end: 1846 },
  { name: 'Lord John Russell', nameFr: 'Lord John Russell', start: 1846, end: 1852 },
  { name: 'Edward Smith-Stanley, Earl of Derby', nameFr: 'Lord Derby', start: 1852, end: 1852 },
  { name: 'George Hamilton-Gordon, Earl of Aberdeen', nameFr: 'Lord Aberdeen', start: 1852, end: 1855 },
  { name: 'Henry John Temple, Viscount Palmerston', nameFr: 'Lord Palmerston', start: 1855, end: 1858 },
  { name: 'Earl of Derby (2nd term)', nameFr: 'Lord Derby (2e mandat)', start: 1858, end: 1859 },
  { name: 'Viscount Palmerston (2nd term)', nameFr: 'Lord Palmerston (2e mandat)', start: 1859, end: 1865 },
  { name: 'Lord John Russell (2nd term)', nameFr: 'Lord John Russell (2e mandat)', start: 1865, end: 1866 },
  { name: 'Earl of Derby (3rd term)', nameFr: 'Lord Derby (3e mandat)', start: 1866, end: 1868 },
  { name: 'Benjamin Disraeli', nameFr: 'Benjamin Disraeli', start: 1868, end: 1868 },
  { name: 'William Ewart Gladstone', nameFr: 'William Ewart Gladstone', start: 1868, end: 1874 },
  { name: 'Benjamin Disraeli (2nd term)', nameFr: 'Benjamin Disraeli (2e mandat)', start: 1874, end: 1880 },
  { name: 'William Ewart Gladstone (2nd term)', nameFr: 'William Ewart Gladstone (2e mandat)', start: 1880, end: 1885 },
  { name: 'Robert Gascoyne-Cecil, Marquess of Salisbury', nameFr: 'Lord Salisbury', start: 1885, end: 1886 },
  { name: 'William Ewart Gladstone (3rd term)', nameFr: 'William Ewart Gladstone (3e mandat)', start: 1886, end: 1886 },
  { name: 'Marquess of Salisbury (2nd term)', nameFr: 'Lord Salisbury (2e mandat)', start: 1886, end: 1892 },
  { name: 'William Ewart Gladstone (4th term)', nameFr: 'William Ewart Gladstone (4e mandat)', start: 1892, end: 1894 },
  { name: 'Archibald Primrose, Earl of Rosebery', nameFr: 'Lord Rosebery', start: 1894, end: 1895 },
  { name: 'Marquess of Salisbury (3rd term)', nameFr: 'Lord Salisbury (3e mandat)', start: 1895, end: 1902 },
  { name: 'Arthur Balfour', nameFr: 'Arthur Balfour', start: 1902, end: 1905 },
  { name: 'Sir Henry Campbell-Bannerman', nameFr: 'Sir Henry Campbell-Bannerman', start: 1905, end: 1908 },
  { name: 'H. H. Asquith', nameFr: 'H. H. Asquith', start: 1908, end: 1916 },
  { name: 'David Lloyd George', nameFr: 'David Lloyd George', start: 1916, end: 1922 },
  { name: 'Bonar Law', nameFr: 'Bonar Law', start: 1922, end: 1923 },
  { name: 'Stanley Baldwin', nameFr: 'Stanley Baldwin', start: 1923, end: 1924 },
  { name: 'Ramsay MacDonald', nameFr: 'Ramsay MacDonald', start: 1924, end: 1924 },
  { name: 'Stanley Baldwin (2nd term)', nameFr: 'Stanley Baldwin (2e mandat)', start: 1924, end: 1929 },
  { name: 'Ramsay MacDonald (2nd term)', nameFr: 'Ramsay MacDonald (2e mandat)', start: 1929, end: 1935 },
  { name: 'Stanley Baldwin (3rd term)', nameFr: 'Stanley Baldwin (3e mandat)', start: 1935, end: 1937 },
  { name: 'Neville Chamberlain', nameFr: 'Neville Chamberlain', start: 1937, end: 1940 },
  { name: 'Winston Churchill', nameFr: 'Winston Churchill', start: 1940, end: 1945 },
  { name: 'Clement Attlee', nameFr: 'Clement Attlee', start: 1945, end: 1951 },
  { name: 'Winston Churchill (2nd term)', nameFr: 'Winston Churchill (2e mandat)', start: 1951, end: 1955 },
  { name: 'Sir Anthony Eden', nameFr: 'Sir Anthony Eden', start: 1955, end: 1957 },
  { name: 'Harold Macmillan', nameFr: 'Harold Macmillan', start: 1957, end: 1963 },
  { name: 'Sir Alec Douglas-Home', nameFr: 'Sir Alec Douglas-Home', start: 1963, end: 1964 },
  { name: 'Harold Wilson', nameFr: 'Harold Wilson', start: 1964, end: 1970 },
  { name: 'Edward Heath', nameFr: 'Edward Heath', start: 1970, end: 1974 },
  { name: 'Harold Wilson (2nd term)', nameFr: 'Harold Wilson (2e mandat)', start: 1974, end: 1976 },
  { name: 'James Callaghan', nameFr: 'James Callaghan', start: 1976, end: 1979 },
  { name: 'Margaret Thatcher', nameFr: 'Margaret Thatcher', start: 1979, end: 1990 },
  { name: 'John Major', nameFr: 'John Major', start: 1990, end: 1997 },
  { name: 'Tony Blair', nameFr: 'Tony Blair', start: 1997, end: 2007 },
  { name: 'Gordon Brown', nameFr: 'Gordon Brown', start: 2007, end: 2010 },
  { name: 'David Cameron', nameFr: 'David Cameron', start: 2010, end: 2016 },
  { name: 'Theresa May', nameFr: 'Theresa May', start: 2016, end: 2019 },
  { name: 'Boris Johnson', nameFr: 'Boris Johnson', start: 2019, end: 2022 },
  { name: 'Liz Truss', nameFr: 'Liz Truss', start: 2022, end: 2022 },
  { name: 'Rishi Sunak', nameFr: 'Rishi Sunak', start: 2022, end: 2024 },
  { name: 'Keir Starmer', nameFr: 'Keir Starmer', start: 2024, end: 2026 }
];

// 3. US Presidents (1789 to Present)
export const US_PRESIDENTS: HistoricalRulerEntry[] = [
  { name: 'George Washington', nameFr: 'George Washington', start: 1789, end: 1797 },
  { name: 'John Adams', nameFr: 'John Adams', start: 1797, end: 1801 },
  { name: 'Thomas Jefferson', nameFr: 'Thomas Jefferson', start: 1801, end: 1809 },
  { name: 'James Madison', nameFr: 'James Madison', start: 1809, end: 1817 },
  { name: 'James Monroe', nameFr: 'James Monroe', start: 1817, end: 1825 },
  { name: 'John Quincy Adams', nameFr: 'John Quincy Adams', start: 1825, end: 1829 },
  { name: 'Andrew Jackson', nameFr: 'Andrew Jackson', start: 1829, end: 1837 },
  { name: 'Martin Van Buren', nameFr: 'Martin Van Buren', start: 1837, end: 1841 },
  { name: 'William Henry Harrison', nameFr: 'William Henry Harrison', start: 1841, end: 1841 },
  { name: 'John Tyler', nameFr: 'John Tyler', start: 1841, end: 1845 },
  { name: 'James K. Polk', nameFr: 'James K. Polk', start: 1845, end: 1849 },
  { name: 'Zachary Taylor', nameFr: 'Zachary Taylor', start: 1849, end: 1850 },
  { name: 'Millard Fillmore', nameFr: 'Millard Fillmore', start: 1850, end: 1853 },
  { name: 'Franklin Pierce', nameFr: 'Franklin Pierce', start: 1853, end: 1857 },
  { name: 'James Buchanan', nameFr: 'James Buchanan', start: 1857, end: 1861 },
  { name: 'Abraham Lincoln', nameFr: 'Abraham Lincoln', start: 1861, end: 1865 },
  { name: 'Andrew Johnson', nameFr: 'Andrew Johnson', start: 1865, end: 1869 },
  { name: 'Ulysses S. Grant', nameFr: 'Ulysses S. Grant', start: 1869, end: 1877 },
  { name: 'Rutherford B. Hayes', nameFr: 'Rutherford B. Hayes', start: 1877, end: 1881 },
  { name: 'James A. Garfield', nameFr: 'James A. Garfield', start: 1881, end: 1881 },
  { name: 'Chester A. Arthur', nameFr: 'Chester A. Arthur', start: 1881, end: 1885 },
  { name: 'Grover Cleveland', nameFr: 'Grover Cleveland', start: 1885, end: 1889 },
  { name: 'Benjamin Harrison', nameFr: 'Benjamin Harrison', start: 1889, end: 1893 },
  { name: 'Grover Cleveland (2nd term)', nameFr: 'Grover Cleveland (2e mandat)', start: 1893, end: 1897 },
  { name: 'William McKinley', nameFr: 'William McKinley', start: 1897, end: 1901 },
  { name: 'Theodore Roosevelt', nameFr: 'Theodore Roosevelt', start: 1901, end: 1909 },
  { name: 'William Howard Taft', nameFr: 'William Howard Taft', start: 1909, end: 1913 },
  { name: 'Woodrow Wilson', nameFr: 'Woodrow Wilson', start: 1913, end: 1921 },
  { name: 'Warren G. Harding', nameFr: 'Warren G. Harding', start: 1921, end: 1923 },
  { name: 'Calvin Coolidge', nameFr: 'Calvin Coolidge', start: 1923, end: 1929 },
  { name: 'Herbert Hoover', nameFr: 'Herbert Hoover', start: 1929, end: 1933 },
  { name: 'Franklin D. Roosevelt', nameFr: 'Franklin D. Roosevelt', start: 1933, end: 1945 },
  { name: 'Harry S. Truman', nameFr: 'Harry S. Truman', start: 1945, end: 1953 },
  { name: 'Dwight D. Eisenhower', nameFr: 'Dwight D. Eisenhower', start: 1953, end: 1961 },
  { name: 'John F. Kennedy', nameFr: 'John F. Kennedy', start: 1961, end: 1963 },
  { name: 'Lyndon B. Johnson', nameFr: 'Lyndon B. Johnson', start: 1963, end: 1969 },
  { name: 'Richard Nixon', nameFr: 'Richard Nixon', start: 1969, end: 1974 },
  { name: 'Gerald Ford', nameFr: 'Gerald Ford', start: 1974, end: 1977 },
  { name: 'Jimmy Carter', nameFr: 'Jimmy Carter', start: 1977, end: 1981 },
  { name: 'Ronald Reagan', nameFr: 'Ronald Reagan', start: 1981, end: 1989 },
  { name: 'George H. W. Bush', nameFr: 'George H. W. Bush', start: 1989, end: 1993 },
  { name: 'Bill Clinton', nameFr: 'Bill Clinton', start: 1993, end: 2001 },
  { name: 'George W. Bush', nameFr: 'George W. Bush', start: 2001, end: 2009 },
  { name: 'Barack Obama', nameFr: 'Barack Obama', start: 2009, end: 2017 },
  { name: 'Donald Trump', nameFr: 'Donald Trump', start: 2017, end: 2021 },
  { name: 'Joe Biden', nameFr: 'Joe Biden', start: 2021, end: 2025 },
  { name: 'Donald Trump (2nd term)', nameFr: 'Donald Trump (2e mandat)', start: 2025, end: 2026 }
];

// 4. Curated Historical Highlights for ALL 60 French Monarchs and Presidents
export const MONARCH_TENURE_HIGHLIGHTS: Record<number, { highlights: string[]; highlightsFr?: string[] }> = {
  // Capetian Dynasty
  201: {
    // Philip I (1060-1108)
    highlights: [
      "Norman Conquest of England (1066) by William the Conqueror occurred during his early minority reign.",
      "Launch of the First Crusade (1096–1099), leading to the capture of Jerusalem.",
      "Consolidated royal domain by incorporating the Vexin français, Bourges, and Dun-le-Roi."
    ],
    highlightsFr: [
      "Conquête normande de l'Angleterre (1066) par Guillaume le Conquérant sous sa minorité.",
      "Lancement de la Première Croisade (1096-1099) aboutissant à la prise de Jérusalem.",
      "Agrandissement du domaine royal avec le Vexin français, Bourges et Dun-le-Roi."
    ]
  },
  202: {
    // Louis VI (1108-1137)
    highlights: [
      "Pacified the Île-de-France by subduing predatory robber barons such as Thomas de Marle and Hugh of Le Puiset.",
      "Formed historic partnership with Abbot Suger of Saint-Denis to establish royal administrative authority.",
      "Granted extensive municipal charters to towns, creating a lasting alliance between the monarchy and urban bourgeois."
    ],
    highlightsFr: [
      "Pacification de l'Île-de-France en soumettant les seigneurs pillards (Thomas de Marle, Hugues du Puiset).",
      "Étroite collaboration avec l'abbé Suger de Saint-Denis pour asseoir l'autorité royale.",
      "Octroi de chartes de franchises aux communes urbaines, consolidant l'alliance avec la bourgeoisie."
    ]
  },
  203: {
    // Louis VII (1137-1180)
    highlights: [
      "Co-led the Second Crusade (1147–1149) with Holy Roman Emperor Conrad III.",
      "Began construction of Notre-Dame de Paris cathedral in 1163 under Bishop Maurice de Sully.",
      "Annulment of marriage to Eleanor of Aquitaine (1152), who subsequently married Henry II of England, sparking centuries of Anglo-French conflict."
    ],
    highlightsFr: [
      "Direction de la Deuxième Croisade (1147-1149) aux côtés de l'empereur Conrad III.",
      "Pose de la première pierre de Notre-Dame de Paris (1163) par l'évêque Maurice de Sully.",
      "Répudiation d'Aliénor d'Aquitaine (1152), qui épouse Henri II d'Angleterre, amorçant le conflit anglo-français."
    ]
  },
  204: {
    // Philip II Augustus (1180-1223)
    highlights: [
      "Won the legendary Battle of Bouvines (1214), crushing a grand Anglo-Flemish-German coalition.",
      "Reconquered Normandy, Anjou, Maine, and Touraine from King John of England.",
      "Paved the streets of Paris, built the original Louvre fortress, and fortified the capital with new stone walls."
    ],
    highlightsFr: [
      "Victoire fondatrice de Bouvines (1214) écrasant la coalition anglo-germano-flamande.",
      "Confiscation et reconquête de la Normandie, de l'Anjou, du Maine et de la Touraine sur Jean sans Terre.",
      "Pavage de Paris, construction de la forteresse du Louvre et édification de la première grande enceinte fortifiée."
    ]
  },
  205: {
    // Louis VIII (1223-1226)
    highlights: [
      "Captured Poitou, Saintonge, and La Rochelle from the Plantagenet crown in swift campaigns.",
      "Led royal expedition in the Albigensian Crusade, taking Avignon and establishing royal hegemony over Languedoc.",
      "Institutionalized the system of appanages in his testament to provide territorial fiefs for cadet royal sons."
    ],
    highlightsFr: [
      "Conquête fulgurante du Poitou, de la Saintonge et de La Rochelle sur les Plantagenêts.",
      "Croisade contre les Albigeois, siège victorieux d'Avignon et rattachement du Languedoc au domaine royal.",
      "Institution formelle des apanages dans son testament pour organiser l'apanage des fils puînés."
    ]
  },
  102: {
    // Louis IX / Saint Louis (1226-1270)
    highlights: [
      "Built the Gothic Sainte-Chapelle in Paris (1248) to house the Crown of Thorns relic.",
      "Concluded the Treaty of Paris (1259) with Henry III of England, establishing stable borders.",
      "Led the Seventh and Eighth Crusades and codified royal justice through inquest commissioners; canonized as Saint in 1297."
    ],
    highlightsFr: [
      "Construction du chef-d'œuvre gothique de la Sainte-Chapelle (1248) pour abriter la Sainte Couronne.",
      "Signature du traité de Paris (1259) avec Henri III d'Angleterre, instaurant une paix durable.",
      "Direction des 7e et 8e croisades, réformes judiciaires et administratives; canonisé saint en 1297."
    ]
  },
  206: {
    // Philip III the Bold (1270-1285)
    highlights: [
      "Inherited the vast County of Toulouse and Poitou following the deaths of Alphonse of Poitiers and Joan of Toulouse.",
      "Concluded diplomatic arbitration in Navarre and intervened in the War of the Sicilian Vespers.",
      "Launched the Aragonese Crusade (1285) in support of Pope Martin IV, during which he fell ill and died in Perpignan."
    ],
    highlightsFr: [
      "Rattachement définitif du puissant comté de Toulouse et du Poitou à la mort d'Alphonse de Poitiers.",
      "Intervention dans les affaires de Navarre et dans la crise des Vêpres siciliennes.",
      "Croisade d'Aragon (1285) menée pour soutenir la papauté contre Pierre III d'Aragon."
    ]
  },
  103: {
    // Philip IV the Fair (1285-1314)
    highlights: [
      "Dissolved and suppressed the Knights Templar, executing Grand Master Jacques de Molay (1314).",
      "Summoned the very first Estates-General of France in Notre-Dame de Paris in 1302.",
      "Clashed with Pope Boniface VIII (Outrage of Anagni) and orchestrated the transfer of the papal seat to Avignon."
    ],
    highlightsFr: [
      "Procès et suppression de l'Ordre du Temple, exécution sur le bûcher de Jacques de Molay (1314).",
      "Convocation des tout premiers États généraux du royaume à Notre-Dame de Paris en 1302.",
      "Affrontement avec le pape Boniface VIII (attentat d'Anagni) et installation de la papauté à Avignon."
    ]
  },
  207: {
    // Louis X (1314-1316)
    highlights: [
      "Promulgated the celebrated Edict of 3 July 1315 decreeing that 'France signifies freedom' and serfs on royal domain must be freed.",
      "Readmitted Jews to France under regulated economic charters following their earlier expulsion.",
      "His sudden death after a game of jeu de paume triggered France's first dynastic succession crisis."
    ],
    highlightsFr: [
      "Édit du 3 juillet 1315 proclamant que 'selon le droit de nature, chacun doit naître franc' et affranchissant les serfs royaux.",
      "Rappel des Juifs dans le royaume assorti de garanties économiques et de protection.",
      "Mort soudaine après une partie de jeu de paume ouvrant la crise de succession capétienne."
    ]
  },
  208: {
    // John I the Posthumous (1316)
    highlights: [
      "Born five months after the death of his father Louis X; only king of France to be born king.",
      "Reigned for his entire lifespan of five days (15–20 November 1316) under the regency of his uncle Philip.",
      "Buried with royal honors in the Basilica of Saint-Denis alongside his ancestors."
    ],
    highlightsFr: [
      "Né cinq mois après la mort de son père Louis X; unique roi de France à naître déjà roi.",
      "Règne le plus court de l'histoire (cinq jours, du 15 au 20 novembre 1316) sous régence de Philippe le Long.",
      "Inhumé en grande pompe dans la nécropole royale de la basilique Saint-Denis."
    ]
  },
  209: {
    // Philip V the Tall (1316-1322)
    highlights: [
      "Ratified Salic Law precedent excluding female claimants from succession to the French throne.",
      "Unified weights, measures, and coinage across royal bailiwicks and streamlined the Chamber of Accounts.",
      "Suppressed the radical Pastoureaux (Shepherds' Crusade) popular uprising."
    ],
    highlightsFr: [
      "Consolidation de la loi salique excluant les femmes et leurs descendants de la couronne de France.",
      "Tentative d'unification des poids, mesures et monnaies; organisation de la Chambre des comptes.",
      "Répression de la seconde croisade des Pastoureaux soulevant les campagnes du royaume."
    ]
  },
  210: {
    // Charles IV the Fair (1322-1328)
    highlights: [
      "Fought the War of Saint-Sardos (1324) against King Edward II of England, conquering the Duchy of Guyenne.",
      "Assisted his sister Queen Isabella of England in her invasion and overthrow of Edward II.",
      "Died without male issue, bringing the direct Capetian male line to an end after 341 years."
    ],
    highlightsFr: [
      "Guerre de Saint-Sardos (1324) contre Édouard II d'Angleterre et saisie militaire de la Guyenne.",
      "Soutien diplomatique et militaire à sa sœur Isabelle de France contre le roi d'Angleterre.",
      "Dernier Capétien direct; sa mort sans héritier mâle met fin à 341 ans de lignage ininterrompu."
    ]
  },

  // House of Valois
  104: {
    // Philip VI (1328-1350)
    highlights: [
      "Edward III of England laid claim to the French crown, igniting the Hundred Years' War in 1337.",
      "Disastrous French defeat at the Battle of Crécy (1346) and loss of Calais to the English.",
      "Acquired the Dauphiné (1349) and Montpellier; witnessed the arrival of the devastating Black Death (1348)."
    ],
    highlightsFr: [
      "Revendication de la couronne par Édouard III d'Angleterre déclenchant la guerre de Cent Ans (1337).",
      "Défaite catastrophique de Crécy (1346) et perte de la place forte de Calais.",
      "Achat du Dauphiné (1349) au profit de l'héritier du trône; ravages de la Peste noire (1348)."
    ]
  },
  211: {
    // John II the Good (1350-1364)
    highlights: [
      "Defeated and captured by Edward the Black Prince at the Battle of Poitiers (1356).",
      "Concluded Treaty of Brétigny (1360) ceding southwestern France for an immense ransom of 3 million crowns.",
      "Created the Franc currency (Franc à cheval) in 1360 to finance his ransom payment."
    ],
    highlightsFr: [
      "Bataille de Poitiers (1356) : capturé héroïquement sur le champ par le Prince Noir.",
      "Traité de Brétigny (1360) cédant un tiers du royaume contre une rançon de 3 millions d'écus.",
      "Création de la monnaie du Franc (franc à cheval) en 1360 pour garantir la rançon royale."
    ]
  },
  105: {
    // Charles V the Wise (1364-1380)
    highlights: [
      "Commissioned Constable Bertrand du Guesclin to wage Fabian warfare, recapturing nearly all English-held territories.",
      "Founded the Royal Library in the Louvre tower, the direct ancestor of the Bibliothèque nationale de France.",
      "Constructed the fortress of the Bastille and the Château de Vincennes to protect Paris."
    ],
    highlightsFr: [
      "Reconquête méthodique des provinces occupées avec le connétable Bertrand du Guesclin.",
      "Fondation de la première Librairie royale au Louvre, ancêtre de la Bibliothèque nationale de France.",
      "Construction de la forteresse de la Bastille et achèvement du donjon de Vincennes."
    ]
  },
  212: {
    // Charles VI the Mad (1380-1422)
    highlights: [
      "Suffered acute bouts of mental illness beginning in 1392, leading to civil war between Armagnacs and Burgundians.",
      "Crushing French defeat against Henry V of England at the Battle of Agincourt (1415).",
      "Signed the Treaty of Troyes (1420), disinheriting his own Dauphin in favor of King Henry V of England."
    ],
    highlightsFr: [
      "Crises de folie répétées à partir de 1392 ouvrant la guerre civile entre Armagnacs et Bourguignons.",
      "Désastre militaire d'Azincourt (1415) face aux archers d'Henri V d'Angleterre.",
      "Signature du funeste traité de Troyes (1420) déshéritant le Dauphin Charles au profit d'Henri V."
    ]
  },
  106: {
    // Charles VII (1422-1461)
    highlights: [
      "Joan of Arc lifted the Siege of Orléans (1429) and escorted Charles VII to his coronation in Reims.",
      "Concluded the Hundred Years' War with decisive victory at the Battle of Castillon (1453).",
      "Created France's first permanent professional standing army (Compagnies d'ordonnance) and the Pragmatic Sanction of Bourges."
    ],
    highlightsFr: [
      "Épopée de Jeanne d'Arc : délivrance d'Orléans (1429) et sacre triomphal à Reims.",
      "Fin victorieuse de la guerre de Cent Ans après la bataille décisive de Castillon (1453).",
      "Création de la première armée royale permanente professionnelle (compagnies d'ordonnance)."
    ]
  },
  213: {
    // Louis XI (1461-1483)
    highlights: [
      "Defeated Charles the Bold of Burgundy (1477), annexing the Duchy of Burgundy and Picardy to France.",
      "Inherited Provence, Maine, and Anjou following the extinction of the House of Valois-Anjou.",
      "Established the royal postal relay network across France and stimulated domestic silk and printing industries."
    ],
    highlightsFr: [
      "Élimination de Charles le Téméraire (1477) et rattachement de la Bourgogne et de la Picardie.",
      "Intégration pacifique de la Provence, de l'Anjou et du Maine au domaine royal.",
      "Création du service des relais de la poste royale et essor des manufactures de soie et d'imprimerie."
    ]
  },
  214: {
    // Charles VIII (1483-1498)
    highlights: [
      "Regency of his sister Anne de Beaujeu and victory over rebellious nobles in the Mad War (Guerre folle).",
      "Married Anne of Brittany (1491), beginning the permanent union between Brittany and France.",
      "Launched the Italian Wars in 1494, marching to Naples and introducing Italian Renaissance art to France."
    ],
    highlightsFr: [
      "Régence éclairée d'Anne de Beaujeu et victoire sur les princes révoltés (Guerre folle).",
      "Mariage avec Anne de Bretagne (1491), scellant le rattachement de la Bretagne à la France.",
      "Déclenchement des guerres d'Italie (1494), marche triomphale sur Naples et diffusion de la Renaissance."
    ]
  },
  215: {
    // Louis XII (1498-1515)
    highlights: [
      "Acclaimed as 'Father of the People' (Père du Peuple) by the Estates-General of Tours in 1506 for lowering taxes.",
      "Conquered Milan and fought prolonged Italian campaigns against Spain and the League of Cambrai.",
      "Married Anne of Brittany to preserve the Breton union; later married Mary Tudor of England."
    ],
    highlightsFr: [
      "Proclamé 'Père du Peuple' par les États généraux de Tours (1506) pour ses baisses d'impôts.",
      "Conquête du Milanais et campagnes d'Italie contre la Sainte Ligue et les armées espagnoles.",
      "Remariage avec Anne de Bretagne puis avec Marie d'Angleterre, sœur d'Henri VIII."
    ]
  },
  107: {
    // Francis I (1515-1547)
    highlights: [
      "Glorious triumph at the Battle of Marignano (1515), knighted on the battlefield by Chevalier Bayard.",
      "Patron of Leonardo da Vinci; built architectural wonders including Château de Chambord and Fontainebleau.",
      "Issued Ordinance of Villers-Cotterêts (1539), establishing French as official language for all legal acts."
    ],
    highlightsFr: [
      "Victoire éclatante de Marignan (1515), adoubé sur le champ de bataille par Bayard.",
      "Mécène de Léonard de Vinci et constructeur des châteaux de Chambord et Fontainebleau.",
      "Ordonnance de Villers-Cotterêts (1539) imposant la langue française pour tous les actes juridiques."
    ]
  },
  216: {
    // Henry II (1547-1559)
    highlights: [
      "Recaptured Calais from England in 1558 through the Duke of Guise, ending 211 years of English possession.",
      "Concluded the Peace of Cateau-Cambrésis (1559) ending the half-century of Italian Wars.",
      "Mortally wounded in a jousting tournament celebrating the peace treaty, pierced in the eye by Montgomery's lance."
    ],
    highlightsFr: [
      "Reprise de Calais aux Anglais (1558) par le duc de Guise après deux siècles d'occupation.",
      "Signature des traités de paix de Cateau-Cambrésis (1559) mettant fin aux guerres d'Italie.",
      "Blessure mortelle à l'œil lors d'un tournoi par la lance de Gabriel de Montgomery."
    ]
  },
  217: {
    // Francis II (1559-1560)
    highlights: [
      "Reign dominated by the Catholic House of Guise (uncles of his wife Mary Queen of Scots).",
      "Thwarted the Protestant Amboise Conspiracy (1560) aimed at kidnapping the young king from Guise influence.",
      "Died after just 17 months on the throne from an inner ear infection leading to an abscess."
    ],
    highlightsFr: [
      "Gouvernement sous la tutelle omnipotente des princes de Guise, oncles de son épouse Marie Stuart.",
      "Échec de la conjuration huguenote d'Amboise (1560) visant à soustraire le jeune roi aux Guise.",
      "Mort prématurée à 16 ans des suites d'une otite purulente après 17 mois de règne."
    ]
  },
  218: {
    // Charles IX (1560-1574)
    highlights: [
      "Reigned during the outbreak of the French Wars of Religion under the dominant regency of Catherine de' Medici.",
      "Issued the Edict of Saint-Germain (1562) granting initial limited worship liberties to Huguenots.",
      "Sanctioned the Saint Bartholomew's Day Massacre (24 August 1572), resulting in the deaths of thousands of Protestants."
    ],
    highlightsFr: [
      "Éclatement sanglant des guerres de Religion sous la régence de Catherine de Médicis.",
      "Édit de tolérance de Saint-Germain (1562) accordant la liberté de conscience aux protestants.",
      "Massacre de la Saint-Barthélemy (24 août 1572) à Paris et dans les grandes provinces."
    ]
  },
  219: {
    // Henry III (1574-1589)
    highlights: [
      "Previously elected King of Poland and Grand Duke of Lithuania (1573–1574) before inheriting the French throne.",
      "Ordered the assassination of Duke Henry of Guise and his brother at the Château de Blois (1588).",
      "Assassinated by Catholic fanatic monk Jacques Clément at Saint-Cloud; last monarch of the House of Valois."
    ],
    highlightsFr: [
      "Brièvement élu roi de Pologne et grand-duc de Lituanie avant de monter sur le trône de France.",
      "Exécution ordonnée du duc Henri de Guise et du cardinal de Lorraine au château de Blois (1588).",
      "Assassiné à Saint-Cloud par le moine fanatique Jacques Clément; dernier souverain Valois."
    ]
  },

  // House of Bourbon
  108: {
    // Henry IV (1589-1610)
    highlights: [
      "Promulgated the landmark Edict of Nantes (1598), granting religious freedom and civil rights to Protestants.",
      "Rebuilt the war-torn economy with Minister Sully ('a chicken in every pot every Sunday').",
      "Beautified Paris with the Pont Neuf, Place des Vosges, and the Grande Galerie of the Louvre; assassinated by Ravaillac in 1610."
    ],
    highlightsFr: [
      "Promulgation de l'Édit de Nantes (1598) instaurant la tolérance religieuse et la paix civile.",
      "Redressement spectaculaire du royaume avec Sully ('la poule au pot le dimanche').",
      "Modernisation de Paris (Pont Neuf, place des Vosges, galerie du Louvre); assassiné par Ravaillac."
    ]
  },
  109: {
    // Louis XIII (1610-1643)
    highlights: [
      "Governed alongside Cardinal Richelieu, dismantling Huguenot military strongholds (Siege of La Rochelle, 1627–1628).",
      "Founded the Académie Française (1635) to standardize and protect the French language.",
      "Entered the Thirty Years' War against the Spanish and Austrian Habsburgs, establishing French European primacy."
    ],
    highlightsFr: [
      "Ministériat décisif du cardinal de Richelieu et grand siège de La Rochelle (1627-1628).",
      "Création de l'Académie française (1635) pour perfectionner et fixer la langue française.",
      "Engagement de la France dans la guerre de Trente Ans contre la maison de Habsbourg."
    ]
  },
  110: {
    // Louis XIV (1643-1715)
    highlights: [
      "Constructed the Palace of Versailles and transferred the seat of government and royal court there in 1682.",
      "Longest verified reign of any sovereign monarch in world history (72 years, 110 days).",
      "Expanded French borders to the north and east; revoked Edict of Nantes (Edict of Fontainebleau, 1685)."
    ],
    highlightsFr: [
      "Construction du somptueux château de Versailles et installation définitive de la cour en 1682.",
      "Plus long règne documenté de l'histoire universelle (72 ans et 110 jours).",
      "Extension des frontières (Flandre, Franche-Comté, Alsace); révocation de l'Édit de Nantes (1685)."
    ]
  },
  111: {
    // Louis XV (1715-1774)
    highlights: [
      "Reigned during the golden age of the French Enlightenment (Voltaire, Rousseau, Diderot's Encyclopédie).",
      "Fought the Seven Years' War (1756–1763), resulting in the Treaty of Paris and the loss of New France (Canada).",
      "Integrated Lorraine into France (1766) and acquired the island of Corsica from Genoa (1768)."
    ],
    highlightsFr: [
      "Apogée du siècle des Lumières en France (Voltaire, Rousseau, Montesquieu et l'Encyclopédie).",
      "Guerre de Sept Ans (1756-1763) et perte de la Nouvelle-France au traité de Paris.",
      "Rattachement définitif de la Lorraine (1766) et achat de la Corse à la République de Gênes (1768)."
    ]
  },
  112: {
    // Louis XVI (1774-1792)
    highlights: [
      "Financed and sent military expeditionary forces to aid the American Revolutionary War (Lafayette, Rochambeau, De Grasse).",
      "Convoked the Estates-General of 1789, leading directly to the Storming of the Bastille and Declaration of the Rights of Man.",
      "Overthrown on 10 August 1792; monarchy abolished and First French Republic proclaimed."
    ],
    highlightsFr: [
      "Soutien militaire et naval décisif à la guerre d'indépendance des États-Unis (Lafayette, Rochambeau).",
      "Convocation des États généraux de 1789, prise de la Bastille et Déclaration des droits de l'homme.",
      "Prise des Tuileries (10 août 1792), abolition de la royauté et proclamation de la Première République."
    ]
  },

  // First Empire & Restoration & July Monarchy
  113: {
    // Napoleon I (1804-1814)
    highlights: [
      "Promulgated the Napoleonic Civil Code (Code Civil) in 1804, which remains the cornerstone of modern civil law.",
      "Won brilliant military victories across Europe: Austerlitz (1805), Jena-Auerstedt (1806), and Friedland (1807).",
      "Created modern French administrative institutions: Bank of France, Legion of Honour, prefectures, and lycées."
    ],
    highlightsFr: [
      "Promulgation du Code civil (1804), socle fondamental du droit civil moderne.",
      "Victoires militaires légendaires : Austerlitz (1805), Iéna (1806) et Friedland (1807).",
      "Fondation des 'masses de granit' : Banque de France, Légion d'honneur, préfets et lycées."
    ]
  },
  225: {
    // Louis XVIII (1814-1824)
    highlights: [
      "Granted the Constitutional Charter of 1814, establishing a constitutional bicameral monarchy.",
      "Weathered Napoleon's Hundred Days (1815) return from Elba and stabilized post-Waterloo France.",
      "Successfully restored France's diplomatic standing at the Congress of Vienna and Aachen."
    ],
    highlightsFr: [
      "Octroi de la Charte constitutionnelle de 1814 créant une monarchie parlementaire moderne.",
      "Épreuve des Cent-Jours (1815) et stabilisation du pays après la défaite de Waterloo.",
      "Rétablissement du crédit international et de la place diplomatique de la France en Europe."
    ]
  },
  226: {
    // Charles X (1824-1830)
    highlights: [
      "Crowned with full traditional ancient rites at Reims Cathedral in 1825.",
      "Launched the naval expedition to Algiers in June 1830, initiating the French colonial presence in North Africa.",
      "Issued the Four July Ordinances restricting the press and parliament, triggering the July Revolution (Three Glorious Days)."
    ],
    highlightsFr: [
      "Dernier sacre grandiose d'un roi de France célébré en la cathédrale de Reims (1825).",
      "Expédition d'Alger (juin 1830) ouvrant la présence coloniale française en Afrique du Nord.",
      "Publication des ordonnances de Saint-Cloud déclenchant la révolution des Trois Glorieuses."
    ]
  },
  227: {
    // Louis-Philippe I (1830-1848)
    highlights: [
      "Reigned as constitutional 'King of the French' (Citizen King) under the revised Charter of 1830.",
      "Accelerated the Industrial Revolution in France, building the national railway network and factory system.",
      "Guizot Education Law of 1833 establishing public primary schools in every commune; overthrown in 1848 Revolution."
    ],
    highlightsFr: [
      "Règne constitutionnel comme 'roi des Français' issu de la révolution de 1830.",
      "Essor spectaculaire de la Révolution industrielle, du réseau de chemins de fer et du capitalisme.",
      "Loi Guizot (1833) créant une école primaire publique par commune; renversé par la Révolution de 1848."
    ]
  },

  // Second Republic & Second Empire
  220: {
    // Louis-Napoléon Bonaparte (President 1848-1852)
    highlights: [
      "First President of the French Republic, elected in December 1848 by overwhelming universal male suffrage.",
      "Promulgated the Falloux Law on educational freedom and dispatched French expedition to restore Pope Pius IX in Rome.",
      "Executed the coup d'état of 2 December 1851, which led to the re-establishment of the French Empire."
    ],
    highlightsFr: [
      "Premier président de la République française, élu triomphalement au suffrage universel masculin en 1848.",
      "Loi Falloux sur la liberté de l'enseignement et expédition militaire de Rome restaurant le pape Pie IX.",
      "Coup d'État du 2 décembre 1851 rétablissant le régime impérial après plébiscite."
    ]
  },
  221: {
    // Napoleon III (1852-1870)
    highlights: [
      "Commissioned Baron Haussmann to completely transform Paris with grand boulevards, public parks, and modern sewers.",
      "Supported Italian unification against Austria (victories at Magenta and Solferino; annexation of Nice and Savoy in 1860).",
      "Signed the Cobden-Chevalier Free Trade Treaty with Great Britain (1860); captured at the Battle of Sedan (1870)."
    ],
    highlightsFr: [
      "Métamorphose monumentale de Paris par le baron Haussmann (grands boulevards, égouts, parcs).",
      "Soutien décisif à l'unité italienne (Magenta, Solférino) et rattachement de Nice et de la Savoie (1860).",
      "Traité de libre-échange Cobden-Chevalier avec le Royaume-Uni (1860); capitulation de Sedan (1870)."
    ]
  },

  // Third Republic
  117: {
    // Adolphe Thiers (1871-1873)
    highlights: [
      "Negotiated the Treaty of Frankfurt (1871) ending the Franco-Prussian War.",
      "Crushed the Paris Commune insurrection during the 'Bloody Week' (Semaine Sanglante).",
      "Secured massive national loans to pay off the 5-billion-franc war indemnity, freeing French soil from German occupation years ahead of schedule."
    ],
    highlightsFr: [
      "Négociation du traité de Francfort (1871) concluant la guerre franco-prussienne.",
      "Répression militaire impitoyable de la Commune de Paris lors de la Semaine sanglante.",
      "Souscription d'emprunts nationaux géants pour libérer le territoire de l'occupation prussienne par anticipation."
    ]
  },
  222: {
    // Patrice de MacMahon (1873-1879)
    highlights: [
      "Enacted the Septennate Law (1873), fixing the French presidential term of office at seven years.",
      "Promulgated the Constitutional Laws of 1875, officially establishing the parliamentary Third Republic.",
      "Crisis of 16 May 1877: dissolved the Chamber of Deputies; republican election victory confirmed parliamentary dominance over the president."
    ],
    highlightsFr: [
      "Loi du septennat (1873) fixant la durée du mandat présidentiel à sept années.",
      "Adoption des lois constitutionnelles de 1875 fondant formellement la Troisième République.",
      "Crise du 16 mai 1877 : dissolution de la Chambre et triomphe républicain consacrant le régime parlementaire."
    ]
  },
  123: {
    // Jules Grévy (1879-1887)
    highlights: [
      "First Republican president to serve a full term; established the 'Grévy Doctrine' giving Parliament absolute supremacy.",
      "Promulgated the Jules Ferry laws establishing free, mandatory, and secular public primary education.",
      "Expanded the French colonial protectorate in Tunisia (Treaty of Bardo, 1881) and Tonkin."
    ],
    highlightsFr: [
      "Premier président républicain complet; instaure la 'constitution Grévy' effaçant le droit de dissolution.",
      "Promulgation des grandes lois scolaires de Jules Ferry (école gratuite, laïque et obligatoire).",
      "Établissement du protectorat français en Tunisie (traité du Bardo, 1881) et expédition du Tonkin."
    ]
  },
  223: {
    // Sadi Carnot (1887-1894)
    highlights: [
      "Presided over the 1889 Paris Universal Exposition commemorating the Revolution centennial, featuring the new Eiffel Tower.",
      "Concluded the historic Franco-Russian Alliance (1894) to counter the Triple Alliance.",
      "Stabbed and assassinated in Lyon on 24 June 1894 by Italian anarchist Sante Geronimo Caserio; buried in the Panthéon."
    ],
    highlightsFr: [
      "Inauguration triomphale de la tour Eiffel lors de l'Exposition universelle de Paris de 1889.",
      "Signature de l'Alliance franco-russe (1894) rééquilibrant les forces en Europe.",
      "Assassiné à Lyon par l'anarchiste italien Sante Caserio en 1894; inhumé au Panthéon."
    ]
  },
  224: {
    // Jean Casimir-Perier (1894-1895)
    highlights: [
      "Arrest and initial wrongful conviction of Captain Alfred Dreyfus for high treason in December 1894.",
      "Shortest presidency in French history, lasting just 205 days (June 1894 – January 1895).",
      "Resigned abruptly in protest against being excluded from foreign and cabinet decision-making by his ministers."
    ],
    highlightsFr: [
      "Arrestation et première condamnation d'Alfred Dreyfus en décembre 1894, ouvrant l'Affaire.",
      "Mandat présidentiel le plus court de l'histoire républicaine française (205 jours).",
      "Démissionne avec fracas pour protester contre son isolement par les ministres."
    ]
  },
  135: {
    // Félix Faure (1895-1899)
    highlights: [
      "Hosted the opulent state visit of Tsar Nicholas II of Russia to Paris, laying the cornerstone of Pont Alexandre III.",
      "Publication of Émile Zola's world-famous open letter 'J'accuse...!' in L'Aurore (1898) during the Dreyfus Affair.",
      "Fashoda Incident (1898) on the upper Nile, almost leading to war between France and Great Britain."
    ],
    highlightsFr: [
      "Visite d'État triomphale du tsar Nicolas II et pose de la première pierre du pont Alexandre III.",
      "Publication de la lettre ouverte 'J'accuse...!' d'Émile Zola dans L'Aurore (1898).",
      "Crise de Fachoda (1898) sur le Haut-Nil évitant de justesse un conflit armé avec le Royaume-Uni."
    ]
  },
  136: {
    // Émile Loubet (1899-1906)
    highlights: [
      "Granted presidential pardon to Alfred Dreyfus in 1899, paving the way for his full legal rehabilitation.",
      "Presided over the Paris 1900 Universal Exposition and the inauguration of the first Paris Métro line.",
      "Promulgated the landmark 1905 Law on the Separation of Church and State (Laïcité) and signed the Entente Cordiale (1904)."
    ],
    highlightsFr: [
      "Grâce présidentielle accordée à Alfred Dreyfus en 1899, ouvrant la voie à sa réhabilitation.",
      "Exposition universelle de 1900 et mise en service de la première ligne du métro parisien.",
      "Promulgation de la loi de 1905 de séparation des Églises et de l'État et signature de l'Entente cordiale (1904)."
    ]
  },
  137: {
    // Armand Fallières (1906-1913)
    highlights: [
      "Cour de Cassation fully annulled the conviction of Alfred Dreyfus, restoring him to the army and awarding the Legion of Honour (1906).",
      "Introduced the secret voting booth (isoloir) and envelope in French elections (1913).",
      "Signed the Treaty of Fez (1912), establishing the French protectorate over Morocco."
    ],
    highlightsFr: [
      "Réhabilitation totale et solennelle d'Alfred Dreyfus par la Cour de cassation (1906).",
      "Introduction de l'isoloir et de l'enveloppe électorale garantissant le vote secret (1913).",
      "Traité de Fès (1912) instaurant le protectorat français sur le Maroc."
    ]
  },
  118: {
    // Raymond Poincaré (1913-1920)
    highlights: [
      "Led France through the entirety of World War I (1914–1918), forging the 'Sacred Union' (Union Sacrée) across political factions.",
      "Wartime victories at the First Battle of the Marne (1914) and the defense of Verdun (1916).",
      "Signed the Treaty of Versailles (1919), regaining Alsace and Lorraine for France."
    ],
    highlightsFr: [
      "Direction de la France durant toute la Grande Guerre (1914-1918) et appel à l'Union sacrée.",
      "Victoire de la Marne (1914), enfer héroïque de Verdun (1916) et commandement de Foch.",
      "Signature du traité de Versailles (1919) consacrant le retour de l'Alsace-Lorraine à la France."
    ]
  },
  131: {
    // Paul Deschanel (1920)
    highlights: [
      "Defeated wartime Premier Georges Clemenceau in the January 1920 presidential election.",
      "Fell from the presidential train near Montargis in May 1920, miraculously surviving with minor injuries.",
      "Resigned after eight months due to nervous exhaustion and depression; later elected to the Senate."
    ],
    highlightsFr: [
      "Élection prestigieuse à l'Élysée en janvier 1920 en battant le 'Père la Victoire' Georges Clemenceau.",
      "Chute nocturne inattendue du train présidentiel en mai 1920 près de Montargis.",
      "Démissionne après huit mois pour raison de santé; réélu sénateur peu après."
    ]
  },
  132: {
    // Alexandre Millerand (1920-1924)
    highlights: [
      "Restored French diplomatic relations with the Vatican and normalized ties with the Catholic Church.",
      "Ordered the military occupation of the Ruhr (1923) alongside Belgium to compel German reparations payments.",
      "Forced to resign in June 1924 following the electoral victory of the left-wing Cartel des Gauches."
    ],
    highlightsFr: [
      "Rétablissement des relations diplomatiques avec le Vatican et apaisement religieux.",
      "Occupation militaire de la Ruhr (1923) avec les Belges pour contraindre l'Allemagne au paiement des réparations.",
      "Contraint à la démission par la grève des ministres du Cartel des gauches victorieux en 1924."
    ]
  },
  133: {
    // Gaston Doumergue (1924-1931)
    highlights: [
      "First Protestant president of France, renowned for his warm geniality and popularity ('Gastounet').",
      "Presided over the vibrant prosperity and artistic flourishing of the 'Roaring Twenties' (Années Folles) in Paris.",
      "Supported foreign minister Aristide Briand's reconciliation diplomacy, including the Locarno Treaties and Kellogg-Briand Pact."
    ],
    highlightsFr: [
      "Premier président protestant de la République, jouissant d'une immense popularité ('Gastounet').",
      "Période d'effervescence culturelle et de prospérité économique des Années folles.",
      "Soutien à la politique de réconciliation européenne de Briand (accords de Locarno, pacte Briand-Kellogg)."
    ]
  },
  134: {
    // Paul Doumer (1931-1932)
    highlights: [
      "Presided over the opening of the Paris International Colonial Exhibition in 1931.",
      "Venerated as a patriotic patriarch who had lost four sons in World War I.",
      "Assassinated on 6 May 1932 at a Paris charity book fair by Russian émigré Pavel Gorguloff."
    ],
    highlightsFr: [
      "Préside l'inauguration de la prestigieuse Exposition coloniale internationale de 1931 à Vincennes.",
      "Figure patriotique respectée ayant sacrifié quatre de ses fils durant la Grande Guerre.",
      "Assassiné le 6 mai 1932 à Paris lors d'un salon du livre par l'émigré russe Paul Gorguloff."
    ]
  },
  124: {
    // Albert Lebrun (1932-1940)
    highlights: [
      "Re-elected in 1939; witnessed the election of the Popular Front government in 1936 and the historic Matignon Agreements.",
      "France declared war on Nazi Germany in September 1939 following the invasion of Poland.",
      "Fall of France in June 1940; National Assembly voted full constituent powers to Marshal Philippe Pétain, ending the Third Republic."
    ],
    highlightsFr: [
      "Victoire du Front populaire (1936), grèves joyeuses et accords de Matignon (premiers congés payés).",
      "Déclaration de guerre à l'Allemagne nazie en septembre 1939 après l'invasion de la Pologne.",
      "Débâcle de mai-juin 1940 et vote des pleins pouvoirs à Philippe Pétain à Vichy marquant la fin de la IIIe République."
    ]
  },

  // Fourth Republic
  125: {
    // Vincent Auriol (1947-1954)
    highlights: [
      "First President of the Fourth Republic, overseeing major post-war industrial reconstruction under the Monnet Plan.",
      "Creation of the European Coal and Steel Community (ECSC, 1951), the founding brick of European integration.",
      "Presided over the outbreak of the Cold War (joining NATO in 1949) and the First Indochina War."
    ],
    highlightsFr: [
      "Premier président de la IVe République; redressement et modernisation industrielle (plan Monnet).",
      "Création de la CECA (1951) avec Robert Schuman et Jean Monnet, berceau de la construction européenne.",
      "Entrée de la France dans l'OTAN (1949) et enlisement dans la guerre d'Indochine."
    ]
  },
  130: {
    // René Coty (1954-1959)
    highlights: [
      "Signed the Treaty of Rome (1957) establishing the European Economic Community (Common Market).",
      "Dealt with the Algerian War and severe government instability (12 successive cabinets).",
      "Appealed to General Charles de Gaulle to return to power during the May 1958 crisis to avoid civil war."
    ],
    highlightsFr: [
      "Signature historique du traité de Rome (1957) créant la Communauté économique européenne.",
      "Période dominée par le drame de la guerre d'Algérie et une instabilité ministérielle chronique.",
      "Appel solennel au général de Gaulle en mai 1958 pour former le gouvernement et doter la France d'une nouvelle constitution."
    ]
  },

  // Fifth Republic
  119: {
    // Charles de Gaulle (1959-1969)
    highlights: [
      "Founded the Fifth Republic and introduced direct universal suffrage for presidential elections (1962).",
      "Concluded the Évian Accords (1962) granting Algerian independence.",
      "Developed independent French nuclear deterrent ('force de frappe') and withdrew France from NATO integrated military command (1966).",
      "Weathered the student and general strike crisis of May 1968; resigned in 1969 following a defeated constitutional referendum."
    ],
    highlightsFr: [
      "Fondation de la Ve République et élection du président au suffrage universel direct (1962).",
      "Accords d'Évian (1962) mettant fin à la guerre d'Algérie et reconnaissant son indépendance.",
      "Dotation de la force de frappe nucléaire et retrait du commandement militaire intégré de l'OTAN (1966).",
      "Désamorçage de la crise de mai 68; démission en 1969 après le rejet de son référendum sur le Sénat."
    ]
  },
  126: {
    // Georges Pompidou (1969-1974)
    highlights: [
      "Accelerated high-tech industrial modernization: launch of the Airbus project, Concorde supersonic flights, and the TGV train program.",
      "Lifted French veto on the United Kingdom joining the European Economic Community (1973).",
      "Modernized Paris architecture, commissioning the Centre Pompidou modern art museum and urban expressways."
    ],
    highlightsFr: [
      "Accélération industrielle majeure : lancement des programmes Airbus, TGV et essor du Concorde.",
      "Levée du veto français permettant l'adhésion du Royaume-Uni à la CEE (1973).",
      "Modernisation de Paris, création du Centre Georges-Pompidou et aménagement des voies sur berge."
    ]
  },
  127: {
    // Valéry Giscard d'Estaing (1974-1981)
    highlights: [
      "Sweeping societal reforms: lowered voting age to 18, legalized abortion (Veil Law, 1975), and mutual consent divorce.",
      "Co-founded the G7 summit (Rambouillet, 1975) and established the European Council with German Chancellor Helmut Schmidt.",
      "Launched the French nuclear power energy independence program (Messmer plan) and the commercial TGV rail system."
    ],
    highlightsFr: [
      "Grandes réformes sociétales : majorité à 18 ans, légalisation de l'IVG (loi Veil, 1975), divorce par consentement mutuel.",
      "Création du G7 (sommet de Rambouillet, 1975) et du Conseil européen avec Helmut Schmidt.",
      "Lancement du grand programme d'indépendance électronucléaire et mise en service commerciale du TGV."
    ]
  },
  120: {
    // François Mitterrand (1981-1995)
    highlights: [
      "Abolished the death penalty (Robert Badinter, 1981), created the 5th week of paid leave, and reduced retirement age to 60.",
      "Longest-serving president in French history (14 years); managed two periods of 'cohabitation' with conservative prime ministers.",
      "Signed the Maastricht Treaty (1992) creating the European Union and the single currency (Euro).",
      "Grand architectural projects in Paris: Louvre Pyramid, Bibliothèque nationale de France, and Grande Arche de la Défense."
    ],
    highlightsFr: [
      "Abolition de la peine de mort (loi Badinter, 1981), 5e semaine de congés payés, retraite à 60 ans.",
      "Record de longévité présidentielle (14 ans) et deux cohabitations politiques réussies.",
      "Signature du traité de Maastricht (1992) fondant l'Union européenne et prévoyant l'Euro.",
      "Grands travaux parisiens : pyramide du Louvre, Bibliothèque nationale de France, Arche de la Défense."
    ]
  },
  121: {
    // Jacques Chirac (1995-2007)
    highlights: [
      "Delivered the historic Vel' d'Hiv speech (1995), officially acknowledging the French State's responsibility in the Holocaust.",
      "Transitioned France from the French Franc to the Euro currency (cash introduction in 2002).",
      "Spearheaded international diplomatic opposition to the 2003 US-led invasion of Iraq.",
      "Reduced the presidential term from seven to five years (quinquennat) via the 2000 constitutional referendum."
    ],
    highlightsFr: [
      "Discours historique du Vel' d'Hiv (1995) reconnaissant la responsabilité de l'État français dans la déportation.",
      "Passage à la monnaie unique européenne avec l'introduction des pièces et billets en Euro (2002).",
      "Refus catégorique et discours historique de la France à l'ONU contre la guerre d'Irak en 2003.",
      "Réforme constitutionnelle du quinquennat (2000) réduisant le mandat présidentiel de 7 à 5 ans."
    ]
  },
  128: {
    // Nicolas Sarkozy (2007-2012)
    highlights: [
      "Navigated the 2008 global financial crisis and European sovereign debt crisis through coordinated European leadership.",
      "Passed major 2008 constitutional revision limiting presidents to two consecutive terms and expanding citizen rights.",
      "Reintegrated France into the NATO integrated military command structure in 2009 after 43 years.",
      "Led the international military intervention in Libya (2011) and raised retirement age from 60 to 62."
    ],
    highlightsFr: [
      "Gestion active de la crise financière mondiale de 2008 et sauvetage de la zone euro.",
      "Réforme constitutionnelle de 2008 limitant à deux mandats consécutifs et renforçant le Parlement.",
      "Réintégration de la France dans le commandement intégré de l'OTAN (2009).",
      "Intervention militaire en Libye (2011) et réforme des retraites portant l'âge légal à 62 ans."
    ]
  },
  129: {
    // François Hollande (2012-2017)
    highlights: [
      "Enacted the 'Marriage for All' law (2013), legalizing same-sex marriage and adoption.",
      "Hosted and brokered the historic COP21 Paris Climate Agreement (2015), adopted by 195 nations.",
      "Launched Operation Serval (2013) to repel jihadist offensives in Mali and protect West African sovereignty.",
      "Led national unity response following the tragic terrorist attacks of January and November 2015 in Paris."
    ],
    highlightsFr: [
      "Adoption de la loi sur le 'Mariage pour tous' (2013) ouvrant le mariage et l'adoption aux couples de même sexe.",
      "Présidence de la COP21 et conclusion de l'accord historique de Paris sur le climat (2015).",
      "Lancement de l'opération Serval au Mali (2013) stoppant la progression des groupes djihadistes.",
      "Gestion des attentats de janvier et novembre 2015 et rassemblement républicain historique."
    ]
  },
  122: {
    // Emmanuel Macron (2017-present)
    highlights: [
      "France's youngest president at age 39, breaking traditional political party duopoly with En Marche!.",
      "Promoted European sovereignty agendas (Sorbonne speech, strategic autonomy) and navigated the COVID-19 pandemic.",
      "Major social reforms including pension reform (raising retirement age to 64) and industrial re-shoring initiatives.",
      "Hosted the successful Paris 2024 Olympic and Paralympic Games, celebrating French cultural heritage worldwide."
    ],
    highlightsFr: [
      "Plus jeune président de l'histoire à 39 ans, bousculant le paysage politique traditionnel.",
      "Défense de la souveraineté européenne (discours de la Sorbonne) et gestion de la crise de la COVID-19.",
      "Réforme des retraites portant l'âge à 64 ans et grand plan de réindustrialisation / French Tech.",
      "Accueil et organisation des Jeux Olympiques et Paralympiques de Paris 2024 au cœur des monuments parisiens."
    ]
  }
};

/**
 * Calculates who was in power in the UK and US during the French ruler's reign
 */
export const getTenureData = (monarch: Monarch): TenureHighlightsData => {
  const start = monarch.reignStart;
  const currentYear = new Date().getFullYear();
  const end = monarch.reignEnd ?? currentYear;

  // 1. UK Monarchs overlap
  const overlappingUkMonarchs: TenureLeader[] = UK_MONARCHS
    .filter(m => m.start <= end && m.end >= start)
    .map(m => ({
      name: m.name,
      nameFr: m.nameFr,
      years: `${m.start}–${m.end >= currentYear ? 'present' : m.end}`
    }));

  // 2. UK Prime Ministers overlap (Post-1721)
  const overlappingUkPms: TenureLeader[] = UK_PRIME_MINISTERS
    .filter(pm => pm.start <= end && pm.end >= start)
    .map(pm => ({
      name: pm.name,
      nameFr: pm.nameFr,
      years: `${pm.start}–${pm.end >= currentYear ? 'present' : pm.end}`
    }));

  // 3. US Presidents overlap (Post-1789)
  const overlappingUsPresidents: TenureLeader[] = US_PRESIDENTS
    .filter(pres => pres.start <= end && pres.end >= start)
    .map(pres => ({
      name: pres.name,
      nameFr: pres.nameFr,
      years: `${pres.start}–${pres.end >= currentYear ? 'present' : pres.end}`
    }));

  // Historical highlight data for this ruler
  const curated = MONARCH_TENURE_HIGHLIGHTS[monarch.id];
  const highlights = curated?.highlights || [
    `Presided over the Kingdom/Republic of France from ${start} to ${monarch.reignEnd ?? 'present'}.`,
    monarch.context
  ];
  const highlightsFr = curated?.highlightsFr || [
    `A dirigé le royaume ou la République de France de ${start} à ${monarch.reignEnd ?? 'présent'}.`,
    monarch.contextFr || monarch.context
  ];

  return {
    monarchId: monarch.id,
    highlights,
    highlightsFr,
    ukMonarchs: overlappingUkMonarchs,
    ukPrimeMinisters: overlappingUkPms,
    usPresidents: overlappingUsPresidents,
    prePmNote: end < 1721 ? "Office of UK Prime Minister was established in 1721 (Sir Robert Walpole)." : undefined,
    prePmNoteFr: end < 1721 ? "Le poste de Premier ministre britannique n'a été créé qu'en 1721 (Sir Robert Walpole)." : undefined,
    prePresNote: end < 1789 ? "The US Presidency was established in 1789 following the Constitution (George Washington)." : undefined,
    prePresNoteFr: end < 1789 ? "La présidence des États-Unis a été établie en 1789 par la Constitution (George Washington)." : undefined
  };
};
