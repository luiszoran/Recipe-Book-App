import { Ingredient } from "../models/ingredient";
import { AuthService } from "./auth";
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs/Rx";


@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(private http: Http, private authService: AuthService) {

    }

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1);
    }

    getItems() {
        return this.ingredients.slice();
    }

    changeItem(name: string, amount: number, index: number) {
        this.ingredients[index] = new Ingredient(name, amount);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put("https://ionic2-recipebook-44336.firebaseio.com/" + userId + "/shopping-list.json?auth=" + token, this.ingredients).map((response: Response) => {
            return response.json();
        });
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get("https://ionic2-recipebook-44336.firebaseio.com/" + userId + "/shopping-list.json?auth=" + token)
            .map((response: Response) => {
              return response.json();
            })
            .do((data) => {
                this.ingredients = data;
            });
    }
}
