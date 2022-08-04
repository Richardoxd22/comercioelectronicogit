import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { ProductTypeDTO } from 'src/app/models/models';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  producttypes:Array<ProductTypeDTO>=[];
  selectedproducttype:any;
  formulario!: FormGroup;
  constructor(private producttypeService:ProductTypeService,
    private modalService:NgbModal,
    private formBuilder: FormBuilder,
    )  { }

  ngOnInit(): void {
     this.producttypeService.getproducttypes(new GlobalParams()).subscribe(
      data => this.producttypes=data
    );
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjNmZmUwNGJkLWYyNWQtNDE3MC1hYzNjLTQ0MzQ5NjM2NWNiNCIsImlhdCI6IjA0LWFnby4tMjIgNDozMToxNCBQTSIsIlVzZXJOYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1OTYzMTI3NCwiaXNzIjoiQ3Vyc28tTmV0LUJhc2ljbyIsImF1ZCI6IkFwaS1DdXJzbyJ9.4WzSXDgeJhRb90ljJdVn5s96V7gr2fHjRGpzOEiqdHE')
  }
  editproducttype(code:number ,content:any){
    this.producttypeService.getproducttypesById(code).subscribe(
      response=> {
        this.selectedproducttype = response;
        console.log(this.selectedproducttype);
        this.buildForm();
        this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'})        
      }
    );        
  }

  createproducttype(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.producttypeService.createproducttype(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );

  }

  buildForm(){
    this.formulario =this.formBuilder.group({
      code:[{value: this.selectedproducttype.code, disabled: false}, [Validators.required, Validators.maxLength(4)]],
      // code:[this.selectedproducttype.code,[Validators.required,Validators.maxLength(4)]],
      description:[this.selectedproducttype.description,[ Validators.required, Validators.pattern(/^[a-zA-Z0-9-_\s]+$/)]],      
    });
  }

  updateproducttype(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.producttypeService.updateproducttype(this.formulario.value).subscribe(
      response=> console.log(response)      
    );
  }
  deleteproducttype(brandId: number, content :any){
    if(this.formulario.invalid){
      return;
    }
    
    console.log(this.formulario.value);
    this.producttypeService.deleteproducttype(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );
  }
  
}
