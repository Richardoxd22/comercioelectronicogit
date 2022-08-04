import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { ProductDto } from 'src/app/models/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products:Array<ProductDto>=[];
  selectedProduct:any;
  formulario!: FormGroup;
  constructor(private productService:ProductService,
    private modalService:NgbModal,
    private formBuilder: FormBuilder,
    )  { }

  ngOnInit(): void {
     this.productService.getProducts(new GlobalParams()).subscribe(
      data => this.products=data
    );
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6ImRhOGIwNGVjLWEwYmItNGNiNS1iMzIxLTY1ZmUyOGUyNDhmZiIsImlhdCI6IjA0LWFnby4tMjIgNDo1Mjo0MCBQTSIsIlVzZXJOYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1OTYzMjU2MCwiaXNzIjoiQ3Vyc28tTmV0LUJhc2ljbyIsImF1ZCI6IkFwaS1DdXJzbyJ9.dnutuYay89CjxVkILM0IDaGWZdboklKpKvMxzqMdG6c')
  }
  editProduct(id:string ,content:any){
    this.productService.getProductById(id).subscribe(
      response=> {
        this.selectedProduct = response;
        console.log(this.selectedProduct);
        this.buildForm();
        this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'})        
      }
    );        
  }

  createProduct(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.productService.createProduct(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );

  }

  buildForm(){
    this.formulario =this.formBuilder.group({
      id:[{value: this.selectedProduct.id, disabled: false}, [Validators.required]],      
      name:[{value: this.selectedProduct.name, disabled: false}, [Validators.required]],      
      description:[this.selectedProduct.description,[ Validators.required, Validators.pattern(/^[a-zA-Z0-9-_\s]+$/)]],
      price:[{value: this.selectedProduct.price, disabled: false}, [Validators.required]],      
      productType:[{value: this.selectedProduct.productType, disabled: false}, [Validators.required]],      
      brand:[{value: this.selectedProduct.brand, disabled: false}, [Validators.required]],      
      numStock:[{value: this.selectedProduct.numStock, disabled: false}, [Validators.required]],      
            
    });
  }

  updateProduct(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.productService.updateProduct(this.formulario.value).subscribe(
      response=> console.log(response)      
    );
  }
  deleteProduct(brandId: number, content :any){
    if(this.formulario.invalid){
      return;
    }
    
    console.log(this.formulario.value);
    this.productService.deleteProduct(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );
  }
  
}
