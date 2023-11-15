import { data } from './../model/data';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  alldata: data[] =[];


  currentdataID: number;
  currentDataName:string;
  currentDataIndependent:boolean;
  currentDataCca2:string;
  currentDataArea:number;
  currentDataPopulation:number;





  constructor(private http: HttpClient, private DataService: DataService) { }

 
  sendData(id:number,name:string,independent:boolean,cca2:string,area:number,population:number) {
    this.currentdataID=id;
    this.currentDataName = name;
    this.currentDataIndependent = independent;
    this.currentDataCca2 = cca2;
    this.currentDataArea = area;
    this.currentDataPopulation = population;
    
    this.DataService.setSharedID(id);
    this.DataService.setSharedDataName(name);

    this.DataService.setSharedDataIndependent(independent);
    this.DataService.setSharedDataCca2(cca2);

    this.DataService.setSharedDataArea(area);
    this.DataService.setSharedDataPopulation(population);

    
  }

  sendDataName(name:any){
    this.currentDataName=name;
    this.DataService.setSharedDataName(name);

  }
 

  ngOnInit(){
    this.fetchdata();
 

  }

  onDataFetch(){
    this.fetchdata();
  }


  private fetchdata(){
    this.http.get<{[key: string]:data}>(
      // 'https://angulardatabasetest-default-rtdb.firebaseio.com/data.json')
      'https://restcountries.com/v3.1/all'
      // 'https://restcountries.com/v3.1/name/' + name
    )
      .pipe(map((response) => {
        const data = [];
       
        for(const key in response){
          if(response.hasOwnProperty(key)){
            data.push({...response[key], id:key})
           

          }
          
        }
        return data;
      }))
      .subscribe((data) => {
        this.alldata=data;
    
      })
  }



}
