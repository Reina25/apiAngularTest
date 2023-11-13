import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DataService } from './service/data.service';
import { data } from './model/data';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apiAngularTest';
  more:boolean=false;

  
  alldata: data[] =[];
  currentdataID: string;
 

  @ViewChild('moredataform') form: NgForm;

  constructor(private http: HttpClient) {
  

  }

  

  ngOnInit(){
   // this.fetchdata();

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
        console.log(data);
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

  cancelmore(){
    this.more=false;
    this.form.reset();
    
   

  }

}
