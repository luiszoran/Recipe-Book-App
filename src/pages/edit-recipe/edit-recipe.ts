import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from "../../services/recipe";
import { Recipe } from "../../models/recipe"

@IonicPage()
@Component({
    selector: 'page-edit-recipe',
    templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {
    mode = "New";
    selectOptions = ["Easy", "Medium", "Hard"];
    form: FormGroup;
    recipe: Recipe;
    index: number;

    constructor(private navParams: NavParams, private actionSheetController: ActionSheetController, private alertController: AlertController, private toastController: ToastController, private recipeService: RecipeService, private navController: NavController) {
    }

    ngOnInit() {
        this.mode = this.navParams.get('mode');
        if (this.mode == "Edit") {
            this.recipe = this.navParams.get("recipe");
            this.index = this.navParams.get("index");
        }
        this.initializeForm();
    }

    onSubmit() {
        const value = this.form.value;
        let ingredients = [];
        if (value.ingredients.length > 0) {
            ingredients = value.ingredients.map(name => {
                return { name: name, amount: 1 };
            })
        }
        if (this.mode == "Edit") {
            this.recipeService.changeItem(value.title, value.description, value.difficulty, ingredients, this.index);
        } else {
            this.recipeService.addItem(value.title, value.description, value.difficulty, ingredients);
        }
        this.form.reset();
        this.navController.popToRoot();
    }

    initializeForm() {
        let title = null;
        let description = null;
        let difficulty = 'Medium';
        let ingredients = [];
        if (this.mode == "Edit") {
            title = this.recipe.title;
            description = this.recipe.description;
            difficulty = this.recipe.difficulty;
            for (let ingredient of this.recipe.ingredients) {
                ingredients.push(new FormControl(ingredient.name, Validators.required));
            }
        }
        this.form = new FormGroup({
            "title": new FormControl(title, Validators.required),
            "description": new FormControl(description, Validators.required),
            "difficulty": new FormControl(difficulty, Validators.required),
            "ingredients": new FormArray(ingredients)
        });
    }

    onManageIngredients() {
        const actionSheet = this.actionSheetController.create({
            title: "What do you want to do?",
            buttons: [
                {
                    text: "Add Ingredient",
                    handler: () => {
                        this.createAlertController().present();
                    }
                },
                {
                    text: "Remove All Ingredients",
                    role: "destructive",
                    handler: () => {
                        const fArray: FormArray = <FormArray>this.form.get("ingredients");
                        for (let i = fArray.length - 1; i >= 0; i--) {
                                fArray.removeAt(i);
                        }
                        const toast = this.toastController.create({
                            message: "Ingredients removed",
                            duration: 1500,
                            position: "bottom"
                        });
                        toast.present();
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel",
                }
            ]
        });
        actionSheet.present();
    }

    createAlertController() {
        return this.alertController.create({
            title: 'Add Ingredient',
            inputs: [{
                name: "name",
                placeholder: "Name"
            }],
            buttons: [
                {
                    text: "Add",
                    handler: data => {
                        if (data.name.trim() == "" || data.name == null) {
                            const toast = this.toastController.create({
                                message: "Please enter a valid value",
                                duration: 1500,
                                position: "bottom"
                            });
                            toast.present();
                            return;
                        }
                        (<FormArray>this.form.get("ingredients")).push(new FormControl(data.name, Validators.required));
                        const toast = this.toastController.create({
                            message: "Item added",
                            duration: 1500,
                            position: "bottom"
                        });
                        toast.present();
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel",
                }]
        });
    }

}
