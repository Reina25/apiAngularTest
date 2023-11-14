import { DataService } from './../service/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { data } from '../model/data';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 
  alldata: data[] = [];
  
  id: any;
  name: any;
  independent: boolean;
  cca2: string;
  area: number;
  population: number;

  constructor(private DataService: DataService, private http: HttpClient) {  }

  ngOnInit() {
  //this.fillForm();
    this.fetchDataPerName(this.DataService.getSharedDataName());
  }


  private fetchDataPerName(name: any) {
    this.http.get<{ [key: string]: data; }>(
      // 'https://angulardatabasetest-default-rtdb.firebaseio.com/data.json')
      'https://restcountries.com/v3.1/name/' + name
    )
      .pipe(map((response) => {
        const data = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            data.push({ ...response[key], id: key });
          }          
        }
        return data;
      }))
      .subscribe((data) => {
        this.alldata = data;
        this.fillFormFetch(data[0].name.common,data[0].independent,data[0].cca2,data[0].area,data[0].population);
        // console.log(data[0].population);
      })
  }

  fillForm() {
    this.name = this.DataService.getSharedDataName();
    this.independent = this.DataService.getSharedDataIndependent();
    this.cca2 = this.DataService.getSharedDataCca2();
    this.area = this.DataService.getSharedDataArea();
    this.population = this.DataService.getSharedDataPopulation();    
  }
  fillFormFetch(nameParam:any,independentParam:any,cca2Param:any,areaParam:any,populationParam:any){    
    this.name = nameParam;
    this.independent = independentParam;
    this.cca2 = cca2Param;
    this.area = areaParam;
    this.population = populationParam;

  }
}
