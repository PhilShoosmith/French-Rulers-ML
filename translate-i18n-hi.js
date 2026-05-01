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
  
  const hiObj = {};
  
  const keys = Object.keys(enObj);
  console.log(`Translating ${keys.length} keys to Hindi...`);
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const text = enObj[key];
    
    // Skip translating keys that are just language names if we want, but let's just translate all
    if (key === 'english') { hiObj[key] = 'English'; continue; }
    if (key === 'french') { hiObj[key] = 'Français'; continue; }
    if (key === 'japanese') { hiObj[key] = '日本語'; continue; }
    if (key === 'chinese') { hiObj[key] = '中文'; continue; }
    
    try {
      // Handle interpolation variables like {{name}}
      // We can temporarily replace them with placeholders that won't be translated
      let tempText = text;
      const vars = [];
      tempText = tempText.replace(/\{\{([^}]+)\}\}/g, (match, p1) => {
        vars.push(match);
        return `__VAR${vars.length - 1}__`;
      });
      
      const res = await translate(tempText, { to: 'hi' });
      let translatedText = res.text;
      
      // Restore variables
      for (let j = 0; j < vars.length; j++) {
        translatedText = translatedText.replace(`__VAR${j}__`, vars[j]);
      }
      
      hiObj[key] = translatedText;
      console.log(`Translated ${key}`);
    } catch (e) {
      console.error(`Failed to translate ${key}:`, e);
      hiObj[key] = text; // fallback
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  const hiObjStr = JSON.stringify(hiObj, null, 6).replace(/\n/g, '\n  ');
  
  const newContent = fileContent.replace(
    /export default i18n;/,
    `  hi: {\n    translation: ${hiObjStr}\n  }\n};\n\ni18n\n  .use(initReactI18next)\n  .init({\n    resources,\n    lng: "en",\n    fallbackLng: "en",\n    interpolation: {\n      escapeValue: false\n    }\n  });\n\nexport default i18n;`
  ).replace(/};\n\ni18n\n  \.use\(initReactI18next\)/, '');
  
  fs.writeFileSync('./i18n.ts', newContent);
  console.log("i18n translation complete!");
}

translateI18n();
