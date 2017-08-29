import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { RecipesPage } from '../recipes/recipes';
import { ShoppingListPage } from '../shopping-list/shopping-list';


@IonicPage()
@Component({
  selector: 'page-tabs',
  template: `<ion-tabs>
              <ion-tab [root]="shoppingListPage" tabTitle="Shopping List" tabIcon="star"></ion-tab>
              <ion-tab [root]="recipesPage" tabTitle="Recipes" tabIcon="book"></ion-tab>
             </ion-tabs>`
  })
export class TabsPage {
  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;
  constructor() {
  }

}
