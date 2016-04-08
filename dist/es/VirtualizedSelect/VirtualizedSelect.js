
import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import { AutoSizer, VirtualScroll } from 'react-virtualized';

var VirtualizedSelect = function (_Component) {
  babelHelpers.inherits(VirtualizedSelect, _Component);

  function VirtualizedSelect(props, context) {
    babelHelpers.classCallCheck(this, VirtualizedSelect);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(VirtualizedSelect).call(this, props, context));

    _this._renderMenu = _this._renderMenu.bind(_this);
    _this._optionRenderer = _this._optionRenderer.bind(_this);
    return _this;
  }

  babelHelpers.createClass(VirtualizedSelect, [{
    key: 'render',
    value: function render() {
      return React.createElement(Select, babelHelpers.extends({}, this.props, {
        menuRenderer: this._renderMenu,
        menuStyle: { overflow: 'hidden' }
      }));
    }

    // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing

  }, {
    key: '_renderMenu',
    value: function _renderMenu(_ref) {
      var focusedOption = _ref.focusedOption;
      var focusOption = _ref.focusOption;
      var labelKey = _ref.labelKey;
      var options = _ref.options;
      var selectValue = _ref.selectValue;
      var valueArray = _ref.valueArray;
      var _props = this.props;
      var maxHeight = _props.maxHeight;
      var optionHeight = _props.optionHeight;
      var optionRenderer = _props.optionRenderer;

      var focusedOptionIndex = options.indexOf(focusedOption);
      var height = Math.min(maxHeight, options.length * optionHeight);
      var innerRowRenderer = optionRenderer || this._optionRenderer;

      function wrappedRowRenderer(index) {
        var option = options[index];

        return innerRowRenderer({ focusedOption: focusedOption, focusedOptionIndex: focusedOptionIndex, focusOption: focusOption, labelKey: labelKey, option: option, options: options, selectValue: selectValue, valueArray: valueArray });
      }

      return React.createElement(
        AutoSizer,
        { disableHeight: true },
        function (_ref2) {
          var width = _ref2.width;
          return React.createElement(VirtualScroll, {
            className: 'VirtualSelectGrid',
            height: height,
            rowHeight: optionHeight,
            rowRenderer: wrappedRowRenderer,
            rowsCount: options.length,
            scrollToIndex: focusedOptionIndex,
            width: width
          });
        }
      );
    }
  }, {
    key: '_optionRenderer',
    value: function _optionRenderer(_ref3) {
      var focusedOption = _ref3.focusedOption;
      var focusOption = _ref3.focusOption;
      var labelKey = _ref3.labelKey;
      var option = _ref3.option;
      var selectValue = _ref3.selectValue;
      var optionHeight = this.props.optionHeight;


      var className = option === focusedOption ? 'VirtualizedSelectOption VirtualizedSelectFocusedOption' : 'VirtualizedSelectOption';

      return React.createElement(
        'div',
        {
          className: className,
          onClick: function onClick() {
            return selectValue(option);
          },
          onMouseOver: function onMouseOver() {
            return focusOption(option);
          },
          style: {
            height: optionHeight
          }
        },
        option[labelKey]
      );
    }
  }]);
  return VirtualizedSelect;
}(Component);

VirtualizedSelect.propTypes = {
  maxHeight: PropTypes.number.isRequired,
  optionHeight: PropTypes.number.isRequired,
  optionRenderer: PropTypes.func
};
VirtualizedSelect.defaultProps = {
  maxHeight: 200,
  optionHeight: 35
};
export default VirtualizedSelect;