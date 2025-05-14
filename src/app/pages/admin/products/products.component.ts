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

  isSidePanelVisible:boolean=false;
  categoryList:any[]=[];
  productList:any[]=[];

  imgUrl:string='/assets/user1.jpg'


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
    this.prodServ.addProduct_Ser(this.productObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.productList = res.data;
          alert("Product Successfully Added!");
          this.getAllProduct(); // Refresh product list
        } else {
          alert(res.message); // Show API response error
        }
      },
      error: (err) => {
        console.error("API Error:", err);
        alert("Failed to add product. Please try again!");
      }     
    })
  }
  onEdit(prod:any){
    this.productObj = prod;
    this.openSidePanel();
  }

  updateProduct(){
    debugger;
    this.prodServ.updateProduct_Ser(this.productObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.productList = res.data;
          alert("Product Successfully Updated!");
          this.getAllProduct(); // Refresh product list
        } else {
          alert(res.message); // Show API response error
        }
      },
      error: (err) => {
        console.error("API Error:", err);
        alert("Failed to Updated product. Please try again!");
      }     
    })
  }

  

}
