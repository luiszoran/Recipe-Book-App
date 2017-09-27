import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from "../../models/ingredient";
import { DatabaseOptionsPage } from "../database-options/database-options";
import { AuthService } from "../../services/auth";

@IonicPage()
@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
    selectedIngredient: Ingredient = new Ingredient("", undefined);
    ingredients: Ingredient[];
    constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListService: ShoppingListService,
        private popoverController: PopoverController, private authService: AuthService, private loadingController: LoadingController,
        private alertController: AlertController) {

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
        this.selectedIngredient = this.ingredients[index];
        this.shoppingListService.removeItem(index);
        this.loadItems();
    }

    onRemoveItem(index: number) {
        this.shoppingListService.removeItem(index);
        this.loadItems();
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
                            this.shoppingListService.fetchList(token).subscribe(
                                (list: Ingredient[]) =>
                                {
                                    loading.dismiss();
                                    if (list) {
                                        this.ingredients = list;
                                    } else {
                                        this.ingredients = [];
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
                            this.shoppingListService.storeList(token).subscribe(
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
