import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  
  @Input() nombre:string="";
  @Input() apellido:string="";
  @Output() saludar:EventEmitter<string>= new EventEmitter();
  numeros:any=[];

  brand:any[]=[]
  cart:any[] = []

  listaNombres:Array<string>=[];
  inputName:string='';
  
  

  constructor(private http:HttpClient){
    // this.nombre='Richard';

    this.numeros=[1,2,3]
  }

  onNombreClic(){
    this.saludar.emit("Estamos viendo el binding de eventos ");
  }

  agregarNombre(){
    this.listaNombres.push(this.inputName);
    this.inputName="";
    console.log(this.listaNombres);
  }

  actualizarInputName(event:any){
    this.inputName=event.target.value;
  }
  ngOnInit(): void {
    this.http.get('https://localhost:44316/api/Brand')
    .subscribe((response:any)=>{
      console.log(response);
      this.brand=response      
    })

    this.http.get('https://localhost:44316/api/Cart')
    .subscribe((response:any)=>{
      console.log(response);
      this.cart=response      
    })
  }

}
