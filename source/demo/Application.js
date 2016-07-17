import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import VirtualizedSelectExample from '../VirtualizedSelect/VirtualizedSelect.example'
import cityData from './data/cities.js'
import countryData from './data/countries.js'
import nameData from './data/names.js'
import styles from './Application.css'
import '../../styles.css'

class Application extends Component {
  render () {
    return (
      <div>
        <header className={styles.header}>
          <h1 className={styles.container}>
            React Virtualized Select
          </h1>

          <div className={styles.container}>
            Enjoy drop-down menus powered by <a className={styles.headerLink} href='https://github.com/JedWatson/react-select/'><strong>@JedWatson</strong>'s react-select</a> and
            efficient windowing brought to you by <a className={styles.headerLink} href='https://github.com/bvaughn/react-virtualized/'><strong>@bvaughn</strong>'s react-virtualized</a>.
          </div>

          <div className={styles.container}>
            Docs and code on <a className={styles.headerLink} href='https://github.com/bvaughn/react-virtualized-select/'>GitHub</a>.
          </div>
        </header>

        <section className={styles.container}>
          <VirtualizedSelectExample
            cityData={cityData}
            countryData={countryData}
            nameData={nameData}
          />
        </section>
      </div>
    )
  }
}

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
)

// Import and attach the favicon
document.querySelector('[rel="shortcut icon"]').href = require('file!./favicon.png')
