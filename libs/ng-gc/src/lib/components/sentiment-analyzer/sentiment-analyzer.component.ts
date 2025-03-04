import { Component, effect, HostBinding, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';
import { NGGCSentimentAnalysisConfig, NGGCSentimentResponse } from '../../types';

@Component({
  selector: 'ng-gc-sentiment-analyzer',
  imports: [CommonModule],
  templateUrl: './sentiment-analyzer.component.html',
  styleUrl: './sentiment-analyzer.component.css',
})
// Component to analyze the sentiment of a given text input after given wait period
export class SentimentAnalyzerComponent {
  geminiService = inject(GeminiService);
  text = input.required<string>();
  config = input<NGGCSentimentAnalysisConfig | null>(null);
  sentiment = signal<NGGCSentimentResponse | null>(null);
  // Create loading signal to show when the sentiment is being analyzed
  loading = signal(false);
  @HostBinding('attr.data-sentiment')
  get sentimentAttr() {
    if (this.loading()) {
      return 'loading';
    }
    return this.sentiment()?.category || null;
  }
  constructor() {
    effect(() => {
      // Initialize a text value variable
      // If this value is empty, return early
      const textVal = this.text().trim();
      if (!textVal) {
        this.loading.set(false);
        this.sentiment.set(null);
        return;
      }
      // Call the analyze method from the Gemini service
      // Log the result to the console
      // Set the loading flag, use to delay output
      this.loading.set(true);
      this.geminiService.analyze(this.text(), this.config()).then((result) => {
        console.log(result);
        this.sentiment.set(result);
        this.loading.set(false);
      });
    },
    {
      allowSignalWrites: true,
    });
  }
}
