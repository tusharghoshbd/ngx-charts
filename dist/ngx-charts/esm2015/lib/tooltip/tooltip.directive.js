/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
export class TooltipDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.offset = 10;
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        // console.log("onMouseEnter")
        if (!this.tooltip) {
            this.show();
        }
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        // console.log("onMouseLeave")
        if (this.tooltip) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    show() {
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
    }
    /**
     * @return {?}
     */
    hide() {
        this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
        window.setTimeout((/**
         * @return {?}
         */
        () => {
            this.renderer.removeChild(document.body, this.tooltip);
            this.tooltip = null;
        }), this.delay);
    }
    /**
     * @return {?}
     */
    create() {
        this.tooltip = this.renderer.createElement('span');
        this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipTitle) // textNode
        );
        this.renderer.appendChild(document.body, this.tooltip);
        // this.renderer.appendChild(this.el.nativeElement, this.tooltip);
        this.renderer.addClass(this.tooltip, 'ng-tooltip');
        this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);
        this.renderer.setStyle(this.tooltip, 'border', "2px solid " + this.tooltipColor);
        // delay 설정
        this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
        this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
    }
    /**
     * @return {?}
     */
    setPosition() {
        /** @type {?} */
        const hostPos = this.el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        const tooltipPos = this.tooltip.getBoundingClientRect();
        /** @type {?} */
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        /** @type {?} */
        let top;
        /** @type {?} */
        let left;
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
        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }
}
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tooltip]'
            },] }
];
/** @nocollapse */
TooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
TooltipDirective.propDecorators = {
    tooltipTitle: [{ type: Input, args: ['tooltip',] }],
    placement: [{ type: Input }],
    delay: [{ type: Input }],
    tooltipColor: [{ type: Input }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3Rvb2x0aXAvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3RGLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBUXpCLFlBQW9CLEVBQWMsRUFBVSxRQUFtQjtRQUEzQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUYvRCxXQUFNLEdBQUMsRUFBRSxDQUFDO0lBRXlELENBQUM7Ozs7SUFFeEMsWUFBWTtRQUNwQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FBRTtJQUN2QyxDQUFDOzs7O0lBRTJCLFlBQVk7UUFDcEMsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUFFO0lBQ3RDLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFR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QUFFLG9DQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3Rvb2x0aXBdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSB7XHJcbiAgICBASW5wdXQoJ3Rvb2x0aXAnKSB0b29sdGlwVGl0bGU6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHBsYWNlbWVudDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgZGVsYXk6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIHRvb2x0aXBDb2xvcjogbnVtYmVyO1xyXG4gICAgdG9vbHRpcDogSFRNTEVsZW1lbnQ7XHJcbiAgICBvZmZzZXQ9MTA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgb25Nb3VzZUVudGVyKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Nb3VzZUVudGVyXCIpXHJcbiAgICAgICAgaWYgKCF0aGlzLnRvb2x0aXApIHsgdGhpcy5zaG93KCk7IH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Nb3VzZUxlYXZlXCIpXHJcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkgeyB0aGlzLmhpZGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsICduZy10b29sdGlwLXNob3cnKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy50b29sdGlwLCAnbmctdG9vbHRpcC1zaG93Jyk7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMudG9vbHRpcCk7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcD1udWxsO1xyXG4gICAgICAgIH0sIHRoaXMuZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLnRvb2x0aXA9dGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcCxcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMudG9vbHRpcFRpdGxlKSAvLyB0ZXh0Tm9kZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy50b29sdGlwKTtcclxuICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy50b29sdGlwKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsICduZy10b29sdGlwJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsIGBuZy10b29sdGlwLSR7dGhpcy5wbGFjZW1lbnR9YCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICdib3JkZXInLCBcIjJweCBzb2xpZCBcIit0aGlzLnRvb2x0aXBDb2xvcik7XHJcbiAgICAgICAgLy8gZGVsYXkg7ISk7KCVXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICctd2Via2l0LXRyYW5zaXRpb24nLCBgb3BhY2l0eSAke3RoaXMuZGVsYXl9bXNgKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJy1tb3otdHJhbnNpdGlvbicsIGBvcGFjaXR5ICR7dGhpcy5kZWxheX1tc2ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnLW8tdHJhbnNpdGlvbicsIGBvcGFjaXR5ICR7dGhpcy5kZWxheX1tc2ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAndHJhbnNpdGlvbicsIGBvcGFjaXR5ICR7dGhpcy5kZWxheX1tc2ApO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNldFBvc2l0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGhvc3RQb3M9dGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBjb25zdCB0b29sdGlwUG9zPXRoaXMudG9vbHRpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zPXdpbmRvdy5wYWdlWU9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B8fDA7XHJcblxyXG4gICAgICAgIGxldCB0b3AsIGxlZnQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudD09PSd0b3AnKSB7XHJcbiAgICAgICAgICAgIHRvcD1ob3N0UG9zLnRvcC10b29sdGlwUG9zLmhlaWdodC10aGlzLm9mZnNldDtcclxuICAgICAgICAgICAgbGVmdD1ob3N0UG9zLmxlZnQrKGhvc3RQb3Mud2lkdGgtdG9vbHRpcFBvcy53aWR0aCkvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudD09PSdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHRvcD1ob3N0UG9zLmJvdHRvbSt0aGlzLm9mZnNldDtcclxuICAgICAgICAgICAgbGVmdD1ob3N0UG9zLmxlZnQrKGhvc3RQb3Mud2lkdGgtdG9vbHRpcFBvcy53aWR0aCkvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudD09PSdsZWZ0Jykge1xyXG4gICAgICAgICAgICB0b3A9aG9zdFBvcy50b3ArKGhvc3RQb3MuaGVpZ2h0LXRvb2x0aXBQb3MuaGVpZ2h0KS8yO1xyXG4gICAgICAgICAgICBsZWZ0PWhvc3RQb3MubGVmdC10b29sdGlwUG9zLndpZHRoLXRoaXMub2Zmc2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50PT09J3JpZ2h0Jykge1xyXG4gICAgICAgICAgICB0b3A9aG9zdFBvcy50b3ArKGhvc3RQb3MuaGVpZ2h0LXRvb2x0aXBQb3MuaGVpZ2h0KS8yO1xyXG4gICAgICAgICAgICBsZWZ0PWhvc3RQb3MucmlnaHQrdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJ3RvcCcsIGAke3RvcCtzY3JvbGxQb3N9cHhgKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XHJcbiAgICB9XHJcbn1cclxuIl19