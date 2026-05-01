import fs from 'fs';
import translate from 'google-translate-api-x';

async function translateI18n() {
  const fileContent = fs.readFileSync('./i18n.ts', 'utf-8');
  
  const enObjMatch = fileContent.match(/en: \{\s*translation: (\{[\s\S]*?\n    \})\s*\},\s*fr:/);
  if (!enObjMatch) {
    console.error("Could not find English translation object");
    return;
  }
  
  const enObjStr = enObjMatch[1];
  const enObj = eval('(' + enObjStr + ')');
  
  const arObj = {};
  
  const keys = Object.keys(enObj);
  console.log(`Translating ${keys.length} keys to Arabic...`);
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const text = enObj[key];
    
    if (key === 'english') { arObj[key] = 'English'; continue; }
    if (key === 'french') { arObj[key] = 'Français'; continue; }
    if (key === 'japanese') { arObj[key] = '日本語'; continue; }
    if (key === 'chinese') { arObj[key] = '中文'; continue; }
    if (key === 'spanish') { arObj[key] = 'Español'; continue; }
    if (key === 'hindi') { arObj[key] = 'हिन्दी'; continue; }
    
    try {
      let tempText = text;
      const vars = [];
      tempText = tempText.replace(/\{\{([^}]+)\}\}/g, (match, p1) => {
        vars.push(match);
        return `__VAR${vars.length - 1}__`;
      });
      
      const res = await translate(tempText, { to: 'ar' });
      let translatedText = res.text;
      
      for (let j = 0; j < vars.length; j++) {
        translatedText = translatedText.replace(`__VAR${j}__`, vars[j]);
      }
      
      arObj[key] = translatedText;
      console.log(`Translated ${key}`);
    } catch (e) {
      console.error(`Failed to translate ${key}:`, e);
      arObj[key] = text; // fallback
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  const arObjStr = JSON.stringify(arObj, null, 6).replace(/\n/g, '\n  ');
  
  const newContent = fileContent.replace(
    /export default i18n;/,
    `  ar: {\n    translation: ${arObjStr}\n  }\n};\n\ni18n\n  .use(initReactI18next)\n  .init({\n    resources,\n    lng: "en",\n    fallbackLng: "en",\n    interpolation: {\n      escapeValue: false\n    }\n  });\n\nexport default i18n;`
  ).replace(/};\n\ni18n\n  \.use\(initReactI18next\)/, '');
  
  fs.writeFileSync('./i18n.ts', newContent);
  console.log("i18n translation complete!");
}

translateI18n();
