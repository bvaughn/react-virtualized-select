import React, { Component, PropTypes } from 'react'
import VirtualizedSelect from './VirtualizedSelect'
import styles from './VirtualizedSelect.example.css'

export default class VirtualizedSelectExample extends Component {
  static propTypes = {
    cityData: PropTypes.array.isRequired,
    countryData: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      clearable: true,
      disabled: false,
      multi: false,
      searchable: true,
      selectedCity: null
    }
  }

  render () {
    const { cityData, countryData } = this.props
    const { clearable, disabled, multi, searchable, selectedCity, selectedCountry } = this.state

    return (
      <div>
        <h4 className={styles.header}>
          Default Option Renderer
        </h4>

        <div className={styles.description}>
          Displays a list of the 1,000 largest cities in the world using the default option-renderer.
        </div>

        <VirtualizedSelect
          autofocus
          clearable={clearable}
          disabled={disabled}
          labelKey='name'
          multi={multi}
          name='city'
          onChange={(selectedCity) => this.setState({ selectedCity })}
          options={cityData}
          searchable={searchable}
          simpleValue
          value={selectedCity}
          valueKey='name'
        />

        <ul className={styles.optionsList}>
          <li className={styles.optionListItem}>
            <label>
              <input
                defaultChecked={multi}
                name='multi'
                onChange={(event) => this.setState({ multi: event.target.checked })}
                type='checkbox'
              />
              Multi-select?
            </label>
          </li>
          <li className={styles.optionListItem}>
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
          <li className={styles.optionListItem}>
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
          <li className={styles.optionListItem}>
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
        </ul>

        <h4 className={styles.header}>
          Custom Option Renderer
        </h4>

        <div className={styles.description}>
          Displays a list of world countries using a custom option renderer.
        </div>

        <VirtualizedSelect
          labelKey='name'
          name='country'
          onChange={(selectedCountry) => this.setState({ selectedCountry })}
          optionRenderer={CountryOptionRenderer}
          optionHeight={40}
          options={countryData}
          simpleValue
          value={selectedCountry}
          valueKey='code'
        />
      </div>
    )
  }
}

function CountryOptionRenderer ({ focusedOption, focusedOptionIndex, focusOption, labelKey, option, options, selectValue, valueArray }) {
  const flagImageUrl = `https://rawgit.com/hjnilsson/country-flags/master/svg/${option.code.toLowerCase()}.svg`

  const classNames = [styles.countryOption]
  if (option === focusedOption) {
    classNames.push(styles.countryOptionFocused)
  }
  if (valueArray.indexOf(option) >= 0) {
    classNames.push(styles.countryOptionSelected)
  }

  return (
    <div
      className={classNames.join(' ')}
      onClick={() => selectValue(option)}
      onMouseOver={() => focusOption(option)}
    >
      <label className={styles.countryLabel}>
        {option.name}
      </label>
      <img
        className={styles.countryFlag}
        src={flagImageUrl}
      />
    </div>
  )
}
