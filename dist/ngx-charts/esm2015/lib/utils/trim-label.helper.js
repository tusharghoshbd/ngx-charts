/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} s
 * @param {?=} max
 * @return {?}
 */
export function trimLabel(s, max = 5) {
    if (typeof s !== 'string') {
        if (typeof s === 'number') {
            return s + '';
        }
        else {
            return '';
        }
    }
    s = s.trim();
    if (s.length <= max) {
        return s;
    }
    else {
        return `${s.slice(0, max)}...`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbS1sYWJlbC5oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdHVzaGFyZ2hvc2hiZC9uZ3gtY2hhcnRzLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3RyaW0tbGFiZWwuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU0sVUFBVSxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ2xDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3pCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0tBQ0Y7SUFFRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtRQUNuQixPQUFPLENBQUMsQ0FBQztLQUNWO1NBQU07UUFDTCxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQztLQUNoQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gdHJpbUxhYmVsKHMsIG1heCA9IDUpOiBzdHJpbmcge1xyXG4gIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcclxuICAgIGlmICh0eXBlb2YgcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuIHMgKyAnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHMgPSBzLnRyaW0oKTtcclxuICBpZiAocy5sZW5ndGggPD0gbWF4KSB7XHJcbiAgICByZXR1cm4gcztcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGAke3Muc2xpY2UoMCwgbWF4KX0uLi5gO1xyXG4gIH1cclxufVxyXG4iXX0=