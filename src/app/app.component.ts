import { users } from './author.model';
import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  titles = ['pratice-angular', 'react'];
  authors = users;
  isCheck = true;
  currentIndex = 0;
  showTab4 = true;
  currentDate = new Date();

  intervals = interval(1000);

  address = {
    address1: '123 dang',
    address2: '456 dang',
    city: 'hcm',
  };

  users = [
    {
      name: 'Dang Linh',
      age: 22,
    },
    {
      name: 'Nguyen Vu',
      age: 18,
    },
  ];

  addUser() {
    this.users = [...this.users, { name: 'newUser', age: 20 }];
  }
}
