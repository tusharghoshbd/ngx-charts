/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        // 호스트 요소와 tooltip 요소 간의 거리
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
        // 호스트 요소의 사이즈와 위치 정보
        /** @type {?} */
        var hostPos = this.el.nativeElement.getBoundingClientRect();
        // tooltip 요소의 사이즈와 위치 정보
        /** @type {?} */
        var tooltipPos = this.tooltip.getBoundingClientRect();
        // window의 scroll top
        // getBoundingClientRect 메소드는 viewport에서의 상대적인 위치를 반환한다.
        // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
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
        // 스크롤이 발생한 경우, tooltip 요소의 top에 세로 스크롤 좌표값을 반영하여야 한다.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3Rvb2x0aXAvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRGO0lBV0ksMEJBQW9CLEVBQWMsRUFBVSxRQUFtQjtRQUEzQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVzs7UUFGL0QsV0FBTSxHQUFDLEVBQUUsQ0FBQztJQUV5RCxDQUFDOzs7O0lBRXhDLHVDQUFZOzs7SUFBeEM7UUFDSSw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FBRTtJQUN2QyxDQUFDOzs7O0lBRTJCLHVDQUFZOzs7SUFBeEM7UUFDSSw4QkFBOEI7UUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQUU7SUFDdEMsQ0FBQzs7OztJQUVELCtCQUFJOzs7SUFBSjtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELCtCQUFJOzs7SUFBSjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxVQUFVOzs7UUFBQztZQUNkLEtB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ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3Rvb2x0aXBdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSB7XHJcbiAgICBASW5wdXQoJ3Rvb2x0aXAnKSB0b29sdGlwVGl0bGU6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIHBsYWNlbWVudDogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgZGVsYXk6IG51bWJlcjtcclxuICAgIHRvb2x0aXA6IEhUTUxFbGVtZW50O1xyXG4gICAgLy8g7Zi47Iqk7Yq4IOyalOyGjOyZgCB0b29sdGlwIOyalOyGjCDqsITsnZgg6rGw66asXHJcbiAgICBvZmZzZXQ9MTA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgb25Nb3VzZUVudGVyKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Nb3VzZUVudGVyXCIpXHJcbiAgICAgICAgaWYgKCF0aGlzLnRvb2x0aXApIHsgdGhpcy5zaG93KCk7IH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwib25Nb3VzZUxlYXZlXCIpXHJcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCkgeyB0aGlzLmhpZGUoKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGUoKTtcclxuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsICduZy10b29sdGlwLXNob3cnKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy50b29sdGlwLCAnbmctdG9vbHRpcC1zaG93Jyk7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMudG9vbHRpcCk7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcD1udWxsO1xyXG4gICAgICAgIH0sIHRoaXMuZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLnRvb2x0aXA9dGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcCxcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMudG9vbHRpcFRpdGxlKSAvLyB0ZXh0Tm9kZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdGhpcy50b29sdGlwKTtcclxuICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy50b29sdGlwKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsICduZy10b29sdGlwJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXAsIGBuZy10b29sdGlwLSR7dGhpcy5wbGFjZW1lbnR9YCk7XHJcblxyXG4gICAgICAgIC8vIGRlbGF5IOyEpOyglVxyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwLCAnLXdlYmtpdC10cmFuc2l0aW9uJywgYG9wYWNpdHkgJHt0aGlzLmRlbGF5fW1zYCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICctbW96LXRyYW5zaXRpb24nLCBgb3BhY2l0eSAke3RoaXMuZGVsYXl9bXNgKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJy1vLXRyYW5zaXRpb24nLCBgb3BhY2l0eSAke3RoaXMuZGVsYXl9bXNgKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcCwgJ3RyYW5zaXRpb24nLCBgb3BhY2l0eSAke3RoaXMuZGVsYXl9bXNgKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbigpIHtcclxuICAgICAgICAvLyDtmLjsiqTtirgg7JqU7IaM7J2YIOyCrOydtOymiOyZgCDsnITsuZgg7KCV67O0XHJcbiAgICAgICAgY29uc3QgaG9zdFBvcz10aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIC8vIHRvb2x0aXAg7JqU7IaM7J2YIOyCrOydtOymiOyZgCDsnITsuZgg7KCV67O0XHJcbiAgICAgICAgY29uc3QgdG9vbHRpcFBvcz10aGlzLnRvb2x0aXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIC8vIHdpbmRvd+ydmCBzY3JvbGwgdG9wXHJcbiAgICAgICAgLy8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0IOuplOyGjOuTnOuKlCB2aWV3cG9ydOyXkOyEnOydmCDsg4HrjIDsoIHsnbgg7JyE7LmY66W8IOuwmO2ZmO2VnOuLpC5cclxuICAgICAgICAvLyDsiqTtgazroaTsnbQg67Cc7IOd7ZWcIOqyveyasCwgdG9vbHRpcCDsmpTshozsnZggdG9w7JeQIOyEuOuhnCDsiqTtgazroaQg7KKM7ZGc6rCS7J2EIOuwmOyYge2VmOyXrOyVvCDtlZzri6QuXHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zPXdpbmRvdy5wYWdlWU9mZnNldHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3B8fDA7XHJcblxyXG4gICAgICAgIGxldCB0b3AsIGxlZnQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudD09PSd0b3AnKSB7XHJcbiAgICAgICAgICAgIHRvcD1ob3N0UG9zLnRvcC10b29sdGlwUG9zLmhlaWdodC10aGlzLm9mZnNldDtcclxuICAgICAgICAgICAgbGVmdD1ob3N0UG9zLmxlZnQrKGhvc3RQb3Mud2lkdGgtdG9vbHRpcFBvcy53aWR0aCkvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudD09PSdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHRvcD1ob3N0UG9zLmJvdHRvbSt0aGlzLm9mZnNldDtcclxuICAgICAgICAgICAgbGVmdD1ob3N0UG9zLmxlZnQrKGhvc3RQb3Mud2lkdGgtdG9vbHRpcFBvcy53aWR0aCkvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlbWVudD09PSdsZWZ0Jykge1xyXG4gICAgICAgICAgICB0b3A9aG9zdFBvcy50b3ArKGhvc3RQb3MuaGVpZ2h0LXRvb2x0aXBQb3MuaGVpZ2h0KS8yO1xyXG4gICAgICAgICAgICBsZWZ0PWhvc3RQb3MubGVmdC10b29sdGlwUG9zLndpZHRoLXRoaXMub2Zmc2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50PT09J3JpZ2h0Jykge1xyXG4gICAgICAgICAgICB0b3A9aG9zdFBvcy50b3ArKGhvc3RQb3MuaGVpZ2h0LXRvb2x0aXBQb3MuaGVpZ2h0KS8yO1xyXG4gICAgICAgICAgICBsZWZ0PWhvc3RQb3MucmlnaHQrdGhpcy5vZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDsiqTtgazroaTsnbQg67Cc7IOd7ZWcIOqyveyasCwgdG9vbHRpcCDsmpTshozsnZggdG9w7JeQIOyEuOuhnCDsiqTtgazroaQg7KKM7ZGc6rCS7J2EIOuwmOyYge2VmOyXrOyVvCDtlZzri6QuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICd0b3AnLCBgJHt0b3Arc2Nyb2xsUG9zfXB4YCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnRvb2x0aXAsICdsZWZ0JywgYCR7bGVmdH1weGApO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==