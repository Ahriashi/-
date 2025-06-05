import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  calendarOptions: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    const bookings = this.bookingService.getBookings();
    
    const events = bookings.map(b => ({
      title: b.title,
      date: new Date(b.date),
      color: '#4caf50' // зелёный для пользовательских броней
    }));

    // Пример лекций и заметок преподавателя
    const lectures = [
      { title: 'Лекция: Правила Дорожного Движения', date: '2025-06-10', color: '#2196f3' },
      { title: 'Лекция: Первая помощь', date: '2025-06-15', color: '#2196f3' }
    ];

    const notes = [
      { title: '🔔 Принести справки!', date: '2025-06-08', color: '#ff9800' }
    ];

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      events: [...events, ...lectures, ...notes]
    };
  }
}
