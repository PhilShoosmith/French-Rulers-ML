import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function translate() {
  const content = fs.readFileSync('services/gameService.ts', 'utf-8');
  
  const prompt = `Translate the following TypeScript file to French. Only translate the string values for 'name', 'context', and 'title' in the allMonarchs array. Keep the rest of the code exactly the same. Return the full file content without markdown blocks.
  
  ${content}`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  
  let text = response.text;
  if (text.startsWith('```typescript')) {
    text = text.replace(/```typescript\n/, '').replace(/\n```$/, '');
  } else if (text.startsWith('```')) {
    text = text.replace(/```\n/, '').replace(/\n```$/, '');
  }
  
  fs.writeFileSync('services/gameServiceFr.ts', text);
  console.log('Done');
}

translate();
