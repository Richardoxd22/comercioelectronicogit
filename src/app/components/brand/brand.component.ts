import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { BrandDto } from 'src/app/models/models';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands:Array<BrandDto>=[];
  selectedBrand:any;
  formulario!: FormGroup;
  constructor(private brandService:BrandService,
    private modalService:NgbModal,
    private formBuilder: FormBuilder,
    )  { }

  ngOnInit(): void {
     this.brandService.getBrands(new GlobalParams()).subscribe(
      data => this.brands=data
    );
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjNmZmUwNGJkLWYyNWQtNDE3MC1hYzNjLTQ0MzQ5NjM2NWNiNCIsImlhdCI6IjA0LWFnby4tMjIgNDozMToxNCBQTSIsIlVzZXJOYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1OTYzMTI3NCwiaXNzIjoiQ3Vyc28tTmV0LUJhc2ljbyIsImF1ZCI6IkFwaS1DdXJzbyJ9.4WzSXDgeJhRb90ljJdVn5s96V7gr2fHjRGpzOEiqdHE')
  }
  editBrand(code:number ,content:any){
    this.brandService.getBrandsById(code).subscribe(
      response=> {
        this.selectedBrand = response;
        console.log(this.selectedBrand);
        this.buildForm();
        this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'})        
      }
    );        
  }

  createBrand(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.brandService.createBrand(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );

  }

  buildForm(){
    this.formulario =this.formBuilder.group({
      code:[{value: this.selectedBrand.code, disabled: false}, [Validators.required, Validators.maxLength(4)]],
      // code:[this.selectedBrand.code,[Validators.required,Validators.maxLength(4)]],
      description:[this.selectedBrand.description,[ Validators.required, Validators.pattern(/^[a-zA-Z0-9-_\s]+$/)]],      
    });
  }

  updateBrand(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.brandService.updateBrand(this.formulario.value).subscribe(
      response=> console.log(response)      
    );
  }
  deleteBrand(brandId: number, content :any){
    if(this.formulario.invalid){
      return;
    }
    
    console.log(this.formulario.value);
    this.brandService.deleteBrand(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );
  }
  
}
