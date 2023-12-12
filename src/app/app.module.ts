import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { SearchComponent } from './search/search.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchNewsPipe } from './pipes/search-news.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    StoryDetailsComponent,
    SearchComponent,
    SearchNewsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
