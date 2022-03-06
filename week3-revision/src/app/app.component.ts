import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DataManipulationService } from './data-manipulation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'week3-revision';
  constructor(public dm:DataManipulationService){
  }

  players_data:any;
  flag = false;
  flagForEdit = false;

  player = new FormGroup({
    name : new FormControl,
    club : new FormControl,
    nation : new FormControl
  })

  name = "";
  club = "";
  nation = "";

  playerEdit = new FormGroup({
    name : new FormControl,
    club : new FormControl,
    nation : new FormControl
  })

  ngOnInit(){
    this.getData();
  }
  getData(){
    this.dm.getData().subscribe(data => (this.showData(data)));
  }

  showData(data:any){
    this.players_data = data;
    console.log(this.players_data);
  }

  addNewData(){
    this.flag = true;
  }

  IDs:any = [];
  idGenerator(){
    let id;
    id = Math.floor(Math.random()*1000);
    if(this.IDs.includes(id)){
      this.idGenerator();
    }
    return id;
  }

  postData(){
    let details = {
      "id": this.idGenerator(),
      "name" : this.player.value.name,
      "club" : this.player.value.club,
      "nation" : this.player.value.nation
    }
    this.dm.postData(details).subscribe(data => (this.players_data.push(data)));
    this.flag = false;
  }

  editData(data:any){
    this.flagForEdit = true;
    this.name = data.name;
    this.club = data.club;
    this.nation = data.nation;

    let details = {
      "id": data.id,
      "name" : data.name,
      "club" : data.club,
      "nation" : data.nation
    }
    this.dm.editData(details).subscribe(data => this.showData(data));
  }

  deleteData(id:any){
    this.dm.deleteData(id).subscribe();
    this.getData();
  }


}