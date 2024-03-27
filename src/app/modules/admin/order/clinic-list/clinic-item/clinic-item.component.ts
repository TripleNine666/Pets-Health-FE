import {Component, Input, LOCALE_ID} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {ClinicModel} from "../../order.types";
import {FuseCardComponent} from "../../../../../../@fuse/components/card";
import {RouterLink} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {UrlHelpers} from "../../../../../core/helpers/UrlHelpers";

@Component({
  selector: 'app-clinic-item',
  standalone: true,
    imports: [CommonModule, FuseCardComponent, RouterLink, MatExpansionModule],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'de-DE',
        },
    ],
  templateUrl: './clinic-item.component.html',
  styleUrl: './clinic-item.component.scss'
})
export class ClinicItemComponent {
    @Input({required: true}) clinic: ClinicModel;
    constructor() {
        registerLocaleData(localeDe, 'de-DE', localeDeExtra);
    }

    protected readonly UrlHelpers = UrlHelpers;
}
