import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY environment variable not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function translateMonarchs() {
  const gameServicePath = './src/services/gameService.ts'; // Wait, it's ./services/gameService.ts
  const actualPath = './services/gameService.ts';
  let content = fs.readFileSync(actualPath, 'utf8');

  // Regex to find each monarch object
  const monarchRegex = /\{[\s\S]*?id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?context:\s*'([^']+)'[\s\S]*?\}/g;
  
  let match;
  const translations: Record<string, any> = {};

  while ((match = monarchRegex.exec(content)) !== null) {
    const id = match[1];
    const name = match[2];
    const title = match[3];
    const context = match[4];
    
    // Check if it already has nameZh
    if (match[0].includes('nameZh:')) {
        continue;
    }

    console.log(`Translating ${name}...`);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Translate the following English text about a French historical figure into Chinese. Provide the output as a JSON object with keys "nameZh", "titleZh", and "contextZh". Do not include markdown formatting or code blocks, just the raw JSON.

Name: ${name}
Title: ${title}
Context: ${context}`,
      });

      let jsonStr = response.text.trim();
      if (jsonStr.startsWith('```json')) {
          jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
      } else if (jsonStr.startsWith('```')) {
          jsonStr = jsonStr.substring(3, jsonStr.length - 3).trim();
      }
      
      const translated = JSON.parse(jsonStr);
      translations[id] = translated;
      
      // Replace in content
      const replacement = match[0].replace(
        /contextJa:\s*'([^']+)'/,
        `contextJa: '$1',\n    nameZh: '${translated.nameZh.replace(/'/g, "\\'")}',\n    titleZh: '${translated.titleZh.replace(/'/g, "\\'")}',\n    contextZh: '${translated.contextZh.replace(/'/g, "\\'")}'`
      );
      
      content = content.replace(match[0], replacement);
      
      // Save incrementally
      fs.writeFileSync(actualPath, content);
      
    } catch (error) {
      console.error(`Error translating ${name}:`, error);
    }
    
    // Add a small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.log("Translation complete.");
}

translateMonarchs();
