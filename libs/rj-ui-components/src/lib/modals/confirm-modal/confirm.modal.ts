// import { Component } from '@angular/core';
// import { NgbModal, NgbModalOptions, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//     templateUrl: './confirm.modal.html'
// })
// export class ConfirmModal {
//     title = "";
//     message = "";
//     okBtn = "CONFIRM";
//     noBtn = "CANCEL";
//     destructive?:boolean;

//     constructor(public modalInstance: NgbActiveModal) {
//     }

//     no() {
//         this.modalInstance.close(false);
//     }

//     yes() {
//         this.modalInstance.close(true);
//     }

//     static open(modalService: NgbModal, message: string, title: string = "Confirm", okBtn: string = "CONFIRM", noBtn: string = "CANCEL", destructive?:boolean): Promise<boolean> {
//         var modal = modalService.open(ConfirmModal, <NgbModalOptions>{
//             backdrop: 'static'
//         });
//         modal.componentInstance.title = title;
//         modal.componentInstance.message = message;
//         modal.componentInstance.okBtn = okBtn;
//         modal.componentInstance.noBtn = noBtn;
//         modal.componentInstance.destructive = destructive;
//         return modal.result;
//     }
// }
