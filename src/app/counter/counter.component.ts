import { Component, OnInit } from '@angular/core';
let _count = 1;
@Component({
  selector: 'app-counter',
  template: ` count: {{ count }} `,
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  count = _count++;
  constructor() {}

  ngOnInit(): void {}
}
