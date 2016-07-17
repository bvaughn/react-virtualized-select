/** @flow */
import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import { AutoSizer, VirtualScroll } from 'react-virtualized'

export default class VirtualizedSelect extends Component {

  static propTypes = {
    maxHeight: PropTypes.number.isRequired,
    optionHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
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

  /** See VirtualScroll#recomputeRowHeights */
  recomputeOptionHeights (index = 0) {
    this._virtualScroll.recomputeRowHeights(index)
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
    const { optionHeight, optionRenderer } = this.props
    const focusedOptionIndex = options.indexOf(focusedOption)
    const height = this._calculateVirtualScrollHeight({ options })
    const innerRowRenderer = optionRenderer || this._optionRenderer

    function wrappedRowRenderer ({ index }) {
      const option = options[index]

      return innerRowRenderer({
        focusedOption,
        focusedOptionIndex,
        focusOption,
        labelKey,
        option,
        optionIndex: index,
        options,
        selectValue,
        valueArray
      })
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
            <VirtualScroll
              className='VirtualSelectGrid'
              height={height}
              ref={(ref) => this._virtualScroll = ref}
              rowCount={options.length}
              rowHeight={({ index }) => optionHeight({
                option: options[index]
              })}
              rowRenderer={wrappedRowRenderer}
              scrollToIndex={focusedOptionIndex}
              width={width}
            />
        )}
      </AutoSizer>
    )
  }

  _calculateVirtualScrollHeight ({ options }) {
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

  _optionRenderer ({ focusedOption, focusOption, labelKey, option, selectValue }) {
    const height = this._getOptionHeight({ option })

    const className = option === focusedOption
      ? 'VirtualizedSelectOption VirtualizedSelectFocusedOption'
      : 'VirtualizedSelectOption'

    return (
      <div
        className={className}
        onClick={() => selectValue(option)}
        onMouseOver={() => focusOption(option)}
        style={{ height }}
      >
        {option[labelKey]}
      </div>
    )
  }
}
