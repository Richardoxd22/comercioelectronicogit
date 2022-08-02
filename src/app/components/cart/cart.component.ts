import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
carts:any[]=[];
selectCart:any;
formularioCart!:FormGroup;
  constructor(private cartServices:CartService) { }

  ngOnInit(): void {
  }

}
