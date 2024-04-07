import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PetOrder} from "../../pets.types";
import {FuseCardComponent} from "../../../../../../@fuse/components/card";
import {UrlHelpers} from "../../../../../core/helpers/UrlHelpers";
import {RouterLink} from "@angular/router";
import {ClinicItemComponent} from "../../../order/clinic-list/clinic-item/clinic-item.component";

@Component({
  selector: 'pet-order-item',
  standalone: true,
    imports: [CommonModule, FuseCardComponent, RouterLink, ClinicItemComponent],
  templateUrl: './pet-order-item.component.html',
  styleUrl: './pet-order-item.component.scss'
})
export class PetOrderItemComponent {
    @Input({required: true}) order:PetOrder
    protected readonly UrlHelpers = UrlHelpers;
}
