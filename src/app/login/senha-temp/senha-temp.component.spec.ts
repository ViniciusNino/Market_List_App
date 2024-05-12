import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SenhaTempComponent } from './senha-temp.component';

describe('SenhaTempComponent', () => {
  let component: SenhaTempComponent;
  let fixture: ComponentFixture<SenhaTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenhaTempComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SenhaTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
