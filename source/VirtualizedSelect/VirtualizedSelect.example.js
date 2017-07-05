import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Creatable } from 'react-select'
import 'whatwg-fetch'
import VirtualizedSelect from './VirtualizedSelect'
import styles from './VirtualizedSelect.example.css'

export default class VirtualizedSelectExample extends Component {
  static propTypes = {
    cityData: PropTypes.array.isRequired,
    countryData: PropTypes.array.isRequired,
    nameData: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props)

    const creatableOptions = [
      { label: 'Blue', value: '#00F', className: 'MyCustomOptionClass' },
      { label: 'Green', value: '#0F0', className: 'MyCustomOptionClass' },
      { label: 'Red', value: '#F00', className: 'MyCustomOptionClass' }
    ]

    this.state = {
      clearable: true,
      creatableOptions,
      disabled: false,
      githubUsers: [],
      multi: false,
      searchable: true,
      selectedCreatable: null,
      selectedCity: null
    }

    this._loadGithubUsers = this._loadGithubUsers.bind(this)
  }

  render () {
    const { cityData, countryData, nameData } = this.props
    const { clearable, creatableOptions, disabled, githubUsers, multi, searchable, selectedCity, selectedCountry, selectedCreatable, selectedGithubUser, selectedName } = this.state

    return (
      <div>
        <h4 className={styles.header}>
          Default Option Renderer
        </h4>

        <div className={styles.description}>
          Displays a list of the 1,000 largest cities in the world using the default option-renderer.
        </div>

        <div className={styles.description}>
          Cities with names beginning with "y" have been disabled.
        </div>

        <VirtualizedSelect
          autofocus
          clearable={clearable}
          disabled={disabled}
          labelKey='name'
          multi={multi}
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
          onChange={(selectedCountry) => this.setState({ selectedCountry })}
          optionRenderer={CountryOptionRenderer}
          optionHeight={40}
          options={countryData}
          simpleValue
          value={selectedCountry}
          valueKey='code'
        />

        <h4 className={styles.header}>
          Dynamic Height Options
        </h4>

        <div className={styles.description}>
          Displays option-group headers that are sized different than regular options.
          Demonstrates how to use dynamic option heights feature.
        </div>

        <VirtualizedSelect
          labelKey='name'
          onChange={(selectedName) => this.setState({ selectedName })}
          onInputChange={() => this._customOptionHeightsSelect && this._customOptionHeightsSelect.recomputeOptionHeights()}
          optionHeight={({ option }) => option.type === 'header' ? 25 : 35}
          optionRenderer={NameOptionRenderer}
          options={nameData}
          ref={(ref) => this._customOptionHeightsSelect = ref}
          searchable={searchable}
          simpleValue
          value={selectedName}
          valueKey='name'
        />

        <h4 className={styles.header}>
          Async Options
        </h4>

        <div className={styles.description}>
          Displays an async <code>Select</code> component wired up to search for Github users.
        </div>

        <VirtualizedSelect
          async
          backspaceRemoves={false}
          labelKey='login'
          loadOptions={this._loadGithubUsers}
          minimumInput={1}
          onChange={(selectedGithubUser) => this.setState({ selectedGithubUser })}
          onValueClick={this._goToGithubUser}
          options={githubUsers}
          value={selectedGithubUser}
          valueKey='id'
        />

        <h4 className={styles.header}>
          Creatable Options
        </h4>

        <div className={styles.description}>
          Displays a <code>Select.Creatable</code> component that enables users to create their own options.
        </div>

        <VirtualizedSelect
          labelKey='label'
          multi
          onChange={(selectedCreatable) => this.setState({ selectedCreatable })}
          optionHeight={40}
          options={creatableOptions}
          selectComponent={Creatable}
          simpleValue
          value={selectedCreatable}
          valueKey='value'
        />
      </div>
    )
  }

  _goToGithubUser (value) {
    window.open(value.html_url)
  }

  _loadGithubUsers (input) {
    return fetch(`https://api.github.com/search/users?q=${input}`)
      .then((response) => response.json())
      .then((json) => {
        const githubUsers = json.items

        this.setState({ githubUsers })

        return { options: githubUsers }
      })
  }
}

function CountryOptionRenderer ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray }) {
  const flagImageUrl = `https://cdn.rawgit.com/hjnilsson/country-flags/9e827754/svg/${option.code.toLowerCase()}.svg`

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
      key={key}
      onClick={() => selectValue(option)}
      onMouseOver={() => focusOption(option)}
      style={style}
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

function NameOptionRenderer ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, optionIndex, options, selectValue, style, valueArray }) {
  const classNames = [styles.nameOption]

  if (option.type === 'header') {
    classNames.push(styles.nameHeader)

    return (
      <div
        className={classNames.join(' ')}
        key={key}
        style={style}
      >
        {option.name}
      </div>
    )
  } else {
    if (option === focusedOption) {
      classNames.push(styles.nameOptionFocused)
    }
    if (valueArray.indexOf(option) >= 0) {
      classNames.push(styles.nameOptionSelected)
    }

    return (
      <div
        className={classNames.join(' ')}
        key={key}
        onClick={() => selectValue(option)}
        onMouseOver={() => focusOption(option)}
        style={style}
      >
        {option.name}
      </div>
    )
  }
}
