import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

user :any = null ;
  constructor(private service : AuthService){}
  ngOnInit(): void {
    // ** To update the user data connected 
    this.service.user.subscribe( (res : any) => {
      if (res.role){
        this.user = res ;
      }

    })

  }
  logout(){
    // ** if he logout then hide the username in navbar
    const model = {}
    this.service.login(model).subscribe(res =>{
      this.user = null ;
      this.service.user.next(res);

    })
  }

}
