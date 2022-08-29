import { Injectable } from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {GenericModalComponent} from "../generic-modal/generic-modal.component";

@Injectable({
  providedIn: 'root'
})
export class OpenCustomModalService {

  readonly savedJobModalTitle: string = 'Job was saved to your profile';
  readonly appliedJobModalTitle: string = 'You have applied to the job position ';
  readonly savedJobContentModal: string = 'You have successfully saved this job position.\n' +
    'You can see the job later on \'My jobs\' section.';
  readonly appliedJobContentModal: string = 'You have successfully applied to this job position.\n' +
    'If the recruiter decides that you are a fitted candidate, they will contact you. Good luck!\n' +
    'You can see all the applied jobs later on \'My jobs\' section.';
  readonly closeJobModalTitle: string = 'Close position ';
  readonly closeJobContentModal: string = 'Are you sure you want to close this job opening? This action can\'t be undone.';
  readonly confirmDeletionModalTitle: string = 'Success!';
  readonly confirmDeletionModalContent: string = 'You have successfully closed this job opening!';

  constructor(private modalService: NgbModal) { }

  openModal(title: string, content: string, hasConfirmButton: boolean): NgbModalRef {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'};
    const modalInstance: NgbModalRef = this.modalService.open(GenericModalComponent, modalOptions);
    modalInstance.componentInstance.title = title;
    modalInstance.componentInstance.content = content;
    modalInstance.componentInstance.hasConfirmButton = hasConfirmButton;
    return modalInstance;
  }
}
