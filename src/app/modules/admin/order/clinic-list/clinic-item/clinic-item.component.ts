import {Component, Input, LOCALE_ID, OnInit} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {ClinicModel} from "../../order.types";
import {FuseCardComponent} from "../../../../../../@fuse/components/card";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {UrlHelpers} from "../../../../../core/helpers/UrlHelpers";

@Component({
  selector: 'app-clinic-item',
  standalone: true,
    imports: [CommonModule, FuseCardComponent, RouterLink, MatExpansionModule],
  templateUrl: './clinic-item.component.html',
  styleUrl: './clinic-item.component.scss'
})
export class ClinicItemComponent{
    @Input({required: true}) clinic: ClinicModel;
    @Input({required: true}) isClinics: boolean;

    constructor() {
    }

    protected readonly UrlHelpers = UrlHelpers;
}
