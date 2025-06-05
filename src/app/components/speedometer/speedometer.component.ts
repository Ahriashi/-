import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speedometer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speedometer.component.html',
})
export class SpeedometerComponent {
  @Input() percent = 0;
  @Input() label = 'Прогресс';

  needleX = 100;
  needleY = 100;
  ticks: { x1: number, y1: number, x2: number, y2: number }[] = [];

  ngOnInit(): void {
    this.updateNeedle();
    this.generateTicks();
  }

  updateNeedle(): void {
    const angleDeg = 180 * (this.percent / 100);
    const angleRad = (Math.PI * (180 - angleDeg)) / 180;

    const length = 60;
    this.needleX = 100 + length * Math.cos(angleRad);
    this.needleY = 100 - length * Math.sin(angleRad);
  }

  generateTicks(): void {
    const rOuter = 80;
    const rInner = 72;

    for (let i = 0; i <= 10; i++) {
      const angleDeg = 180 * (i / 10);
      const angleRad = (Math.PI * (180 - angleDeg)) / 180;

      const x1 = 100 + rOuter * Math.cos(angleRad);
      const y1 = 100 - rOuter * Math.sin(angleRad);
      const x2 = 100 + rInner * Math.cos(angleRad);
      const y2 = 100 - rInner * Math.sin(angleRad);

      this.ticks.push({ x1, y1, x2, y2 });
    }
  }
}
