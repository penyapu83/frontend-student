import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  isLogin:boolean=false;

  constructor(
    private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      staySignIn: new FormControl(null, {
        updateOn: 'change',
      }),
    });
  }

  login(){
    let param = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(param).subscribe(resp => {
      if(resp == null){
          this.msgAlertError(resp.statusMessage);
      }else{
        localStorage.setItem("token",JSON.stringify(resp));
        this.router.navigate(['/admin']);
      }

    });
  }

  msgAlertError(msg:string){
    Swal.fire({
      title: "Oops",
      text: msg,
      icon: 'warning',
      // showCancelButton: true,
      confirmButtonColor: '#66c7c6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
    })
  }
  

}
