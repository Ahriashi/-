import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  ticketNumbers = Array.from({ length: 40 }, (_, i) => i + 1); // [1, 2, ..., 40]

  constructor(private router: Router) {}

  goToTicket(ticketNumber: number) {
    this.router.navigate(['/questions', ticketNumber]);
  }
}
