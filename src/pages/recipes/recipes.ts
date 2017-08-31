import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewRecipePage } from '../new-recipe/new-recipe';
@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onNewRecipe() {
      this.navCtrl.push(NewRecipePage);
  }
}
