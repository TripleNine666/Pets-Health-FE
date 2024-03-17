import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetModel, PetTypeEnum } from '../pets.types';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pet-item',
    standalone: true,
    imports: [CommonModule, FuseCardComponent, RouterLink],
    templateUrl: './pet-item.component.html',
    styleUrl: './pet-item.component.scss',
})
export class PetItemComponent {
    @Input() pet: PetModel;
    protected readonly PetTypeEnum = PetTypeEnum;
}
