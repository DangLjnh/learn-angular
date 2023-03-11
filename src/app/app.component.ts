import { users } from './author.model';
import { Component } from '@angular/core';

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
}
