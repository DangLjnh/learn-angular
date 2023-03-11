import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabContentDirective } from './tab-panel.directive';

@Component({
  selector: 'app-tab-panel',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrls: ['./tab-panel.component.scss'],
})
export class TabPanelComponent implements OnInit {
  @Input() title!: string;
  @ViewChild(TemplateRef, { static: true }) implicitBody!: TemplateRef<unknown>;

  @ContentChild(TabContentDirective, { static: true, read: TemplateRef })
  explicitBody!: TemplateRef<unknown>;

  constructor(private tabGroup: TabGroupComponent) {}

  get panelBody(): TemplateRef<unknown> {
    return this.explicitBody || this.implicitBody;
  }

  ngOnInit(): void {
    this.tabGroup.addTab(this);
    console.log(this.explicitBody);
  }
  ngOnDestroy() {
    this.tabGroup.removeTab(this);
  }
}
