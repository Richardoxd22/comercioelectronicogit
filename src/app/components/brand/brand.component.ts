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
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyaWNoIiwianRpIjoiYWE0NWI1ZTEtYzRiOS00MjMwLTliNzUtZjdkMDhlMTQyMGZlIiwiaWF0IjoiMDQtYWdvLi0yMiAxMDo0Nzo0MiBQTSIsIlVzZXJOYW1lIjoicmljaCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjU5NjUzODYyLCJpc3MiOiJDdXJzby1OZXQtQmFzaWNvIiwiYXVkIjoiQXBpLUN1cnNvIn0.9nHCuQRjEStM6gg2dLOyAGpj4ryutwvlZHQMb5qNPW8')
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
 
  deleteBrand(code: number, content :any){
    if(this.formulario.invalid){
      return;
    }    
    this.brandService.getBrandsById(code).subscribe(
      response=> {
        this.selectedBrand = response;
        console.log(this.selectedBrand);
        this.buildForm();
        this.brandService.deleteBrand(this.formulario.value).subscribe(
        response=>console.log(response)      
        );
      }
    );    

    
      
    
    // console.log(this.formulario.value);
    // this.brandService.deleteBrand(this.formulario.value).subscribe(
    //   response=>console.log(response)      
    // );
  }


  Delete(code:number){
    this.brandService.DeleteBrandById(code).subscribe(item=>{
      console.log(item);
      if(item){
        window.location.reload();
      }
    });
  }
  


  
}
