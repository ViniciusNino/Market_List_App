import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListarItensPage } from './listar-itens.page';

describe('ListarItensPage', () => {
  let component: ListarItensPage;
  let fixture: ComponentFixture<ListarItensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarItensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarItensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
