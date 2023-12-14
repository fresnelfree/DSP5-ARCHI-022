import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { RoleService } from 'src/app/core/services/role/role.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-auth-social-media',
  templateUrl: './auth-social-media.component.html',
  styleUrls: ['./auth-social-media.component.css']
})
export class AuthSocialMediaComponent {

  // private token: string = this.activatedRoute.snapshot.params['token'];
  constructor(
    private router : Router,
    private tokenService : TokenService,
    private roleSErvice : RoleService,
    private userService : UserService,
    private activatedRoute : ActivatedRoute,
  ){
    // console.log('token : ', this.activatedRoute.snapshot.params['token'])

  }

  ngOnInit(): void {
    this.tokenService.setItem('token',this.activatedRoute.snapshot.params['token']);
    const email = this.getTokenEmail()
      console.log('email : ',email)
    // this.userService.getUserByEmail(this.userService.getTokenEmail()).subscribe(
    //   res => {
    //     // this.user = res
    //     // console.log('user : ',res)
    //     this.tokenService.setItem('user',JSON.stringify(res))
    //     this.tokenService.setItem('role3',"Client");
    //     this.router.navigate(['/client']).then(() => {
    //     });
    //   }
    // )//Fin subscribe
  }

  getTokenEmail():any{
    const token = this.tokenService.getItem('token')
    const obj:any = jwt_decode<JwtPayload>(token)
    console.log('val obj : ',obj)
    return obj.email
  }

}
