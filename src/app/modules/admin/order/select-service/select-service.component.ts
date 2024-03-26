import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { ServicesService } from '../../../../shared/services/services.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {Router, RouterLink} from "@angular/router";
import {UrlHelpers} from "../../../../core/helpers/UrlHelpers";

@Component({
    selector: 'app-select-service',
    standalone: true,
    imports: [
        CommonModule,
        FuseCardComponent,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        RouterLink,
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'de-DE',
        },
    ],
    templateUrl: './select-service.component.html',
    styleUrl: './select-service.component.scss',
})
export class SelectServiceComponent implements OnInit, OnDestroy {
    subscriptions: Subscription = new Subscription();

    formGroup = this.fb.group({
        serviceControl: ['', [Validators.required]],
        subServiceControl: ['', [Validators.required]],
    });

    constructor(
        protected servicesService: ServicesService,
        private orderService: OrderService,
        private fb: FormBuilder,
    ) {}

    get serviceControl() {
        return this.formGroup.get('serviceControl');
    }

    get subServiceControl() {
        return this.formGroup.get('subServiceControl');
    }

    ngOnInit() {
        registerLocaleData(localeDe, 'de-DE', localeDeExtra);
        const selectedService = this.orderService.selectedService;
        if (selectedService) {
            this.serviceControl.setValue(selectedService.serviceId, {
                emitEvent: false,
            });
            this.subServiceControl.setValue(selectedService.subServiceId, {
                emitEvent: false,
            });
        }

        this.subscriptions.add(
            this.serviceControl.valueChanges.subscribe((_value) => {
                this.subServiceControl.setValue(null, { emitEvent: false });
            }),
        );
        this.subscriptions.add(
            this.subServiceControl.valueChanges.subscribe((value) => {
                this.orderService.setSelectedService({
                    serviceId: this.serviceControl.value,
                    subServiceId: value,
                });
            }),
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    protected readonly UrlHelpers = UrlHelpers;
}
