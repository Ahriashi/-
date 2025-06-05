export interface User {
  id: number;
  name: string;
  avatarUrl?: string; // путь к загруженному изображению (dataURL или ссылка)
  email: string;
  phone?: string;
  group?: string;
  role: 'student' | 'teacher';
}
