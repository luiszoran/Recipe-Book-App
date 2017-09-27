import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from "../../services/recipe";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";
import { AuthService } from "../../services/auth";
import { DatabaseOptionsPage } from "../database-options/database-options";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
    recipes: Recipe[] = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService: RecipeService,
        private popoverController: PopoverController, private authService: AuthService, private loadingController: LoadingController,
        private alertController: AlertController) {
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

  onShowOptions(event: MouseEvent) {
      const popover = this.popoverController.create(DatabaseOptionsPage);
      const loading = this.loadingController.create({ content: "Please wait.." });
      popover.present({ ev: event });
      popover.onDidDismiss(
          data => {
              if (!data) return;
              if (data.action == "load") {
                  loading.present();
                  this.authService.getActiveUser().getIdToken()
                      .then(
                      (token: string) => {
                          this.recipeService.fetchList(token).subscribe(
                              (list: Recipe[]) => {
                                  loading.dismiss();
                                  if (list) {
                                      this.recipes = list;
                                  } else {
                                      this.recipes = [];
                                  }
                              },
                              error => {
                                  loading.dismiss();
                                  this.handleError(error);
                              }
                          );
                      })
                      .catch(
                      );
              } else if (data.action == "save") {
                  loading.present();
                  this.authService.getActiveUser().getIdToken()
                      .then(
                      (token: string) => {
                          this.recipeService.storeList(token).subscribe(
                              () => loading.dismiss(),
                              error => {
                                  loading.dismiss();
                                  this.handleError(error);
                              }
                          );
                      })
                      .catch(
                      );
              }
          });
  }

  private handleError(errorMessage: string) {
      const alert = this.alertController.create({
          title: "An error occurred",
          message: errorMessage,
          buttons: ["Ok"]
      });
      alert.present();
  }
}
