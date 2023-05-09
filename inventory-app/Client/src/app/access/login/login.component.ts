import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/Material-Module';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  constructor(private service:UserService, private route:Router) {}
  ngOnInit(): void {
    
  }



  ProceedLogin(logindata:any){
    if(logindata.valid){
      this.service.ProceedLogin(logindata.value).subscribe(Response => {
        if(Response != null){
          localStorage.setItem("token", Response.authorities[0].authority);
          this.route.navigate(['manufacturer']);
        }

      });

    }
  }

  RedirectRegister(){
    this.route.navigate(['access/register']);

  }

}
