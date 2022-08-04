import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands:any[]=[];
  selectedBrand:any;
  formulario!: FormGroup;
  constructor(private brandService:BrandService,
    private modalService:NgbModal,
    private formBuilder: FormBuilder)  { }

  ngOnInit(): void {
     this.brandService.getBrands(new GlobalParams()).subscribe(response => {
      this.brands=response;
    });
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjhiNjQzNTU4LWQ1OTItNDYxNy04ODI0LTQ2M2IyYWQ0NzBmMSIsImlhdCI6IjA0LWFnby4tMjIgMzoxMDoyMSBBTSIsIlVzZXJOYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1OTU4MzIyMSwiaXNzIjoiQ3Vyc28tTmV0LUJhc2ljbyIsImF1ZCI6IkFwaS1DdXJzbyJ9.tBhH6-7SdnDnJRPEeAYz2PG8PXf7YghwmPGhcuJSdxs')
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
      code:[{value: this.selectedBrand.code, disabled: true}, [Validators.required, Validators.maxLength(4)]],
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
}
