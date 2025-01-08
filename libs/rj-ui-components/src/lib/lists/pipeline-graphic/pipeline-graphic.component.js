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
        define(["require", "exports", "@angular/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var Lookups = app.common.lookups;
    var PipelineGraphicComponent = (function () {
        function PipelineGraphicComponent() {
        }
        PipelineGraphicComponent.prototype.ngOnInit = function () {
            this.pipelineStages = Lookups.Stages.getAllStages(app.common.constants.PipelineType.Contact)
                .sort(function (a, b) {
                return a.value - b.value;
            });
        };
        PipelineGraphicComponent.prototype.isStageEqualOrBefore = function (pipelineStageId) {
            return pipelineStageId <= this.pipelineStageId;
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], PipelineGraphicComponent.prototype, "pipelineStageId", void 0);
        PipelineGraphicComponent = __decorate([
            core_1.Component({
                selector: 'pipeline-graphic',
                templateUrl: "./pipeline-graphic.component.html",
                styleUrls: ["./pipeline-graphic.component.css"]
            })
        ], PipelineGraphicComponent);
        return PipelineGraphicComponent;
    }());
    exports.PipelineGraphicComponent = PipelineGraphicComponent;
});
//# sourceMappingURL=pipeline-graphic.component.js.map