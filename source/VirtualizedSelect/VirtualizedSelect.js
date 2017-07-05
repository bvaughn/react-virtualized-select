/** @flow */
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Select from 'react-select'

// Import directly to avoid Webpack bundling the parts of react-virtualized that we are not using
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'

export default class VirtualizedSelect extends Component {

  static propTypes = {
    async: PropTypes.bool,
    listProps: PropTypes.object,
    maxHeight: PropTypes.number.isRequired,
    optionHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    optionRenderer: PropTypes.func,
    selectComponent: PropTypes.func
  };

  static defaultProps = {
    async: false,
    maxHeight: 200,
    optionHeight: 35
  };

  constructor (props, context) {
    super(props, context)

    this._renderMenu = this._renderMenu.bind(this)
    this._optionRenderer = this._optionRenderer.bind(this)
    this._setListRef = this._setListRef.bind(this)
    this._setSelectRef = this._setSelectRef.bind(this)
  }

  /** See List#recomputeRowHeights */
  recomputeOptionHeights (index = 0) {
    if (this._listRef) {
      this._listRef.recomputeRowHeights(index)
    }
  }

  /** See Select#focus (in react-select) */
  focus () {
    if (this._selectRef) {
      return this._selectRef.focus()
    }
  }

  render () {
    const SelectComponent = this._getSelectComponent()

    return (
      <SelectComponent
        {...this.props}
        ref={this._setSelectRef}
        menuRenderer={this._renderMenu}
        menuStyle={{ overflow: 'hidden' }}
      />
    )
  }

  // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing
  _renderMenu ({ focusedOption, focusOption, labelKey, onSelect, options, selectValue, valueArray }) {
    const { listProps, optionRenderer } = this.props
    const focusedOptionIndex = options.indexOf(focusedOption)
    const height = this._calculateListHeight({ options })
    const innerRowRenderer = optionRenderer || this._optionRenderer

    // react-select 1.0.0-rc2 passes duplicate `onSelect` and `selectValue` props to `menuRenderer`
    // The `Creatable` HOC only overrides `onSelect` which breaks an edge-case
    // In order to support creating items via clicking on the placeholder option,
    // We need to ensure that the specified `onSelect` handle is the one we use.
    // See issue #33

    function wrappedRowRenderer ({ index, key, style }) {
      const option = options[index]

      return innerRowRenderer({
        focusedOption,
        focusedOptionIndex,
        focusOption,
        key,
        labelKey,
        onSelect,
        option,
        optionIndex: index,
        options,
        selectValue: onSelect,
        style,
        valueArray
      })
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            className='VirtualSelectGrid'
            height={height}
            ref={this._setListRef}
            rowCount={options.length}
            rowHeight={({ index }) => this._getOptionHeight({
              option: options[index]
            })}
            rowRenderer={wrappedRowRenderer}
            scrollToIndex={focusedOptionIndex}
            width={width}
            {...listProps}
          />
        )}
      </AutoSizer>
    )
  }

  _calculateListHeight ({ options }) {
    const { maxHeight } = this.props

    let height = 0

    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
      let option = options[optionIndex]

      height += this._getOptionHeight({ option })

      if (height > maxHeight) {
        return maxHeight
      }
    }

    return height
  }

  _getOptionHeight ({ option }) {
    const { optionHeight } = this.props

    return optionHeight instanceof Function
      ? optionHeight({ option })
      : optionHeight
  }

  _getSelectComponent () {
    const { async, selectComponent } = this.props

    if (selectComponent) {
      return selectComponent
    } else if (async) {
      return Select.Async
    } else {
      return Select
    }
  }

  _optionRenderer ({ focusedOption, focusOption, key, labelKey, option, selectValue, style, valueArray }) {
    const className = ['VirtualizedSelectOption']

    if (option === focusedOption) {
      className.push('VirtualizedSelectFocusedOption')
    }

    if (option.disabled) {
      className.push('VirtualizedSelectDisabledOption')
    }

    if (valueArray && valueArray.indexOf(option) >= 0) {
      className.push('VirtualizedSelectSelectedOption')
    }

    if (option.className) {
      className.push(option.className)
    }

    const events = option.disabled
      ? {}
      : {
        onClick: () => selectValue(option),
        onMouseOver: () => focusOption(option)
      }

    return (
      <div
        className={className.join(' ')}
        key={key}
        style={style}
        title={option.title}
        {...events}
      >
        {option[labelKey]}
      </div>
    )
  }

  _setListRef (ref) {
    this._listRef = ref
  }

  _setSelectRef (ref) {
    this._selectRef = ref
  }
}
