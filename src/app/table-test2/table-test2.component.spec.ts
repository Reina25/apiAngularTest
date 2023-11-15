import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTest2Component } from './table-test2.component';

describe('TableTest2Component', () => {
  let component: TableTest2Component;
  let fixture: ComponentFixture<TableTest2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTest2Component]
    });
    fixture = TestBed.createComponent(TableTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
