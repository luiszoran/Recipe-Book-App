import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

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
}
