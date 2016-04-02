import React, { Component, PropTypes } from 'react'
import VirtualizedSelect from './VirtualizedSelect'

export default class VirtualizedSelectExample extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      clearable: true,
      disabled: false,
      searchable: true,
      selectedValue: null
    }

    this._updateValue = this._updateValue.bind(this)
  }

  render () {
    const { options } = this.props
    const { clearable, disabled, searchable, selectedValue } = this.state

    return (
      <div>
        <VirtualizedSelect
          autofocus
          clearable={clearable}
          disabled={disabled}
          labelKey='name'
          name='selected-state'
          onChange={this._updateValue}
          options={options}
          searchable={searchable}
          simpleValue
          value={selectedValue}
          valueKey='name'
        />

        <ul>
          <li>
            <label>
              <input
                defaultChecked={disabled}
                name='disabled'
                onChange={(event) => this.setState({ disabled: event.target.checked })}
                type='checkbox'
              />
              Disabled?
            </label>
          </li>
          <li>
            <label>
              <input
                defaultChecked={searchable}
                name='searchable'
                onChange={(event) => this.setState({ searchable: event.target.checked })}
                type='checkbox'
              />
              Searchable?
            </label>
          </li>
          <li>
            <label>
              <input
                defaultChecked={clearable}
                name='clearable'
                onChange={(event) => this.setState({ clearable: event.target.checked })}
                type='checkbox'
              />
              Clearable?
            </label>
          </li>
        </ul>
      </div>
    )
  }

  _updateValue (value) {
    this.setState({
      selectedValue: value
    })
  }
}
