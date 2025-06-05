import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: []
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  role: 'student' | 'teacher' = 'student';
  teacherKey: string = '';

  // твой собственный ключ преподавателя
  private readonly VALID_TEACHER_KEY = 'SECRET123';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.name || !this.email) {
      alert('Введите имя и email');
      return;
    }

    if (this.role === 'teacher' && this.teacherKey !== this.VALID_TEACHER_KEY) {
      alert('Неверный ключ преподавателя');
      return;
    }

    const user: User = {
      id: Date.now(),
      name: this.name,
      email: this.email,
      role: this.role,
      avatarUrl: '',
    };

    this.userService.setUser(user);
    this.router.navigate(['/dashboard']);
  }
}
