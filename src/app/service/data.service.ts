import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private id: number;
  private name:string;
  private independent: boolean;
  private cca2:string;
  private area: number;
  private population:number;



  setSharedID(id: number) {
    this.id = id;
  }


  getSharedID() {
    return this.id;
  } 

   setSharedDataName(name : string){
    this.name = name;
  }

  getSharedDataName(){
    return this.name;
  }

  setSharedDataIndependent(independent : boolean){
    this.independent = independent;
  }

  getSharedDataIndependent(){
    return this.independent;
  }

  setSharedDataCca2(cca2 : string){
    this.cca2 = cca2;
  }

  getSharedDataCca2(){
    return this.cca2;
  }

  setSharedDataArea(area : number){
    this.area = area;
  }

  getSharedDataArea(){
    return this.area;
  }

  setSharedDataPopulation(population : number){
    this.population = population;
  }

  getSharedDataPopulation(){
    return this.population;
  }


}
