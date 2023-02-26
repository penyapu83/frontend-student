import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {
  @Output() selectedMenu:EventEmitter<any> =new EventEmitter<any>();
  
  menus:any=[
    {title:"Student Profile",path:"/admin/user-profile",icon:""},
   
  ]
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  clickMenu(seleced:any){
    // this.router.navigate([seleced.path]);
    this.selectedMenu.emit(seleced);
  }

}
