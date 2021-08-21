import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeSolicitantePage } from './home-solicitante.page';

describe('HomeSolicitantePage', () => {
  let component: HomeSolicitantePage;
  let fixture: ComponentFixture<HomeSolicitantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSolicitantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSolicitantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
