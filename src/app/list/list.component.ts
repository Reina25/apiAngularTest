import { data } from './../model/data';
import { DataService } from './../service/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  alldata: data[] =[];
  currentdataID: string;
  currentDataName:string;
  more:boolean=false;
  
  @ViewChild('moredataform') form: NgForm;

  constructor(private http: HttpClient, private DataService: DataService ) {
  

  }

 
  sendData(id:any,name:any) {
    this.currentdataID=id;
    this.currentDataName = name
    
    this.DataService.setSharedData(id);
    this.DataService.setSharedDataName(name);
    
  }
  testData(id:any,name:any) {
   console.log(id + " - " + name)
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
        //console.log(data);
        this.alldata=data;
    
      })
  }

  moreclicked(id: string){
    this.more=true;
    

    this.currentdataID = id;
    //Get the product based on the id
    let currentdata = this.alldata.find((d) => {return d.id === id});
    //console.log(this.form);

    //Populate the form with the product details
    this.form.setValue({
      name:currentdata.name.common,
      cca2: currentdata.cca2,
      independent: currentdata.independent,
      area: currentdata.area,
      population: currentdata.population,
      
    });

  }



}
