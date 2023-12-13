import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListComponent } from './story-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsService } from '../news-service/news.service';
import { SearchNewsPipe } from '../pipes/search-news.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { News } from '../news.model';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let newsService: NewsService;
  

  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      declarations: [ StoryListComponent, SearchNewsPipe ],
      imports: [HttpClientTestingModule,NgxPaginationModule,ReactiveFormsModule, FormsModule],
      providers: [
        { provide: NewsService,  useValue: {
          getNewestStories: () => of([])
        } 
      }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService) as jasmine.SpyObj<NewsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    //component.totalItems = 0;
    expect(component.currentPage).toEqual(1);
    expect(component.itemsPerPage).toEqual(50);
    expect(component.totalItems).toEqual(0);
    expect(component.tableSize).toEqual([50, 100, 150, 200]);
    expect(component.news).toEqual([]);
    expect(component.searchString).toEqual('');
    expect(component.pagingConfig).toEqual({
      itemsPerPage: component.itemsPerPage,
      currentPage: component.currentPage,
      totalItems: component.totalItems
    });
    expect(component.stories).toEqual([]);
  });

  it('should fetch news on initialization', () => {
    const newsResponse: News [] = [{ id: 1, title: 'Sample News 1', url :"" }, { id: 2, title: 'Sample News 2', url : "" }];
    spyOn(newsService, 'getNewestStories').and.returnValue(of(newsResponse)); // Spy on the getNews method
    component.ngOnInit();
    expect(newsService.getNewestStories).toHaveBeenCalled();
    expect(component.stories).toEqual(newsResponse);
    expect(component.pagingConfig.totalItems).toEqual(newsResponse.length);
  });

  it('should update current page and fetch news', () => {
    const currentPage = 2;
    spyOn(newsService, 'getNewestStories').and.returnValue(of([]));
    component.onTableDataChange(currentPage);
    expect(component.pagingConfig.currentPage).toEqual(currentPage);
    expect(newsService.getNewestStories).toHaveBeenCalled();
  });

  
  it('should update items per page and fetch news', () => {
    const event = { target: { value: 10 } };
    spyOn(newsService, 'getNewestStories').and.returnValue(of([]));
    component.onTableSizeChange(event);
    expect(component.pagingConfig.itemsPerPage).toEqual(event.target.value);
    expect(component.pagingConfig.currentPage).toEqual(1);
    expect(newsService.getNewestStories).toHaveBeenCalled();
  });
  
});
