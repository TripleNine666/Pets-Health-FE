import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UrlHelpers } from '../../../../core/helpers/UrlHelpers';
import { Subscription } from 'rxjs';
import { PetModel, PetSexEnum, PetTypeEnum } from '../pets.types';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {PetOrderItemComponent} from "./pet-order-item/pet-order-item.component";

@Component({
    selector: 'app-pet-create-edit',
    standalone: true,
    imports: [
        CommonModule,
        FuseCardComponent,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        RouterLink,
        PetOrderItemComponent,
    ],
    templateUrl: './pet-create-edit.component.html',
    styleUrl: './pet-create-edit.component.scss',
})
export class PetCreateEditComponent implements OnInit, OnDestroy {
    idEditMode: boolean;
    subscription: Subscription = new Subscription();
    petFullInfo: PetModel;
    petId: string;

    petFormGroup: FormGroup = this.fb.group({
        name: [
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(255),
            ],
        ],
        age: [
            null,
            [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        type: [PetTypeEnum.dog, [Validators.required]],
        breed: [
            '',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(255),
            ],
        ],
        sex: [null, [Validators.required]],
    });
    protected readonly PetTypeEnum = PetTypeEnum;
    protected readonly PetSexEnum = PetSexEnum;

    constructor(
        private petsService: PetsService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {}

    get name() {
        return this.petFormGroup.get('name') as FormControl;
    }

    get age() {
        return this.petFormGroup.get('age') as FormControl;
    }

    get type() {
        return this.petFormGroup.get('type') as FormControl;
    }

    get breed() {
        return this.petFormGroup.get('breed') as FormControl;
    }

    get sex() {
        return this.petFormGroup.get('sex') as FormControl;
    }

    ngOnInit() {
        this.checkEditMode();

        if (this.idEditMode) {
            this.subscription.add(
                this.petsService.petFullInfo$.subscribe((pet) => {
                    this.petFullInfo = pet;
                    this.iniPetFormGroup();
                }),
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.petsService.resetPetFullInfo();
    }

    onSubmit() {
        if (this.petFormGroup.invalid) return;
        if (!this.idEditMode)
            this.petsService
                .createPet(this.petFormGroup.getRawValue())
                .subscribe({
                    next: () => {
                        this.router.navigate(['..']);
                    },
                });
        else
            this.petsService
                .updatePet(this.petFormGroup.getRawValue(), this.petId)
                .subscribe({
                    next: () => {
                        this.router.navigate(['..']);
                    },
                });
    }

    private checkEditMode() {
        const urpParameter = this.route.snapshot.url[0]?.path;
        this.idEditMode = urpParameter !== UrlHelpers.create;
        if (this.idEditMode) this.petId = urpParameter;
    }

    private iniPetFormGroup() {
        this.name.setValue(this.petFullInfo.name);
        this.age.setValue(this.petFullInfo.age);
        this.type.setValue(this.petFullInfo.type);
        this.breed.setValue(this.petFullInfo.breed);
        this.sex.setValue(this.petFullInfo.sex);
    }
}
