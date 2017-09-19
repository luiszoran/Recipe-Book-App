import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";


export class RecipeService {
    private recipes: Recipe[] = [];

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
}
