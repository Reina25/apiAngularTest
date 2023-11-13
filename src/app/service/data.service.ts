import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private id: any;
  private name:any;

  setSharedData(data: any) {
    this.id = data;
  }


  getSharedData() {
    return this.id;
  } 

   setSharedDataName(name : any){
    this.name = name;
  }

  getSharedDataName(){
    return this.name;
  }
}
