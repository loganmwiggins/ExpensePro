import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTablesComponent } from './expense-tables.component';

describe('ExpenseTablesComponent', () => {
  let component: ExpenseTablesComponent;
  let fixture: ComponentFixture<ExpenseTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
