import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToggleComponent } from './toggle/toggle.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorChildComponent } from './author-list/author-child.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabBsGroupComponent } from './tab-bs-group/tab-bs-group.component';
import { CounterComponent } from './counter/counter.component';
import { TabContentDirective } from './tab-panel/tab-panel.directive';
import { FormatPipeAddress } from './format-address.pipe';
import { AdultPipe } from './adult.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToggleComponent,
    AuthorListComponent,
    AuthorChildComponent,
    TabGroupComponent,
    TabPanelComponent,
    TabBsGroupComponent,
    CounterComponent,
    TabContentDirective,
    FormatPipeAddress,
    AdultPipe,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
