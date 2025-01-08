var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "app/vppcore/leadflow/login/models/IStorageService", "@ng-bootstrap/ng-bootstrap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    require("app/vppcore/leadflow/login/models/IStorageService");
    var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
    var ConfirmModal = (function () {
        function ConfirmModal(modalInstance) {
            this.modalInstance = modalInstance;
            this.title = "";
            this.message = "";
            this.okBtn = "CONFIRM";
            this.noBtn = "CANCEL";
        }
        ConfirmModal_1 = ConfirmModal;
        ConfirmModal.prototype.no = function () {
            this.modalInstance.close(false);
        };
        ConfirmModal.prototype.yes = function () {
            this.modalInstance.close(true);
        };
        ConfirmModal.open = function (modalService, message, title, okBtn, noBtn) {
            if (title === void 0) { title = "Confirm"; }
            if (okBtn === void 0) { okBtn = "CONFIRM"; }
            if (noBtn === void 0) { noBtn = "CANCEL"; }
            var modal = modalService.open(ConfirmModal_1, {
                backdrop: 'static',
            });
            modal.componentInstance.title = title;
            modal.componentInstance.message = message;
            modal.componentInstance.okBtn = okBtn;
            modal.componentInstance.noBtn = noBtn;
            return modal.result;
        };
        ConfirmModal = ConfirmModal_1 = __decorate([
            core_1.Component({
                templateUrl: './confirm.modal.html'
            }),
            __metadata("design:paramtypes", [ng_bootstrap_1.NgbActiveModal])
        ], ConfirmModal);
        return ConfirmModal;
        var ConfirmModal_1;
    }());
    exports.ConfirmModal = ConfirmModal;
});
//# sourceMappingURL=confirm.modal.js.map