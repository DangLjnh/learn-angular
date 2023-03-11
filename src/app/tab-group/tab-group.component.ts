import { TabPanelComponent } from './../tab-panel/tab-panel.component';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-tab-group',
  template: `
    <ul class="nav">
      <li class="nav-item" *ngFor="let tab of tabPanelList; index as idx">
        <a
          class="nav-link"
          [class.active]="idx === activeIndex"
          (click)="activeIndexChange.emit(idx)"
          aria-current="page"
          href="#"
          >{{ tab.title }}</a
        >
        <button (click)="removeTab(tab)" (click)="activeIndexChange.emit(idx)">
          X
        </button>
      </li>
      <div class="tab-body">
        <ng-container
          *ngTemplateOutlet="tabPanelList[activeIndex].panelBody"
        ></ng-container>
      </div>
    </ul>
  `,
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent implements OnInit {
  tabPanelList: TabPanelComponent[] = [];
  @Input() activeIndex: number = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  @ContentChild(TabPanelComponent) tabPanels!: QueryList<TabPanelComponent>;

  ngAfterContentInit() {
    // console.log(this.tabPanels);
  }

  addTab(tab: TabPanelComponent) {
    this.tabPanelList = [...this.tabPanelList, tab];
  }

  removeTab(tab: TabPanelComponent) {
    let found = -1;
    this.tabPanelList = this.tabPanelList.filter((tp, index) => {
      if (tp === tab) {
        found = index;
        return false;
      }
      return true;
    });

    if (found === this.activeIndex) {
      this.activeIndexChange.emit(
        found === this.tabPanelList.length ? found - 1 : found
      );
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
