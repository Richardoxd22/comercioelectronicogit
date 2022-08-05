import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from 'src/app/models/constanst';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  endpoint:string='';
  selectedLogin:any;

  userName:string="";
  password:string="";
  token:string="";

  public formulariologin !:FormGroup
  constructor(private formBuilder: FormBuilder, 
    private http:HttpClient,
    private router:Router,
    private loginService:LoginService,
    private rute:ActivatedRoute,
    @Inject(BASE_URL) endpoint:string) {
      this.endpoint=endpoint
     }
  
  
  ngOnInit(): void {
    // this.formulariologin = this.formBuilder.group({
    //   userName:['',Validators.required],
    //   password:['',Validators.required]
    // })
    
  }

  Registrarse(){
    this.rute.params.subscribe(param=>{
      let option = param['option'];
      this.loginService.Registro(this.userName,this.password).subscribe(item=>{
        console.log(item.token)
        this.token=item.token;
        localStorage.setItem('token',this.token)
        if(option==1){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/carro-compras']);
        }
      })
    })
    
  }

  

  // AcessLogin(){
  //   let apiUrlLog = `${this.endpoint}/api/Token`;
  //   this.http.get<any>(apiUrlLog)
  //   .subscribe(res=>{
  //     const user = res.find((a:any)=>{
  //       return a.userName ===this.formulariologin.value.userName  && a.password ===this.formulariologin.value.password 
  //     });
  //     if(user){
  //       alert("Login Success");
  //       this.formulariologin.reset();
  //       this.router.navigate(['/'])
  //     }else{
  //       alert("Usuario no encontrado o contraseña incorrecta")
  //       console.log("No encuentra");
        
  //     }
    
  //   })
  // }

}
