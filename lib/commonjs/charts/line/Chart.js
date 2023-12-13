"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChart = LineChart;
exports.LineChartDimensionsContext = void 0;

var React = _interopRequireWildcard(require("react"));

var d3Shape = _interopRequireWildcard(require("d3-shape"));

var _reactNative = require("react-native");

var _Data = require("./Data");

var _reactNativeRedash = require("react-native-redash");

var _utils = require("./utils");

var _Context = require("./Context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const LineChartDimensionsContext = /*#__PURE__*/React.createContext({
  width: 0,
  height: 0,
  pointWidth: 0,
  parsedPath: {},
  path: '',
  area: '',
  shape: d3Shape.curveBumpX,
  gutter: 0,
  pathWidth: 0
});
exports.LineChartDimensionsContext = LineChartDimensionsContext;

const {
  width: screenWidth
} = _reactNative.Dimensions.get('window');

LineChart.displayName = 'LineChart';

function LineChart({
  children,
  yGutter = 16,
  width = screenWidth,
  height = screenWidth,
  shape = d3Shape.curveBumpX,
  id,
  absolute,
  ...props
}) {
  const {
    yDomain,
    xLength,
    xDomain
  } = React.useContext(_Context.LineChartContext);
  const {
    data
  } = (0, _Data.useLineChartData)({
    id
  });
  const pathWidth = React.useMemo(() => {
    let allowedWidth = width;

    if (xLength > data.length) {
      allowedWidth = width * data.length / xLength;
    }

    return allowedWidth;
  }, [data.length, width, xLength]);
  const path = React.useMemo(() => {
    if (data && data.length > 0) {
      return (0, _utils.getPath)({
        data,
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
        xDomain
      });
    }

    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain, xDomain]);
  const area = React.useMemo(() => {
    if (data && data.length > 0) {
      return (0, _utils.getArea)({
        data,
        width: pathWidth,
        height,
        gutter: yGutter,
        shape,
        yDomain,
        xDomain
      });
    }

    return '';
  }, [data, pathWidth, height, yGutter, shape, yDomain, xDomain]);
  const dataLength = data.length;
  const parsedPath = React.useMemo(() => (0, _reactNativeRedash.parse)(path), [path]);
  const pointWidth = React.useMemo(() => width / (dataLength - 1), [dataLength, width]);
  const contextValue = React.useMemo(() => ({
    gutter: yGutter,
    parsedPath,
    pointWidth,
    area,
    path,
    width,
    height,
    pathWidth,
    shape
  }), [yGutter, parsedPath, pointWidth, area, path, width, height, pathWidth, shape]);
  return /*#__PURE__*/React.createElement(_Data.LineChartIdProvider, {
    id: id
  }, /*#__PURE__*/React.createElement(LineChartDimensionsContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, props, {
    style: [absolute && styles.absolute, props.style]
  }), children)));
}

const styles = _reactNative.StyleSheet.create({
  absolute: {
    position: 'absolute'
  }
});
//# sourceMappingURL=Chart.js.map