import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOptionId: string;
  comment: string;
}

@Component({
  selector: 'app-question-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss'],
})
export class QuestionViewComponent implements OnInit {
  ticketId!: number;
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedOptionId: string | null = null;
  showComment = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuestions(this.ticketId);
  }

  loadQuestions(ticketId: number) {
    const url = `/assets/data/questions-${ticketId}.json`;
    this.http.get<Question[]>(url).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (err) => {
        console.error('Ошибка загрузки вопросов', err);
        this.questions = [];
      }
    });
  }

  selectOption(optionId: string) {
    if (this.selectedOptionId === optionId && this.showComment) {
      // повторный клик скрывает подсказку
      this.showComment = false;
      this.selectedOptionId = null;
    } else {
      this.selectedOptionId = optionId;
      this.showComment = true;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.resetSelection();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.resetSelection();
    }
  }

  resetSelection() {
    this.selectedOptionId = null;
    this.showComment = false;
  }
}
