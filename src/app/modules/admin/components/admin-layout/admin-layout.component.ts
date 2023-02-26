import { Component, OnInit,Input } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  selectedMenu:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  selectedmenu(event:any){
    console.log(event);
    this.selectedMenu = event;
    this.router.navigate([this.selectedMenu.path]);
  }

}
