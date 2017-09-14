import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
    selector: 'page-edit-recipe',
    templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {
    mode = "New";
    selectOptions = ["Easy", "Medium", "Hard"];
    form: FormGroup;


    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInt() {
        this.mode = this.navParams.get('mode');
        this.initializeForm();
    }

    onSubmit() {
        console.log(this.form);
    }

    initializeForm() {
        this.form = new FormGroup({
            "title": new FormControl(null, Validators.required),
            "description": new FormControl(null, Validators.required),
            "difficulty": new FormControl("Medium", Validators.required)
        });
    }

}
