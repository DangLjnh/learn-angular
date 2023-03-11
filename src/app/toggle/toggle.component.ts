import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  @Input() checked!: boolean;
  @Output() checkedChange = new EventEmitter<boolean>();
  toggle() {
    this.checked = !this.checked;
  }
  constructor() {}

  ngOnInit(): void {}
}
