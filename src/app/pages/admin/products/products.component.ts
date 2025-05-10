import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productObj:any=
  {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "CreatedDate": new Date(),
    "DeliveryTimeSpan": "",
    "CategoryId": 0,
    "ProductImageUrl": "",
    "UserId": 0
  }
  categoryObj:any= {
    "categoryId": 0,
    "categoryName": "",
    "parentCategoryId": 0,
    "userId": null
  }
  isSidePanelVisible:boolean=false;
  categoryList:any[]=[];
  productList:any[]=[];


  constructor( private prodServ:ProductService){}

ngOnInit(): void {
  this.getAllCategory();
  this.getAllProduct()
}
  openSidePanel(){
    this.isSidePanelVisible=true;
  }
  closeSidePanel(){
    this.isSidePanelVisible=false;
  }

  getAllCategory(){
    this.prodServ.getAllCategories_Ser().subscribe((res:any)=>{
      debugger;
      if(res.data){
        this.categoryList= res.data
      }
      else{
        alert("Category API not valid")
      }
      
    })
  }
  getAllProduct(){
    this.prodServ.getAllProducts_Ser().subscribe((res:any)=>{
      if(res.data){
        this.productList= res.data
      }
      else{
        alert(res.message)
      }
      
    })
  }
  saveProduct(){
    debugger;
    this.prodServ.addProduct_Ser(this.productObj).subscribe((res:any)=>{
      if(res.result){
        this.productList=res.data;
        alert("Product Successfully Added!");
        this.getAllProduct();
      }
      else{
        alert(res.message);
      }
      
    })
  }

  

}
