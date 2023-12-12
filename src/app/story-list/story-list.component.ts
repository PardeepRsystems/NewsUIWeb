import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news-service/news.service';
import { PagingConfig } from 'src/paging-config.model';
import { News } from '../news.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, PagingConfig  {

  currentPage:number  = 1;
  itemsPerPage: number = 50;
  totalItems: number = 0;
  tableSize: number[] = [5, 10, 15, 20];
  news = new Array<News>();

  searchString = '';

  pagingConfig: PagingConfig = {} as PagingConfig;

  stories: any[] = [];

  constructor(private newsService: NewsService) { 

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

  getNews(){
    this.newsService.getNewestStories()
    .subscribe(res=> {
      this.stories = res;
      this.pagingConfig.totalItems = res.length;
    });
  }


  ngOnInit(): void {
    this.getNews();
  }

  onTableDataChange(event:any){
    this.pagingConfig.currentPage  = event;
     this.getNews();
  }
  onTableSizeChange(event:any): void {
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
    this.getNews();
  }

}
