import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  title = 'Занятие по вождению';
  date: Date | null = null;
  time: string = '';
  location = 'Автошкола';

  allTimeOptions: string[] = ['08:00', '10:00', '12:00', '14:00', '16:00'];
  availableTimeOptions: string[] = [];

  bookedDatesTimes: { [key: string]: string[] } = {};

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit() {
    const bookings = this.bookingService.getBookings();

    // Формируем объект: { '2025-05-25': ['08:00', '10:00'], ... }
    for (let booking of bookings) {
      const dateStr = new Date(booking.date).toDateString();
      const timeStr = new Date(booking.date).toTimeString().substring(0, 5); // 'HH:MM'
      if (!this.bookedDatesTimes[dateStr]) {
        this.bookedDatesTimes[dateStr] = [];
      }
      this.bookedDatesTimes[dateStr].push(timeStr);
    }
  }

  onDateChange() {
    if (!this.date) return;

    const dateStr = this.date.toDateString();
    const bookedTimes = this.bookedDatesTimes[dateStr] || [];

    this.availableTimeOptions = this.allTimeOptions.filter(time => !bookedTimes.includes(time));

    if (this.availableTimeOptions.length === 0) {
      this.time = '';
      alert('На выбранную дату нет свободных интервалов.');
    } else {
      this.time = this.availableTimeOptions[0]; // можно выбрать первый доступный по умолчанию
    }
  }

  addBooking() {
    if (!this.date || !this.time) {
      alert('Пожалуйста, выберите дату и время');
      return;
    }

    const datetime = new Date(this.date);
    const [hours, minutes] = this.time.split(':').map(Number);
    datetime.setHours(hours, minutes);

    const booking = {
      id: Date.now(),
      title: this.title,
      date: datetime.toISOString(),
      location: this.location
    };

    this.bookingService.addBooking(booking);
    alert('Занятие успешно забронировано!');
    this.router.navigate(['/']);
  }

 today = new Date();

dateFilter = (d: Date | null): boolean => {
  if (!d) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateOnly = new Date(d);
  dateOnly.setHours(0, 0, 0, 0);

  const dateStr = dateOnly.toDateString();
  const times = this.bookedDatesTimes[dateStr] || [];

  // Отключаем прошедшие даты и даты, где нет свободного времени
  return dateOnly >= today && times.length < this.allTimeOptions.length;
};


}


