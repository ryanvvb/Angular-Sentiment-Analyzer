// Create a type for the response from the sentiment analysis
// This will be used to define the return type of the analyze method
export type NGGCSentimentResponse = {
  sentiment: string;
  rating: number;
  emoji: string;
  category: 'positive' | 'negative';
};

export type NGGCSentimentAnalysisConfig = {
  model?: string;
};

type AiModel = 'gemini-2.0-pro' | 'gemini-2.0-flash';

export type NGGCSupportedModel = {
  title: string;
  name: AiModel;
};

// Create a type for the configuration object
// This will be used to define the type of the API key in the app config
export type NgGCCongig = {
  apiKey: string;
  model: AiModel;
};
