import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from "../edit-recipe/edit-recipe"
import { Recipe } from "../../models/recipe"
import { ShoppingListService } from "../../services/shopping-list"
import { RecipeService } from "../../services/recipe"


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipe;
  index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListService: ShoppingListService, private recipeService: RecipeService) {
  }

  ngOnInit() {
      this.recipe = this.navParams.get("recipe");
      this.index = this.navParams.get("index");
  }

  onEditRecipe() {
      this.navCtrl.push(EditRecipePage, { mode: "Edit", recipe: this.recipe, index: this.index });
  }

  onAddIngredients() {
      this.shoppingListService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe() {
      this.recipeService.removeItem(this.index);
      this.navCtrl.popToRoot();
  }
}
