import { Routes } from '@angular/router';
import { QuestionListComponent } from './features/questions/question-list.component';
import { QuestionViewComponent } from './features/questions/question-view.component';
import { ProfileComponent } from './features/profile/profile.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BookingComponent } from './pages/booking.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent },  // главная страница по умолчанию
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionListComponent },
  { path: 'questions/:id', component: QuestionViewComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'booking', component: BookingComponent },
  {path: 'schedule',
  loadComponent: () => import('./components/schedule/schedule.component').then(m => m.ScheduleComponent)}
];
