import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    avatarUrl: '',
    phone: '',
    role: 'student' 
  };

  selectedFile: File | null = null;
  avatarPreview: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const currentUser = this.userService.getUser();
    if (currentUser) {
      this.user = { ...currentUser };
      this.avatarPreview = currentUser.avatarUrl || null;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.avatarPreview) {
      this.user.avatarUrl = this.avatarPreview;
    }
    this.userService.updateUser(this.user);
    alert('Профиль обновлён!');
  }
}

