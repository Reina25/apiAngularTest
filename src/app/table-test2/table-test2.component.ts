import { data } from './../model/data';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-table-test2',
  templateUrl: './table-test2.component.html',
  styleUrls: ['./table-test2.component.css']
})
export class TableTest2Component implements OnInit {
  alldata: data[] =[];
  currentPage :any = 1;
  data: any[] = [];
  itemsPerPage = 20;
 


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
        // this.loadData();
        // this.initializeDataTable();
    
      })
  }

  // initializeDataTable() {
    
  //     const dataTable: any = ('#example2').DataTable({
  //       data: this.alldata,
  //       columns: [
  //         { data: 'id' }, // Replace 'id' with your actual data key
  //         { data: 'name' }, // Replace 'name' with your actual data key
  //         // Add other columns as needed
  //       ]
      
  //   });
  // }
  

  loadData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.data = this.alldata.slice(startIndex, endIndex);
  }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages()) {
  //     this.currentPage++;
  //     this.loadData();
  //   }
  // }

  // prevPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.loadData();
  //   }
  // }

  // totalPages(): number {
  //   return Math.ceil(this.alldata.length / this.itemsPerPage);
  // }

  // getPages(): number[] {
  //   const totalPages = this.totalPages();
  //   const pages: number[] = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // }
  
  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.totalPages()) {
  //     this.currentPage = page;
  //     this.loadData();
  //   }
  // }





}
