import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseCardComponent } from '../../../../@fuse/components/card';
import { PetsService } from './pets.service';
import { PetItemComponent } from './pet-item/pet-item.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pets',
    standalone: true,
    imports: [
        CommonModule,
        FuseCardComponent,
        PetItemComponent,
        MatButtonModule,
        RouterLink,
    ],
    templateUrl: './pets.component.html',
    styleUrl: './pets.component.scss',
})
export class PetsComponent {
    constructor(protected petsService: PetsService) {}
}
