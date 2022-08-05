import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
import { CartDto } from 'src/app/models/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts:Array<CartDto>=[];
  selectedCart:any;
  formulario!: FormGroup;
  constructor(private cartService:CartService,
    private modalService:NgbModal,
    private formBuilder: FormBuilder,
    )  { }

  ngOnInit(): void {
     this.cartService.getCarts(new GlobalParams()).subscribe(
      data => this.carts=data
    );
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjNmZmUwNGJkLWYyNWQtNDE3MC1hYzNjLTQ0MzQ5NjM2NWNiNCIsImlhdCI6IjA0LWFnby4tMjIgNDozMToxNCBQTSIsIlVzZXJOYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1OTYzMTI3NCwiaXNzIjoiQ3Vyc28tTmV0LUJhc2ljbyIsImF1ZCI6IkFwaS1DdXJzbyJ9.4WzSXDgeJhRb90ljJdVn5s96V7gr2fHjRGpzOEiqdHE')
  }
  editCart(id:string ,content:any){
    this.cartService.getCartsById(id).subscribe(
      response=> {
        this.selectedCart = response;
        console.log(this.selectedCart);
        this.buildForm();
        this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'})        
      }
    );        
  }

  createCart(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.cartService.createCart(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );

  }

  buildForm(){
    this.formulario =this.formBuilder.group({
      id:[{value: this.selectedCart.id, disabled: false}, [Validators.required, Validators.maxLength(4)]],      
      productId:[this.selectedCart.productId,[ Validators.required]],      
      deliveryModeId:[this.selectedCart.deliveryModeId,[ Validators.required]],            
      price:[this.selectedCart.price,[ Validators.required]],      
      cantProduct:[this.selectedCart.cantProduct,[ Validators.required]],      
      name:[this.selectedCart.name,[ Validators.required]],      
      cartResult:[this.selectedCart.cartResult,[ Validators.required]],      
      cantStock:[this.selectedCart.cantStock,[ Validators.required]],      
      stock:[this.selectedCart.stock,[ Validators.required]],      
    });
  }

  updateCart(content:any){
    if(this.formulario.invalid){
      return;
    }
    console.log(this.formulario.value);
    this.cartService.updateCart(this.formulario.value).subscribe(
      response=> console.log(response)      
    );
  }
  deleteCart(cartId: number, content :any){
    if(this.formulario.invalid){
      return;
    }
    
    console.log(this.formulario.value);
    this.cartService.deleteCart(this.formulario.value).subscribe(
      response=>console.log(response)
      
    );
  }
  
}
