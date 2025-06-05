import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private storageKey = 'bookings';

  constructor() {}

  // Получить все бронирования из localStorage
getBookings(): Booking[] {
  if (typeof window !== 'undefined' && localStorage) {
    const data = localStorage.getItem('bookings');
    return data ? JSON.parse(data) : [];
  }
  return [];
}

  // Добавить новое бронирование
  addBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.push(booking);
    localStorage.setItem(this.storageKey, JSON.stringify(bookings));
  }
removeBooking(id: number) {
  const current = this.getBookings();
  const updated = current.filter(b => b.id !== id);
  localStorage.setItem('bookings', JSON.stringify(updated));
}

  // Получить ближайшие события (например, ближайшие 5 по дате)
  getUpcomingBookings(limit = 5): Booking[] {
    const now = new Date();
    const bookings = this.getBookings();
    const upcoming = bookings
      .filter(b => new Date(b.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return upcoming.slice(0, limit);
  }
}
