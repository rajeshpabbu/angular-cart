import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoLoaderComponent } from './todo-loader.component';

describe('TodoLoaderComponent', () => {
  let component: TodoLoaderComponent;
  let fixture: ComponentFixture<TodoLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
