import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'app_user';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
      if (typeof window !== 'undefined' && localStorage) {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const storedUser = localStorage.getItem(this.userKey);
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
      }
    }
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
  getUserRole(): 'student' | 'teacher' {
  return this.userSubject.value?.role || 'student';
  }
logout() {
  localStorage.removeItem('user');
  this.userSubject.next(null);
}

  updateUser(user: User) {
  this.userSubject.next(user);
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}


  updateAvatar(avatarUrl: string) {
    const user = this.userSubject.value;
    if (user) {
      const updatedUser: User = { ...user, avatarUrl };
      this.updateUser(updatedUser);
    }
  }

  updateName(name: string) {
    const user = this.userSubject.value;
    if (user) {
      const updatedUser: User = { ...user, name };
      this.updateUser(updatedUser);
    }
  }
}
