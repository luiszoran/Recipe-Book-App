﻿import { IonicPage, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

IonicPage()
@Component({
    selector: 'page-sl-options',
    template: `
        <ion-grid text-center>
            <ion-row>
              <ion-col>
                <h3>Store & Load</h3>
              </ion-col> 
            </ion-row>
            <ion-row>
              <ion-col>
                <button ion-button outline (click)="onAction('load')">Load List</button>
              </ion-col> 
            </ion-row>
            <ion-row>
              <ion-col>
                <button ion-button outline (click)="onAction('save')">Save List</button>
              </ion-col> 
            </ion-row>
        </ion-grid>
    `
})
export class DatabaseOptionsPage {
    constructor(private viewController: ViewController) {

    }

    onAction(action: string) {
        this.viewController.dismiss({ action: action });
    }
}