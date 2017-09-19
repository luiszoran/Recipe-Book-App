import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from "../../services/recipe";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";
@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
    recipes: Recipe[] = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService: RecipeService) {
  }

  onNewRecipe() {
      this.navCtrl.push(EditRecipePage, {mode: 'New'});
  } 

  ionViewWillEnter() {
      this.recipes = this.recipeService.getItems();
  }

  onLoadRecipe(recipe: Recipe, index: number) {
      this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
  }
}
