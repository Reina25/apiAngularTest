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
  more: boolean = false;
  alldata: data[] = [];
  //currentdataID: string;

  @ViewChild('moredataform') form: NgForm;


  receivedData: any;

  constructor(private DataService: DataService, private http: HttpClient) {
    this.receivedData = this.DataService.getSharedDataName();

  }

  ngOnInit() {
    //this.receivedData = this.DataService.getSharedDataName();
     this.fetchDataPerName(this.receivedData);
    //console.log(this.receivedData + "boo");
      
    //this.fillForm();
  }

  cancelmore() {
    this.more = false;
    this.form.reset();



  }

  
  private   fetchDataPerName(name: any) {
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
        //console.log(data);
        this.alldata = data;
        this.fillForm()
        //console.log("i am inside fetch data");
        //console.log(this.alldata);
      })
  }

  fillForm() {
       this.form.setValue({
        //name: "testing",
       //name: this.alldata[0].name.common,
    // //   cca2: this.alldata.cca2,
    // //   independent: alldata.independent,
    // //   area: alldata.area,
    // //   population: alldata.population,
     });
    //console.log("i am here");
    //console.log(this.alldata);
  }

  // fetchData(id: string) {
  //   //this.more=true;


  //   // this.currentdataID = id;
  //   //this.receivedData = this.DataService.getSharedData();
  //   //id=this.receivedData;

  //   //Get the product based on the id
  //   let currentdata = this.alldata.find((d) => { return d.id === id });
  //   //console.log(this.form);

  //   //Populate the form with the product details
  //   // this.form.setValue({
  //   //   name:currentdata.name.common,
  //   //   cca2: currentdata.cca2,
  //   //   independent: currentdata.independent,
  //   //   area: currentdata.area,
  //   //   population: currentdata.population,
  //   // });

  //   this.form.setValue({
  //     name: "nametest"/*,
  //     cca2: currentdata.cca2,
  //     independent: currentdata.independent,
  //     area: currentdata.area,
  //     population: currentdata.population,*/
  //   });

  // }

}
