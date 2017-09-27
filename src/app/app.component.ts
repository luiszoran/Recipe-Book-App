import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SigninPage } from "../pages/signin/signin";
import { SignupPage } from "../pages/signup/signup";
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../services/auth';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;
    signinPage = SigninPage;
    signupPage = SignupPage;
    isAuthenticated = false;
    @ViewChild('nav') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBh9Q9-RYZGZilsQW3gsClNhFjgWhp40Z0",
      authDomain: "ionic2-recipebook-44336.firebaseapp.com"
      });
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.isAuthenticated = true;
            this.rootPage = TabsPage;
        } else {
            this.isAuthenticated = false;
            this.rootPage = SigninPage;
        }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
      this.navCtrl.setRoot(page);
      this.menuCtrl.close();
  }

  onLogout() {
      this.authService.logout();
      this.menuCtrl.close();
      this.navCtrl.setRoot(SigninPage);
  }
}

