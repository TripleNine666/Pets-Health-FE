import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {OrderService} from "../../order.service";
import {ClinicModel, CreateOrder, SelectedServiceNameModel} from "../../order.types";
import {FuseCardComponent} from "../../../../../../@fuse/components/card";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {PetsService} from "../../../pets/pets.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Subscription} from "rxjs";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-clinic-create-order',
  standalone: true,
    imports: [CommonModule, FuseCardComponent, ReactiveFormsModule, MatInputModule, MatSelectModule, MatDatepickerModule, NgxMaterialTimepickerModule, MatButtonModule],

  templateUrl: './clinic-create-order.component.html',
  styleUrl: './clinic-create-order.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClinicCreateOrderComponent implements OnInit, OnDestroy{
    clinicFullInfo: ClinicModel
    selectedService: SelectedServiceNameModel
    minDate: Date = new Date()
    subscriptions: Subscription = new Subscription()
    timeControl: FormControl = this.fb.control('12:00', [Validators.required])
    orderForm: FormGroup = this.fb.group({
        pet: this.fb.control(null, [Validators.required]),
        date: this.fb.control(null, [Validators.required])
    })
    get date() {
        return this.orderForm.get('date')
    }
    constructor(private orderService: OrderService, private fb: FormBuilder, protected petsService: PetsService, private location: Location) {
    }
    ngOnInit() {
        this.clinicFullInfo = this.orderService.clinicFullInfo
        this.selectedService = this.orderService.getSelectedServiceName()
        this.checkSelectedService()
        this.subscriptions.add(
            this.date.valueChanges.subscribe(value => {
                this.updateTime()
                console.log(this.date)
            })
        )
        this.timeControl.valueChanges.subscribe(value => {
            this.updateTime()
            console.log(this.date)
        })
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    back() {
        this.location.back();
    }

    onSubmit() {
        if (this.orderForm.invalid) return
        const payload: CreateOrder = {
            name: this.selectedService.name,
            price: this.selectedService.price,
            title: this.selectedService.title,
            date: this.date.value,
            clinicId: this.clinicFullInfo._id
        }
        const petId: string = this.orderForm.get('pet').value
        this.orderService.createOrder(petId, payload).subscribe()
    }

    private checkSelectedService() {
        if (this.selectedService) return
        this.orderService.checkSelectedService().subscribe(value => this.selectedService = value)
    }

    private updateTime() {
        const dateTime = new Date(this.date.value);
        if (this.timeControl.value) {
            const timeParts = this.timeControl.value.split(':');
            dateTime.setHours(Number(timeParts[0]), Number(timeParts[1]));
        }
        this.date.setValue(dateTime, {emitEvent: false});
    }
}
