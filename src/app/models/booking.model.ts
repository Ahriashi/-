export interface Booking {
  id: number;
  title: string;      // Название события (например, "Занятие по вождению")
  date: string;       // Дата и время в ISO формате, например "2025-06-01T14:00:00"
  location?: string;  // Место (необязательно)
  description?: string;
}
