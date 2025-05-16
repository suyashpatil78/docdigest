import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.scss'
})
export class TypewriterComponent {
  @Input() text: string = '';

  displayText = '';

  charIndex = 0;

  isDeleting = false;

  typeLoop() {
    const fullLength = this.text.length;

    if (this.isDeleting) {
      this.text = this.displayText.substring(0, this.charIndex--);
    } else {
      this.text = this.displayText.substring(0, this.charIndex++);
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
      delay = 100;
    }

    setTimeout(() => this.typeLoop(), delay);
  }

  ngOnInit(): void {
    this.typeLoop();
  }
}
