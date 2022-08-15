import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() hasConfirmButton: boolean;

  constructor(private modalService: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onDismiss(): void {
    this.modalService.dismiss('cancel');
  }

  onClose(): void {
    this.modalService.close();
  }

}
