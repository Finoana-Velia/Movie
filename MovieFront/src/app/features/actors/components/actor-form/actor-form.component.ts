import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActorService } from '../../service/actor.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { Actor } from '../../models/Actor';

@Component({
  selector: 'app-actor-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './actor-form.component.html',
  styleUrl: './actor-form.component.css'
})
export class ActorFormComponent implements OnInit{

  url? : string | ArrayBuffer | null;

  @Input() actor! : any;
  @ViewChild('profile') profile! : ElementRef;

  actorId! : number;

  _actorForm = new FormGroup({
    profile : new FormControl(),
    name : new FormControl('',{
      nonNullable : true,
      validators : Validators.required
    }),
    birthDate : new FormControl<Date | null>(new Date(),{
      nonNullable : true,
      validators : Validators.required
    }),
    gender : new FormControl('',{
      nonNullable : true,
      validators : Validators.required
    }),
    street : new FormControl(),
    nation : new FormControl(),
    description : new FormControl("")
  });

  constructor(private router : Router, private actorService : ActorService){}

  ngOnInit(): void {
    if(this.actor) {
      console.log("actor : ");
      console.log(this.actor);
      this.actorId = this.actor.id;
      this._actorForm = new FormGroup({
        profile : new FormControl(),
        name : new FormControl(this.actor?.name,{
          nonNullable : true,
          validators : Validators.required
        }),
        birthDate : new FormControl(this.actor.birthDate ? new Date(this.actor.birthDate) : null,{
          nonNullable : true,
          validators : Validators.required
        }),
        gender : new FormControl(this.actor?.gender,{
          nonNullable : true,
          validators : Validators.required
        }),
        street : new FormControl(this.actor?.location?.street),
        nation : new FormControl(this.actor?.location?.nation),
        description : new FormControl(this.actor?.biography)
      });
      
      if(this.actor.profile){
        this.url = this.getImage(this.actor.id);
      }
    }
  }

  activeInput() {
    this.profile.nativeElement.click();
  }

  onSelectFile(event : any) {
    if(event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
        this._actorForm.controls.profile.setValue(event.target.files[0]);
      }
    }
  }

  onSubmit() {
    if(this.actorId) {
      this.actorService.updateActor(
        this.actorId,
        this.generateActorValue(),
        this.profileValue
      ).subscribe(
        response => location.reload(),
        error => {
          alert("Update error");
        }
      );
    }else {
      this.actorService.addActor(this.generateActorValue(),this.profileValue).subscribe(
        response => {
        location.reload();
        }
      );
    }
    
  }

  getImage(id : number) {
    return this.actorService.findImage(id);
  }

  generateActorValue() : Partial<Actor>{
    return {
      name : this.name,
      birthDate : this.birthDate,
      gender : this.gender,
      location : {
        street :this.street,
        nation : this.nation
      },
      biography : this.biography
    }
  }

  get name() {
    return this._actorForm.controls.name.value;
  }
  get birthDate() {
    return this._actorForm.controls.birthDate.value;
  }
  get biography() {
    return this._actorForm.controls.description.value;
  }
  get gender() {
    return this._actorForm.controls.gender.value;
  }
  get street() {
    return this._actorForm.controls.street.value;
  }
  get nation() {
    return this._actorForm.controls.nation.value;
  }
  get profileValue() {
    return this._actorForm.controls.profile.value;
  }
}
