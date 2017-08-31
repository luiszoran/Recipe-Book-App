import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipe/recipe';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { NewRecipePage } from '../pages/new-recipe/new-recipe';


@NgModule({
  declarations: [
    MyApp,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    NewRecipePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    NewRecipePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
