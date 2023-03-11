import { users } from './../author.model';
import { Component, Input, OnInit } from '@angular/core';
import { Author } from '../author.model';

@Component({
  selector: 'app-author-list',
  template: `
    <app-author-child
      *ngFor="let author of authors"
      [author]="author"
      (select)="onSelected($event)"
      (delete)="onDelete($event)"
    ></app-author-child>
    <br />
    <div class="">
      Current selected: {{ currentAuthor?.firstName }}
      {{ currentAuthor?.lastName }}
    </div>
  `,
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authors = users;
  currentAuthor = this.authors[0];
  constructor() {}
  onSelected(selectedAuthor: Author) {
    this.currentAuthor = selectedAuthor;
  }
  onDelete(id: number) {
    this.authors = this.authors.filter((item) => {
      return item.id !== id;
    });
    if (this.currentAuthor.id === id) {
      this.currentAuthor = this.authors[0];
    }
  }
  ngOnInit(): void {}
}
