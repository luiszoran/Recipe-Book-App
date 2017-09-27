import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";
import { AuthService } from "./auth";
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [];

    constructor(private http: Http, private authService: AuthService) {

    }

    addItem(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
        console.log(this.recipes);
    }

    addItems(items: Recipe[]) {
        this.recipes.push(...items);
    }

    removeItem(index: number) {
        this.recipes.splice(index, 1);
    }

    getItems() {
        return this.recipes.slice();
    }

    changeItem(title: string, description: string, difficulty: string, ingredients: Ingredient[], index: number) {
        
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
        console.log(index);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put("https://ionic2-recipebook-44336.firebaseio.com/" + userId + "/recipes-list.json?auth=" + token, this.recipes).map((response: Response) => {
            return response.json();
        });
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get("https://ionic2-recipebook-44336.firebaseio.com/" + userId + "/recipes-list.json?auth=" + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json() ? response.json() : [];
                for (let items of recipes) {
                    if (!items.hasOwnProperty("ingredients"))
                        items.ingredients = [];
                }
                return recipes;
            })
            .do((data) => {
                this.recipes = data;
            });
    }
}
