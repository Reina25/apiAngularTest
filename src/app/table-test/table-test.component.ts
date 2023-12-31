import { data } from './../model/data';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';

import {  map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.css']
})
export class TableTestComponent implements OnInit {
  alldata: data[] =[];
  data: any[] = [];
  

  private originalData: any[] = []; 
  fullData: any[] = []; 
  displayedData: any[] = [];


  
  currentPage: number = 1;
  entriesPerPage: number = 15;
  totalEntries: number;

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
    this.fetchData();
  }

  onDataFetch(){
    this.fetchData();
  }

  private fetchData() {
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe((response) => {
        this.originalData = response; 
        this.alldata = [...response]; 
        this.displayedData = [...response]; 
        this.loadData();
        this.totalEntries = this.alldata.length;
        this.data=this.displayedData;
      });
  }


  // private fetchdata(){
  //   this.http.get<{[key: string]:data}>(
  //     // 'https://angulardatabasetest-default-rtdb.firebaseio.com/data.json')
  //     'https://restcountries.com/v3.1/all'
  //     // 'https://restcountries.com/v3.1/name/' + name
  //   )
  //     .pipe(map((response) => {
  //       const data = [];       
  //       for(const key in response){
  //         if(response.hasOwnProperty(key)){
  //           data.push({...response[key], id:key})
  //         }
  //       }
  //       return data;
  //     }))
  //     .subscribe((data) => {
  //       this.alldata=data;        
  //       this.loadData();
  //       this.totalEntries = this.alldata.length - 1 ;    
           
  //     })
  // }

  onInputChange(event: Event) {
    const input = (event.target as HTMLInputElement).value.toUpperCase();
    this.displayedData = this.originalData.filter((item) => {
      return item.name.common.toUpperCase().includes(input);
    });
    this.totalEntries = this.displayedData.length;

  }

  clearSearch() {
    
    const inputElement = document.getElementById('myInput') as HTMLInputElement;
    inputElement.value = '';
  
    this.displayedData = [...this.data];
    
    this.totalEntries = this.alldata.length;
    this.goToPage(1);
  
  }


  calculateStartEntry(): number {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }
  
  calculateEndEntry(): number {
    const endEntry = this.currentPage * this.entriesPerPage;
    return endEntry > this.totalEntries ? this.totalEntries : endEntry;
  }
    

  loadData(): void {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    this.displayedData = this.alldata.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.loadData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
    }
  }

  totalPages(): number {
    return Math.ceil(this.alldata.length / this.entriesPerPage);
  }

  getPages(): number[] {
    const totalPages = this.totalPages();
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.loadData();
    }
  }

 

}
