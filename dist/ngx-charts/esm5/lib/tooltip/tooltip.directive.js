/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.offset = 10;
    }
    /**
     * @return {?}
     */
    TooltipDirective.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        // console.log("onMouseEnter")
        if (!this.tooltip) {
            this.show();
        }
    };
    /**
     * @return {?}
     */
    TooltipDirective.prototype.onMouseLeave = /**
     * @return {?}
     */
    function () {
        // console.log("onMouseLeave")
        if (this.tooltip) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    TooltipDirective.prototype.show = /**
     * @return {?}
     */
    function () {
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
    };
    /**
     * @return {?}
     */
    TooltipDirective.prototype.hide = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
        window.setTimeout((/**
         * @return {?}
         */
        function () {
            _this.renderer.removeChild(document.body, _this.tooltip);
            _this.tooltip = null;
        }), this.delay);
    };
    /**
     * @return {?}
     */
    TooltipDirective.prototype.create = /**
     * @return {?}
     */
    function () {
        this.tooltip = this.renderer.createElement('span');
        this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipTitle) // textNode
        );
        this.renderer.appendChild(document.body, this.tooltip);
        // this.renderer.appendChild(this.el.nativeElement, this.tooltip);
        this.renderer.addClass(this.tooltip, 'ng-tooltip');
        this.renderer.addClass(this.tooltip, "ng-tooltip-" + this.placement);
        this.renderer.setStyle(this.tooltip, 'border', "2px solid " + this.tooltipColor);
        // delay 설정
        this.renderer.setStyle(this.tooltip, '-webkit-transition', "opacity " + this.delay + "ms");
        this.renderer.setStyle(this.tooltip, '-moz-transition', "opacity " + this.delay + "ms");
        this.renderer.setStyle(this.tooltip, '-o-transition', "opacity " + this.delay + "ms");
        this.renderer.setStyle(this.tooltip, 'transition', "opacity " + this.delay + "ms");
    };
    /**
     * @return {?}
     */
    TooltipDirective.prototype.setPosition = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hostPos = this.el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var tooltipPos = this.tooltip.getBoundingClientRect();
        /** @type {?} */
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        /** @type {?} */
        var top;
        /** @type {?} */
        var left;
        if (this.placement === 'top') {
            top = hostPos.top - tooltipPos.height - this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }
        if (this.placement === 'bottom') {
            top = hostPos.bottom + this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }
        if (this.placement === 'left') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.left - tooltipPos.width - this.offset;
        }
        if (this.placement === 'right') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.right + this.offset;
        }
        this.renderer.setStyle(this.tooltip, 'top', top + scrollPos + "px");
        this.renderer.setStyle(this.tooltip, 'left', left + "px");
    };
    TooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tooltip]'
                },] }
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    TooltipDirective.propDecorators = {
        tooltipTitle: [{ type: Input, args: ['tooltip',] }],
        placement: [{ type: Input }],
        delay: [{ type: Input }],
        tooltipColor: [{ type: Input }],
        onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return TooltipDirective;
}());
export { TooltipDirective };
if (false) {
    /** @type {?} */
    TooltipDirective.prototype.tooltipTitle;
    /** @type {?} */
    TooltipDirective.prototype.placement;
    /** @type {?} */
    TooltipDirective.prototype.delay;
    /** @type {?} */
    TooltipDirective.prototype.tooltipColor;
    /** @type {?} */
    TooltipDirective.prototype.tooltip;
    /** @type {?} */
    TooltipDirective.prototype.offset;
    /**
     * @type {?}
     * @private
     */
    TooltipDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    TooltipDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3Rvb2x0aXAvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRGO0lBV0ksMEJBQW9CLEVBQWMsRUFBVSxRQUFtQjtRQUEzQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUYvRCxXQUFNLEdBQUMsRUFBRSxDQUFDO0lBRXlELENBQUM7Ozs7SUFFeEMsdUNBQVk7OztJQUF4QztRQUNJLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUFFO0lBQ3ZDLENBQUM7Ozs7SUFFMkIsdUNBQVk7OztJQUF4QztRQUNJLDhCQUE4QjtRQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FBRTtJQUN0QyxDQUFDOzs7O0lBRUQsK0JBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7O0lBRUQsK0JBQUk7OztJQUFKO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFVBQVU7OztRQUFDO1lBQ2QsS0FB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Q3ZCLHdDQUE4Qjs7SUFDOUIsbUNBQXFCOztJQUNyQixrQ0FBVTs7Ozs7SUFFRSw4QkFBc0I7Ozs7O0lBQUUsb0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdG9vbHRpcF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIHtcclxuICAgIEBJbnB1dCgndG9vbHRpcCcpIHRvb2x0aXBUaXRsZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgcGxhY2VtZW50OiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgdG9vbHRpcENvbG9yOiBudW1iZXI7XHJcbiAgICB0b29sdGlwOiBIVE1MRWxlbWVudDtcclxuICAgIG9mZnNldD0xMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbk1vdXNlRW50ZXIoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbk1vdXNlRW50ZXJcIilcclxuICAgICAgICBpZiAoIXRoaXMudG9vbHRpcCkgeyB0aGlzLnNob3coKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBvbk1vdXNlTGVhdmUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbk1vdXNlTGVhdmVcIilcclxuICAgICAgICBpZiAodGhpcy50b29sdGlwKSB7IHRoaXMuaGlkZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9vbHRpcCwgJ25nLXRvb2x0aXAtc2hvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnRvb2x0aXAsICduZy10b29sdGlwLXNob3cnKTtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy50b29sdGlwKTtcclxuICAgICAgICAgICAgdGhpcy50b29sdGlwPW51bGw7XHJcbiAgICAgICAgfSwgdGhpcy5kZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKCkge1xyXG4gICAgICAgIHRoaXMudG9vbHRpcD10aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgdGhpcy50b29sdGlwLFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy50b29sdGlwVGl0bGUpIC8vIHRleHROb2RlXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCB0aGlzLnRvb2x0aXApO1xyXG4gICAgICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLnRvb2x0aXApO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9vbHRpcCwgJ25nLXRvb2x0aXAnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9vbHRpcCwgYG5nLXRvb2x0aXAtJHt0aGlzLnBsYWNlbWVudH1gKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJ2JvcmRlcicsIFwiMnB4IHNvbGlkIFwiK3RoaXMudG9vbHRpcENvbG9yKTtcclxuICAgICAgICAvLyBkZWxheSDshKTsoJVcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJy13ZWJraXQtdHJhbnNpdGlvbicsIGBvcGFjaXR5ICR7dGhpcy5kZWxheX1tc2ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnLW1vei10cmFuc2l0aW9uJywgYG9wYWNpdHkgJHt0aGlzLmRlbGF5fW1zYCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICctby10cmFuc2l0aW9uJywgYG9wYWNpdHkgJHt0aGlzLmRlbGF5fW1zYCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICd0cmFuc2l0aW9uJywgYG9wYWNpdHkgJHt0aGlzLmRlbGF5fW1zYCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgaG9zdFBvcz10aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvb2x0aXBQb3M9dGhpcy50b29sdGlwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBzY3JvbGxQb3M9d2luZG93LnBhZ2VZT2Zmc2V0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wfHxkb2N1bWVudC5ib2R5LnNjcm9sbFRvcHx8MDtcclxuXHJcbiAgICAgICAgbGV0IHRvcCwgbGVmdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50PT09J3RvcCcpIHtcclxuICAgICAgICAgICAgdG9wPWhvc3RQb3MudG9wLXRvb2x0aXBQb3MuaGVpZ2h0LXRoaXMub2Zmc2V0O1xyXG4gICAgICAgICAgICBsZWZ0PWhvc3RQb3MubGVmdCsoaG9zdFBvcy53aWR0aC10b29sdGlwUG9zLndpZHRoKS8yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50PT09J2JvdHRvbScpIHtcclxuICAgICAgICAgICAgdG9wPWhvc3RQb3MuYm90dG9tK3RoaXMub2Zmc2V0O1xyXG4gICAgICAgICAgICBsZWZ0PWhvc3RQb3MubGVmdCsoaG9zdFBvcy53aWR0aC10b29sdGlwUG9zLndpZHRoKS8yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50PT09J2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHRvcD1ob3N0UG9zLnRvcCsoaG9zdFBvcy5oZWlnaHQtdG9vbHRpcFBvcy5oZWlnaHQpLzI7XHJcbiAgICAgICAgICAgIGxlZnQ9aG9zdFBvcy5sZWZ0LXRvb2x0aXBQb3Mud2lkdGgtdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQ9PT0ncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHRvcD1ob3N0UG9zLnRvcCsoaG9zdFBvcy5oZWlnaHQtdG9vbHRpcFBvcy5oZWlnaHQpLzI7XHJcbiAgICAgICAgICAgIGxlZnQ9aG9zdFBvcy5yaWdodCt0aGlzLm9mZnNldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAndG9wJywgYCR7dG9wK3Njcm9sbFBvc31weGApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcclxuICAgIH1cclxufVxyXG4iXX0=