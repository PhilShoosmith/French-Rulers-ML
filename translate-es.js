import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function translateMonarchs() {
  const fileContent = fs.readFileSync('./services/gameService.ts', 'utf-8');
  
  // Extract the array part
  const match = fileContent.match(/export const allMonarchs: Monarch\[\] = (\[[\s\S]*\]);/);
  if (!match) {
    console.error("Could not find allMonarchs array");
    return;
  }
  
  const monarchs = eval(match[1]);
  
  console.log(`Found ${monarchs.length} monarchs to translate.`);
  
  for (let i = 0; i < monarchs.length; i++) {
    const m = monarchs[i];
    if (m.nameEs && m.titleEs && m.contextEs) {
      continue;
    }
    
    console.log(`Translating ${m.name}... (${i + 1}/${monarchs.length})`);
    
    try {
      const prompt = `Translate the following English text into Spanish. Return ONLY a valid JSON object with the keys "nameEs", "titleEs", and "contextEs".
      
Name: ${m.name}
Title: ${m.title}
Context: ${m.context}

JSON format:
{
  "nameEs": "...",
  "titleEs": "...",
  "contextEs": "..."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      let text = response.text;
      text = text.replace(/```json\n?/, '').replace(/```\n?/, '');
      
      const translated = JSON.parse(text);
      
      m.nameEs = translated.nameEs;
      m.titleEs = translated.titleEs;
      m.contextEs = translated.contextEs;
      
    } catch (e) {
      console.error(`Failed to translate ${m.name}:`, e);
    }
    
    // Add a small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  const newContent = fileContent.replace(
    /export const allMonarchs: Monarch\[\] = \[[\s\S]*\];/,
    `export const allMonarchs: Monarch[] = ${JSON.stringify(monarchs, null, 2)};`
  );
  
  fs.writeFileSync('./services/gameService.ts', newContent);
  console.log("Translation complete!");
}

translateMonarchs();
