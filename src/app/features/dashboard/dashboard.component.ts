import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookingService } from '../../services/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { Booking } from '../../models/booking.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'; 
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SpeedometerComponent } from '../../components/speedometer/speedometer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgCircleProgressModule, SpeedometerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  userName: string = 'Гость';
  userAvatarUrl: string = '';
  drivingProgress = 0;  // в процентах
  theoryProgress = 0;
  userId: number | null = null;
  userGroup: string | null = null;
  isTeacher = false;

  // Добавляем поле для ближайших бронирований
  bookings: Booking[] = [];

  // Добавляем BookingService в конструктор
  constructor(
    private userService: UserService,
    private bookingService: BookingService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const user = this.userService.getUser();
    if (user) {
      this.userName = user.name;
      this.userAvatarUrl = user.avatarUrl || '';
      this.userId = user.id ?? null;
      this.userGroup = user.group ?? null;
      this.drivingProgress = 40;
      this.theoryProgress = 70;
      this.isTeacher = user.role === 'teacher';
      if (user.role === 'teacher') {
      // показать доступ к расписанию, созданию лекций и т.д.
      } else {
      // студент — показать только своё расписание
      }
    }

     this.loadBookings();
}

  openCancelDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Вы уверены, что хотите отменить бронь?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelBooking(id); // вызываем твой существующий метод
      }
    });
  }
loadBookings() {
  const all = this.bookingService.getBookings();
  const now = new Date();
  this.bookings = all
    .filter(b => new Date(b.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // только ближайшие 3
}

cancelBooking(id: number) {
  const confirmed = confirm('Вы уверены, что хотите отменить занятие?');
  if (confirmed) {
    this.bookingService.removeBooking(id);
    this.loadBookings();
  }
}
logout() {
  this.userService.logout(); // реализуем ниже
  this.router.navigate(['/login']);
}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToSchedule() {
    this.router.navigate(['/schedule']);
  }

  goToTickets() {
    this.router.navigate(['/tickets']);
  }
  goToBooking() {
  this.router.navigate(['/booking']);
}
goToScheduleAdmin() {
  this.router.navigate(['/schedule-admin']);
}

}
