import fs from 'fs';
import translate from 'google-translate-api-x';

async function translateMonarchs() {
  const fileContent = fs.readFileSync('./services/gameService.ts', 'utf-8');
  
  const match = fileContent.match(/export const allMonarchs: Monarch\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    console.error("Could not find allMonarchs array");
    return;
  }
  
  const monarchs = eval(match[1]);
  
  console.log(`Found ${monarchs.length} monarchs to translate.`);
  
  for (let i = 0; i < monarchs.length; i++) {
    const m = monarchs[i];
    if (m.nameHi && m.titleHi && m.contextHi) {
      continue;
    }
    
    console.log(`Translating ${m.name}... (${i + 1}/${monarchs.length})`);
    
    try {
      const resName = await translate(m.name, { to: 'hi' });
      const resTitle = await translate(m.title, { to: 'hi' });
      const resContext = await translate(m.context, { to: 'hi' });
      
      m.nameHi = resName.text;
      m.titleHi = resTitle.text;
      m.contextHi = resContext.text;
      
    } catch (e) {
      console.error(`Failed to translate ${m.name}:`, e);
    }
    
    // Add a small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  const newContent = fileContent.replace(
    /export const allMonarchs: Monarch\[\] = \[[\s\S]*\];/,
    `export const allMonarchs: Monarch[] = ${JSON.stringify(monarchs, null, 2)};`
  );
  
  fs.writeFileSync('./services/gameService.ts', newContent);
  console.log("Translation complete!");
}

translateMonarchs();
