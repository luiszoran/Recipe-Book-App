import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from "../../models/ingredient";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListService: ShoppingListService) {

  }

  ionViewWillEnter() {
      this.loadItems();
  }

    onAddItem(form: NgForm) {
        this.shoppingListService.addItem(form.value.name, form.value.amount);
        form.reset();
        this.loadItems();
    }

    loadItems() {
        this.ingredients = this.shoppingListService.getItems();
    }

    onCheckItem(index: number) {
        this.shoppingListService.removeItem(index);
        this.loadItems();
    }
}
