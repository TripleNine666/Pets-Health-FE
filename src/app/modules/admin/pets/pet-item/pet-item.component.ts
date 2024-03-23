import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetModel, PetTypeEnum } from '../pets.types';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {
    ConfirmDialogComponent,
    ConfirmDialogModel,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PetsService } from '../pets.service';

@Component({
    selector: 'app-pet-item',
    standalone: true,
    imports: [
        CommonModule,
        FuseCardComponent,
        RouterLink,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './pet-item.component.html',
    styleUrl: './pet-item.component.scss',
})
export class PetItemComponent {
    @Input() pet: PetModel;
    protected readonly PetTypeEnum = PetTypeEnum;

    constructor(
        private dialog: MatDialog,
        private petService: PetsService,
    ) {}

    deletePet() {
        const message = 'Вы уверены что хотите удалить питомца?';
        const title = 'Подтверждение удаления';

        const dialogData = new ConfirmDialogModel(title, message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '400px',
            data: dialogData,
            enterAnimationDuration: 300,
            exitAnimationDuration: 250,
        });
        dialogRef.afterClosed().subscribe((dialogResult) => {
            if (!dialogResult) return;
            this.petService.deletePet(this.pet._id).subscribe({
                next: () => {
                    this.petService.getAllPets().subscribe();
                },
            });
        });
    }
}
