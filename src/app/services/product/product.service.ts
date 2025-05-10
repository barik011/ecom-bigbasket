import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import constants from 'constants';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllCategories_Ser(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY);
  }
  getAllProducts_Ser(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCTS);
  }
  addProduct_Ser(prod:any){
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT,prod);
  }
}
