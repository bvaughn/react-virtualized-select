/** @flow */
import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { AutoSizer, VirtualScroll } from 'react-virtualized'

export default class VirtualizedSelect extends Component {

  static propTypes = {
    maxHeight: PropTypes.number.isRequired,
    optionHeight: PropTypes.number.isRequired,
    optionRenderer: PropTypes.func
  };

  static defaultProps = {
    maxHeight: 200,
    optionHeight: 35
  };

  constructor (props, context) {
    super(props, context)

    this._renderMenu = this._renderMenu.bind(this)
    this._optionRenderer = this._optionRenderer.bind(this)
  }

  render () {
    return (
      <Select
        {...this.props}
        menuRenderer={this._renderMenu}
        menuStyle={{ overflow: 'hidden' }}
      />
    )
  }

  // See https://github.com/JedWatson/react-select/#effeciently-rendering-large-lists-with-windowing
  _renderMenu ({ focusedOption, focusOption, labelKey, options, selectValue, valueArray }) {
    const { maxHeight, optionHeight, optionRenderer } = this.props
    const focusedOptionIndex = options.indexOf(focusedOption)
    const height = Math.min(maxHeight, options.length * optionHeight)
    const innerRowRenderer = optionRenderer || this._optionRenderer

    function wrappedRowRenderer (index) {
      const option = options[index]

      return innerRowRenderer({ focusedOption, focusedOptionIndex, focusOption, labelKey, option, options, selectValue, valueArray })
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
            <VirtualScroll
              className='VirtualSelectGrid'
              height={height}
              rowHeight={optionHeight}
              rowRenderer={wrappedRowRenderer}
              rowsCount={options.length}
              scrollToIndex={focusedOptionIndex}
              width={width}
            />
        )}
      </AutoSizer>
    )
  }

  _optionRenderer ({ focusedOption, focusOption, labelKey, option, selectValue }) {
    const { optionHeight } = this.props

    const className = option === focusedOption
      ? 'VirtualizedSelectOption VirtualizedSelectFocusedOption'
      : 'VirtualizedSelectOption'

    return (
      <div
        className={className}
        onMouseOver={() => focusOption(option)}
        onClick={() => selectValue(option)}
        style={{
          height: optionHeight
        }}
      >
        {option[labelKey]}
      </div>
    )
  }
}
