import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { DeliveryModeDto } from 'src/app/models/models';
import { DeliverymodeService } from 'src/app/services/deliverymode.service';

@Component({
  selector: 'app-deliverymode',
  templateUrl: './deliverymode.component.html',
  styleUrls: ['./deliverymode.component.scss']
})
export class DeliverymodeComponent implements OnInit {
  deliveryModes:Array<DeliveryModeDto>=[];
  selecteddeliveryMode:any;
  formulario!: FormGroup;
  constructor(private deliveryModeService:DeliverymodeService,
    private modalService:NgbModal,
    private formBuilder: FormBuilder,
    )  { }

  ngOnInit(): void {
     this.deliveryModeService.getdeliveryModes(new GlobalParams()).subscribe(
      data => this.deliveryModes=data
    );
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjNmZmUwNGJkLWYyNWQtNDE3MC1hYzNjLTQ0MzQ5NjM2NWNiNCIsImlhdCI6IjA0LWFnby4tMjIgNDozMToxNCBQTSIsIlVzZXJOYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1OTYzMTI3NCwiaXNzIjoiQ3Vyc28tTmV0LUJhc2ljbyIsImF1ZCI6IkFwaS1DdXJzbyJ9.4WzSXDgeJhRb90ljJdVn5s96V7gr2fHjRGpzOEiqdHE')
  }
  editdeliveryMode(id:number ,content:any){
    this.deliveryModeService.getdeliveryModesById(id).subscribe(
      response=> {
        this.selecteddeliveryMode = response;
        console.log(this.selecteddeliveryMode);
        this.buildForm();
        this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'})        
      }
    );        
  }

  createdeliveryMode(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.deliveryModeService.createdeliveryMode(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );

  }

  buildForm(){
    this.formulario =this.formBuilder.group({
      id:[{value: this.selecteddeliveryMode.id, disabled: false}, [Validators.required]],       
      name:[this.selecteddeliveryMode.name,[ Validators.required]],      
      // code:[this.selecteddeliveryMode.code,[Validators.required,Validators.maxLength(4)]],
      description:[this.selecteddeliveryMode.description,[ Validators.required, Validators.pattern(/^[a-zA-Z0-9-_\s]+$/)]],      
    });
  }

  updatedeliveryMode(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.deliveryModeService.updatedeliveryMode(this.formulario.value).subscribe(
      response=> console.log(response)      
    );
  }
  deletedeliveryMode(deliveryModeId: number, content :any){
    if(this.formulario.invalid){
      return;
    }
    
    console.log(this.formulario.value);
    this.deliveryModeService.deletedeliveryMode(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );
  }
  
}
