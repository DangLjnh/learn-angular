import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from '../author.model';

@Component({
  selector: 'app-author-child',
  template: `
    <div>
      <span>{{ author.firstName }} {{ author.lastName }}</span>
      <button (click)="select.emit(author)">Select</button>
      <button (click)="delete.emit(author.id)">Delete</button>
    </div>
  `,
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorChildComponent implements OnInit {
  @Input() author!: Author;
  @Output() select = new EventEmitter<Author>();
  @Output() delete = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
