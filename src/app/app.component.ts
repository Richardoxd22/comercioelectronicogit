import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ComercioElectronicoF';
  name:string ='Jose Luis';
  lastname:string= 'patron';
  respuesta:string ='';

  constructor(private router:Router){

  }

  redirectToInicio(){
    this.router.navigate(['/home'])
  }
  onSaludar(mensaje:string){
    console.log(mensaje);
    
  }
}
