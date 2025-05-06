import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Content generation using OpenAI
export interface ContentGenerationParams {
  prompt: string;
  type: 'article' | 'comparison' | 'destination' | 'challenge';
}

export async function generateContent({ prompt, type }: ContentGenerationParams): Promise<string> {
  try {
    const response = await fetch('/api/generate/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, type }),
    });

    if (!response.ok) {
      throw new Error(`Error generating content: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}

// Content analysis
export async function analyzeContent(text: string): Promise<{
  summary: string;
  keywords: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Analyze the provided text and return a JSON object with a brief summary, extracted keywords, and sentiment analysis (positive, neutral, or negative). Format as: { summary: string, keywords: string[], sentiment: 'positive' | 'neutral' | 'negative' }"
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      summary: result.summary,
      keywords: result.keywords,
      sentiment: result.sentiment
    };
  } catch (error) {
    throw new Error(`Failed to analyze content: ${error.message}`);
  }
}
