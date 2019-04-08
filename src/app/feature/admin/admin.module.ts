import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, UserProfileComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
