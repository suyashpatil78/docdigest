import { Component } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.scss'
})
export class TypewriterComponent {
  sentences = [
    'Upload your ebooks and research papers and the AI will summarize it for you.',
    'Convert entire PDF into brief, easy-to-read notes for students and researchers.',
    'Summarize your PDF in any language using "state-of-the-art" AI.',
    'Currently restricted to 10 requests per minute!'
  ];

  displayText = '';

  currentSentenceIndex = 0;

  charIndex = 0;

  isDeleting = false;

  typeLoop() {
    const currentSentence = this.sentences[this.currentSentenceIndex];
    const fullLength = currentSentence.length;

    if (this.isDeleting) {
      this.displayText = currentSentence.substring(0, this.charIndex--);
    } else {
      this.displayText = currentSentence.substring(0, this.charIndex++);
    }

    let delay = this.isDeleting ? 20 : 40;

    // Pause at end of typing
    if (!this.isDeleting && this.charIndex === fullLength + 1) {
      delay = 1000;
      this.isDeleting = true;
    }
    // Pause after deleting
    else if (this.isDeleting && this.charIndex === 1) {
      this.isDeleting = false;
      this.currentSentenceIndex = (this.currentSentenceIndex + 1) % this.sentences.length;
      delay = 100;
    }

    setTimeout(() => this.typeLoop(), delay);
  }

  ngOnInit(): void {
    this.typeLoop();
  }
}
