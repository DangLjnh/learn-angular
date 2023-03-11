import { Component, OnInit } from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';

@Component({
  selector: 'app-tab-bs-group',
  template: `
    <ul class="nav nav-pills">
      <li class="nav-item" *ngFor="let tab of tabPanelList; index as idx">
        <a
          class="nav-link"
          href="#"
          [class.active]="idx === activeIndex"
          (click)="activeIndexChange.emit(idx)"
          >{{ tab.title }}</a
        >
        <button (click)="removeTab(tab)">Delete</button>
      </li>
    </ul>

    <div class="tab-body">
      <ng-container
        *ngTemplateOutlet="tabPanelList[activeIndex].panelBody"
      ></ng-container>
    </div>
  `,
  styleUrls: ['./tab-bs-group.component.scss'],
  providers: [
    {
      provide: TabGroupComponent,
      useExisting: TabBsGroupComponent,
    },
  ],
})
export class TabBsGroupComponent extends TabGroupComponent {}
