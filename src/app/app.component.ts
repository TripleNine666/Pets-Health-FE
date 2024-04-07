import {Component, LOCALE_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'ru-Ru',
        },
    ],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor()
    {
        registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
    }
}
