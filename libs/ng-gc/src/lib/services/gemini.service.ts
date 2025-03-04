import { inject, Injectable } from '@angular/core';
import { NGGC_API_CONFIG } from '../tokens/gemini-api-config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NGGCSentimentAnalysisConfig, NGGCSentimentResponse } from '../types';

// Service to interact with the Gemini API
@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  // Inject the API key from the app config
  geminiApiConfig = inject(NGGC_API_CONFIG);
  genAI: GoogleGenerativeAI;
  constructor() {
    // Ensure the API key is provided
    if (!this.geminiApiConfig.apiKey) {
      throw new Error('Gemini API key is required');
    }
    if (!this.geminiApiConfig.model) {
      throw new Error('Gemini model is required');
    }
    // Available within the service to use for API calls and sentiment analysis
    this.genAI = new GoogleGenerativeAI(this.geminiApiConfig.apiKey);
  }

  async analyze(text: string, config: NGGCSentimentAnalysisConfig | null) {
    // Get the generative model from the API
    const model = this.genAI.getGenerativeModel({
      model: config?.model || this.geminiApiConfig.model,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    })
    // Prompt to provide context for the sentiment analysis to the model
    const prompt = `
    You are an expert sentiment analyzer. You are tasked with analyzing the sentiment of the provided message.
    Using a rating ranging from 0 - 10 in terms of the intensity of the sentiment.
    Give an emoji matching the sentiment of the message.
    The sentiments can be positive, happy, appreciative, ect. Or negative angry, confused, toxic, ect.
    The reposone should be a stringigies JSON object with the following format:
    {
      "sentiment": string,
      "rating": number,
      "emoji": string
      "category": "positive" | "negative"
    }
      This is the text:
      ${text}
    `;
    // Generate content from the model with the provided prompt
    const result = await model.generateContent([prompt]);
    // Return an actual JSON object from the response
    return JSON.parse(result.response.text()) as NGGCSentimentResponse;
  }
}
