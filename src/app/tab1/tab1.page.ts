import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tab2Page } from '../tab2/tab2.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  constructor( private  router:  Router) {

  }

  public login(form)
  {
    console.log(this.router.getCurrentNavigation())
    this.router.navigateByUrl("home");
    console.log('hit')
  }
  ngOnInit() {
  }

}
