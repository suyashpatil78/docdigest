import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-summary',
  imports: [MarkdownModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  @Input() summary: string = '';

  displayText = signal<string>('');

  charIndex = 0;

  timeout: any;

  typeLoop() {
    const currentSentence = this.summary;
    const fullLength = this.summary.length;

    this.displayText.set(currentSentence.substring(0, this.charIndex + 1));
    this.charIndex++;

    if (this.charIndex > fullLength) {
      this.charIndex = 0;
    }

    this.timeout = setTimeout(() => {
      this.typeLoop();
    }, 0);

    // Clear this timeout once the summary is fully typed
    if (this.charIndex === fullLength) {
      clearTimeout(this.timeout);
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    const summaryElements = document.querySelectorAll('.summary-text-container');
    const lastElement = summaryElements[summaryElements.length - 1];
    if (lastElement) {
      lastElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['summary'].currentValue !== changes['summary'].previousValue) {
      this.typeLoop();
    }
  }
}
