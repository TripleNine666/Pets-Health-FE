import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderService} from "../order.service";
import {ClinicItemComponent} from "./clinic-item/clinic-item.component";
import {SelectedServiceModel, SelectedServiceNameModel} from "../order.types";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clinic-list',
  standalone: true,
    imports: [CommonModule, ClinicItemComponent],
  templateUrl: './clinic-list.component.html',
  styleUrl: './clinic-list.component.scss'
})
export class ClinicListComponent implements OnInit{
    constructor(protected orderService: OrderService, private route: ActivatedRoute) {
    }
    selectedService: SelectedServiceNameModel;
    ngOnInit() {
        this.selectedService = this.orderService.getSelectedServiceName()
        this.checkSelectedService()
    }

    private checkSelectedService() {
        if (this.selectedService) return
         this.orderService.checkSelectedService().subscribe(value => this.selectedService = value)
    }
}
