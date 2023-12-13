"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChartTooltip = LineChartTooltip;

var React = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _PriceText = require("./PriceText");

var _Cursor = require("./Cursor");

var _Chart = require("./Chart");

var _getXPositionForCurve = require("./utils/getXPositionForCurve");

var _reactNativeRedash = require("react-native-redash");

var _useLineChart = require("./useLineChart");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

LineChartTooltip.displayName = 'LineChartTooltip';

function LineChartTooltip({
  children,
  xGutter = 8,
  yGutter = 8,
  cursorGutter = 48,
  position = 'top',
  textProps,
  textStyle,
  at,
  ...props
}) {
  const {
    width,
    height,
    parsedPath
  } = React.useContext(_Chart.LineChartDimensionsContext);
  const {
    type
  } = React.useContext(_Cursor.CursorContext);
  const {
    currentX,
    currentY,
    isActive
  } = (0, _useLineChart.useLineChart)();
  const x = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  const elementHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const handleLayout = React.useCallback(event => {
    x.value = event.nativeEvent.layout.x;
    elementWidth.value = event.nativeEvent.layout.width;
    elementHeight.value = event.nativeEvent.layout.height;
  }, [elementHeight, elementWidth, x]); // When the user set a `at` index, get the index's y & x positions

  const atXPosition = (0, React.useMemo)(() => at !== null && at !== undefined ? (0, _getXPositionForCurve.getXPositionForCurve)(parsedPath, at) : undefined, [at, parsedPath]);
  const atYPosition = (0, _reactNativeReanimated.useDerivedValue)(() => {
    var _getYForX;

    return atXPosition == null ? undefined : (_getYForX = (0, _reactNativeRedash.getYForX)(parsedPath, atXPosition)) !== null && _getYForX !== void 0 ? _getYForX : 0;
  }, [atXPosition]);
  const animatedCursorStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    var _atYPosition$value;

    let translateXOffset = elementWidth.value / 2; // the tooltip is considered static when the user specified an `at` prop

    const isStatic = atYPosition.value != null; // Calculate X position:

    const x = atXPosition !== null && atXPosition !== void 0 ? atXPosition : currentX.value;

    if (x < elementWidth.value / 2 + xGutter) {
      const xOffset = elementWidth.value / 2 + xGutter - x;
      translateXOffset = translateXOffset - xOffset;
    }

    if (x > width - elementWidth.value / 2 - xGutter) {
      const xOffset = x - (width - elementWidth.value / 2 - xGutter);
      translateXOffset = translateXOffset + xOffset;
    } // Calculate Y position:


    let translateYOffset = 0;
    const y = (_atYPosition$value = atYPosition.value) !== null && _atYPosition$value !== void 0 ? _atYPosition$value : currentY.value;

    if (position === 'top') {
      translateYOffset = elementHeight.value / 2 + cursorGutter;

      if (y - translateYOffset < yGutter) {
        translateYOffset = y - yGutter;
      }
    } else if (position === 'bottom') {
      translateYOffset = -(elementHeight.value / 2) - cursorGutter / 2;

      if (y - translateYOffset + elementHeight.value > height - yGutter) {
        translateYOffset = y - (height - yGutter) + elementHeight.value;
      }
    } // determine final translateY value


    let translateY;

    if (type === 'crosshair' || isStatic) {
      translateY = y - translateYOffset;
    } else {
      if (position === 'top') {
        translateY = yGutter;
      } else {
        translateY = height - elementHeight.value - yGutter;
      }
    }

    let opacity = isActive.value ? 1 : 0;

    if (isStatic) {
      // Only show static when there is no active cursor
      opacity = (0, _reactNativeReanimated.withTiming)(isActive.value ? 0 : 1);
    }

    return {
      transform: [{
        translateX: x - translateXOffset
      }, {
        translateY: translateY
      }],
      opacity: opacity
    };
  }, [atXPosition, atYPosition.value, currentX.value, currentY.value, cursorGutter, elementHeight.value, elementWidth.value, height, isActive.value, position, type, width, xGutter, yGutter]);
  return /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, _extends({
    onLayout: handleLayout
  }, props, {
    style: [{
      position: 'absolute',
      padding: 4,
      alignSelf: 'flex-start'
    }, animatedCursorStyle, props.style]
  }), children || /*#__PURE__*/React.createElement(_PriceText.LineChartPriceText, _extends({
    index: at,
    style: [textStyle]
  }, textProps)));
}
//# sourceMappingURL=Tooltip.js.map