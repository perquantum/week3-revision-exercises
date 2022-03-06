import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  constructor(public ht:HttpClient) { }

  ngOnInit(){
  }

  url = "http://localhost:3000/players";

  getData(){
    return this.ht.get(this.url);
  }
  postData(data:any){
    return this.ht.post(this.url, data)
  }
  editData(data:any){
    console.log(data.id);
    return this.ht.put(this.url+"/"+data.id, data)
  }
  deleteData(id:any){
    return this.ht.delete(this.url+"/"+id);
  }
}