import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/access/Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router:Router, private service: UserService) {}

  respdata:any

  ngOnInit(): void {
    
  }

  RedirectLogin(){
    this.router.navigate(['login'])
  }

  reactiveform=new FormGroup({
    username: new FormControl('', Validators.required ),
    password: new FormControl('', Validators.required)
  });

  SaveUser(){
    if(this.reactiveform.valid){
      this.service.Registeration(this.reactiveform.value).subscribe(item=>{
        this.respdata= item
        console.log(this.respdata)
        if(this.respdata.id !==null){
          this.RedirectLogin();

        }else{
          alert('failed')
        }
      });

  }
}
}
