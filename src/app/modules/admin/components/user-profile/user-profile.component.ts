import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
   loader:boolean = false;
   list:any[] = []; 
   isForm:boolean=false;
   form: FormGroup;
   selected:any;
   courselist:any[] = []; 
   courseId:number;

  constructor(private profileService:ProfileService,private authService:AuthService,private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listUser();
    this.listCourse();
  }

  initializeLoginForm() {
    this.form = new FormGroup({
      fullname: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      age: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      matricNo: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),

      course: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
    });
  }

 
  listUser(){
    this.loader = true;
    this.profileService.getProfileList().subscribe({
      next: (resp) => {
        this.loader = false;
        if(resp != null){
          this.list = resp;
        }
        this.ref.detectChanges();
      },error: (error) => {
        this.loader = false;
      }
  });
  }

  listCourse(){
    this.loader = true;
    this.profileService.getCourseList().subscribe({
      next: (resp) => {
        console.log(resp);
        this.loader = false;
        if(resp !=null){
          this.courselist = resp;
        }
        this.ref.detectChanges();
      },error: (error) => {
        this.loader = false;
      }
  });
  }

  changeCourse(event: Event): string {

    if((event.target as HTMLInputElement).value == '0'){
      this.listUser();
    }else{
      this.courseId = Number((event.target as HTMLInputElement).value);
      this.listUserByCourseId(this.courseId);
      
    }
    return (event.target as HTMLInputElement).value;   
    
  }

  listUserByCourseId(i:any){
    this.loader = true;
    this.profileService.getProfileListByCourseId(i).subscribe({
      next: (resp) => {
        console.log(resp);
        this.loader = false;
        if(resp !=null){
          this.list = resp;
        }
        this.ref.detectChanges();
      },error: (error) => {
        this.loader = false;
      }
  });
  }

  submit(){
    this.loader = true;
    let param = {
      name : this.form.value.fullname,
      age : this.form.value.age,      
      matricNo:this.form.value.matricNo,
      courseId:this.form.value.course
    }

    if(this.selected){ //update
      this.profileService.update(param,this.selected.id).subscribe({
        next: (resp) => {
          this.loader = false;
          if(resp !=null){
            this.msgAlert("Successfully update profile","Success","success")
          }
          this.ref.detectChanges();
          console.log(this.list);
        },error: (error) => {
          this.loader = false;
        }
    });
    }else{ //add
      this.profileService.saveProfile(param).subscribe({
          next: (resp) => {
            this.loader = false;
            if(resp != null){
              this.msgAlert("Successfully add student","Success","success")
            }
            this.ref.detectChanges();
            console.log(this.list);
          },error: (error) => {
            this.loader = false;
          }
      });
    }
   
  }

  msgAlert(msg:string,title:string,type:any){
    Swal.fire({
      title: title,
      text: msg,
      icon: type,
      // showCancelButton: true,
      confirmButtonColor: '#66c7c6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(type =="success"){
        this.cancel();

      }
    })
  }

  edit(i:any){
    this.initializeLoginForm();
    this.isForm = true;
    this.loader = true;
    this.profileService.getProfile(i.id).subscribe({
      next: (resp) => {
        this.loader = false;

        console.log(resp);
        if(resp !=null){
          this.selected = resp;
          this.form.setValue({
            fullname: resp.name,
            age: resp.age,
            matricNo:resp.matricNo,
            course:resp.course.id
          });
        }
        this.ref.detectChanges();
      },error: (error) => {
        this.loader = false;
      }
  });
  }

  delete(id:number){
    this.loader = true;
    this.profileService.delete(id).subscribe({
      next: (resp) => {
        this.loader = false;
        if(resp.statusCode == 200){
          this.msgAlert("Successfully delete profile","Success","success")
        }
        this.ref.detectChanges();
      },error: (error) => {
        this.loader = false;
      }
  });
  }

  add(){
    this.initializeLoginForm();
    this.isForm = true;
    this.listCourse();
    
  }

  cancel(){
    this.isForm = false;
    this.listUser();
    this.listCourse();
  }

}
