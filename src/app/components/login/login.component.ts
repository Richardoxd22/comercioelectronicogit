import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/models/constanst';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  endpoint:string='';
  public formulariologin !:FormGroup
  constructor(private formBuilder: FormBuilder, 
    private http:HttpClient,
    private router:Router,
    @Inject(BASE_URL) endpoint:string) {
      this.endpoint=endpoint
     }
  
  
  ngOnInit(): void {
    this.formulariologin = this.formBuilder.group({
      usuario:[''],
      contrasena:['']
    })
  }
  AcessLogin(){
    let apiUrlLog = `${this.endpoint}/api/Token`;
    this.http.get<any>(apiUrlLog)
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.usuario ===this.formulariologin.value.usuario  && a.contrasena ===this.formulariologin.value.contrasena 
      });
      if(user){
        alert("Login Success");
        this.formulariologin.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("Usuario no encontrado o contraseña incorrecta")
      }
    },error=>{
      alert("Algo anda mal")
    })
  }

}
