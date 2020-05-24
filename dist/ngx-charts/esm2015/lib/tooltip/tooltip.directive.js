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
        // 호스트 요소와 tooltip 요소 간의 거리
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
        // 호스트 요소의 사이즈와 위치 정보
        /** @type {?} */
        const hostPos = this.el.nativeElement.getBoundingClientRect();
        // tooltip 요소의 사이즈와 위치 정보
        /** @type {?} */
        const tooltipPos = this.tooltip.getBoundingClientRect();
        // window의 scroll top
        // getBoundingClientRect 메소드는 viewport에서의 상대적인 위치를 반환한다.
        // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
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
        // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3Rvb2x0aXAvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3RGLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBUXpCLFlBQW9CLEVBQWMsRUFBVSxRQUFtQjtRQUEzQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVzs7UUFGL0QsV0FBTSxHQUFDLEVBQUUsQ0FBQztJQUV5RCxDQUFDOzs7O0lBRXhDLFlBQVk7UUFDcEMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQUU7SUFDdkMsQ0FBQzs7OztJQUUyQixZQUFZO1FBQ3BDLDhCQUE4QjtRQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FBRTtJQUN0QyxDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsUUFB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QyxNQUFNLEdBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLEdBQUMsT0FBTyxDQUFDLElBQUksR0FBQyxVQUFVLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUcsT0FBTyxFQUFFO1lBQzFCLEdBQUcsR0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksR0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbEM7UUFFRCxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLEdBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7O1lBL0ZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVzthQUN4Qjs7OztZQUowQixVQUFVO1lBQWdCLFNBQVM7OzsyQkFNekQsS0FBSyxTQUFDLFNBQVM7d0JBQ2YsS0FBSztvQkFDTCxLQUFLOzJCQU9MLFlBQVksU0FBQyxZQUFZOzJCQUt6QixZQUFZLFNBQUMsWUFBWTs7OztJQWQxQix3Q0FBdUM7O0lBQ3ZDLHFDQUEyQjs7SUFDM0IsaUNBQXVCOztJQUN2QixtQ0FBcUI7O0lBRXJCLGtDQUFVOzs7OztJQUVFLDhCQUFzQjs7Ozs7SUFBRSxvQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t0b29sdGlwXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUge1xyXG4gICAgQElucHV0KCd0b29sdGlwJykgdG9vbHRpcFRpdGxlOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBwbGFjZW1lbnQ6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGRlbGF5OiBudW1iZXI7XHJcbiAgICB0b29sdGlwOiBIVE1MRWxlbWVudDtcclxuICAgIC8vIO2YuOyKpO2KuCDsmpTshozsmYAgdG9vbHRpcCDsmpTshowg6rCE7J2YIOqxsOumrFxyXG4gICAgb2Zmc2V0PTEwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIG9uTW91c2VFbnRlcigpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9uTW91c2VFbnRlclwiKVxyXG4gICAgICAgIGlmICghdGhpcy50b29sdGlwKSB7IHRoaXMuc2hvdygpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTW91c2VMZWF2ZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm9uTW91c2VMZWF2ZVwiKVxyXG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXApIHsgdGhpcy5oaWRlKCk7IH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwLCAnbmctdG9vbHRpcC1zaG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMudG9vbHRpcCwgJ25nLXRvb2x0aXAtc2hvdycpO1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZChkb2N1bWVudC5ib2R5LCB0aGlzLnRvb2x0aXApO1xyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXA9bnVsbDtcclxuICAgICAgICB9LCB0aGlzLmRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoKSB7XHJcbiAgICAgICAgdGhpcy50b29sdGlwPXRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAsXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dCh0aGlzLnRvb2x0aXBUaXRsZSkgLy8gdGV4dE5vZGVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMudG9vbHRpcCk7XHJcbiAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMudG9vbHRpcCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwLCAnbmctdG9vbHRpcCcpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwLCBgbmctdG9vbHRpcC0ke3RoaXMucGxhY2VtZW50fWApO1xyXG5cclxuICAgICAgICAvLyBkZWxheSDshKTsoJVcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJy13ZWJraXQtdHJhbnNpdGlvbicsIGBvcGFjaXR5ICR7dGhpcy5kZWxheX1tc2ApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnLW1vei10cmFuc2l0aW9uJywgYG9wYWNpdHkgJHt0aGlzLmRlbGF5fW1zYCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICctby10cmFuc2l0aW9uJywgYG9wYWNpdHkgJHt0aGlzLmRlbGF5fW1zYCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICd0cmFuc2l0aW9uJywgYG9wYWNpdHkgJHt0aGlzLmRlbGF5fW1zYCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zaXRpb24oKSB7XHJcbiAgICAgICAgLy8g7Zi47Iqk7Yq4IOyalOyGjOydmCDsgqzsnbTspojsmYAg7JyE7LmYIOygleuztFxyXG4gICAgICAgIGNvbnN0IGhvc3RQb3M9dGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAvLyB0b29sdGlwIOyalOyGjOydmCDsgqzsnbTspojsmYAg7JyE7LmYIOygleuztFxyXG4gICAgICAgIGNvbnN0IHRvb2x0aXBQb3M9dGhpcy50b29sdGlwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAvLyB3aW5kb3fsnZggc2Nyb2xsIHRvcFxyXG4gICAgICAgIC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCDrqZTshozrk5zripQgdmlld3BvcnTsl5DshJzsnZgg7IOB64yA7KCB7J24IOychOy5mOulvCDrsJjtmZjtlZzri6QuXHJcbiAgICAgICAgLy8g7Iqk7YGs66Gk7J20IOuwnOyDne2VnCDqsr3smrAsIHRvb2x0aXAg7JqU7IaM7J2YIHRvcOyXkCDshLjroZwg7Iqk7YGs66GkIOyijO2RnOqwkuydhCDrsJjsmIHtlZjsl6zslbwg7ZWc64ukLlxyXG4gICAgICAgIGNvbnN0IHNjcm9sbFBvcz13aW5kb3cucGFnZVlPZmZzZXR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B8fGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wfHwwO1xyXG5cclxuICAgICAgICBsZXQgdG9wLCBsZWZ0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQ9PT0ndG9wJykge1xyXG4gICAgICAgICAgICB0b3A9aG9zdFBvcy50b3AtdG9vbHRpcFBvcy5oZWlnaHQtdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgICAgIGxlZnQ9aG9zdFBvcy5sZWZ0Kyhob3N0UG9zLndpZHRoLXRvb2x0aXBQb3Mud2lkdGgpLzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQ9PT0nYm90dG9tJykge1xyXG4gICAgICAgICAgICB0b3A9aG9zdFBvcy5ib3R0b20rdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgICAgIGxlZnQ9aG9zdFBvcy5sZWZ0Kyhob3N0UG9zLndpZHRoLXRvb2x0aXBQb3Mud2lkdGgpLzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQ9PT0nbGVmdCcpIHtcclxuICAgICAgICAgICAgdG9wPWhvc3RQb3MudG9wKyhob3N0UG9zLmhlaWdodC10b29sdGlwUG9zLmhlaWdodCkvMjtcclxuICAgICAgICAgICAgbGVmdD1ob3N0UG9zLmxlZnQtdG9vbHRpcFBvcy53aWR0aC10aGlzLm9mZnNldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudD09PSdyaWdodCcpIHtcclxuICAgICAgICAgICAgdG9wPWhvc3RQb3MudG9wKyhob3N0UG9zLmhlaWdodC10b29sdGlwUG9zLmhlaWdodCkvMjtcclxuICAgICAgICAgICAgbGVmdD1ob3N0UG9zLnJpZ2h0K3RoaXMub2Zmc2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g7Iqk7YGs66Gk7J20IOuwnOyDne2VnCDqsr3smrAsIHRvb2x0aXAg7JqU7IaM7J2YIHRvcOyXkCDshLjroZwg7Iqk7YGs66GkIOyijO2RnOqwkuydhCDrsJjsmIHtlZjsl6zslbwg7ZWc64ukLlxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAndG9wJywgYCR7dG9wK3Njcm9sbFBvc31weGApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcclxuICAgIH1cclxufVxyXG4iXX0=