import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import citiesJSON from './CitiesJSON'
import SelectExample from '../VirtualizedSelect/VirtualizedSelect.example'
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
            Enjoy drop-down menus powered by <a className={styles.headerLink} href='https://github.com/JedWatson/react-select/'>JedWatson/react-select</a> and
            windowing performance gains brought to you by <a className={styles.headerLink} href='https://github.com/bvaughn/react-virtualized/'>bvaughn/react-virtualized</a>.
          </div>
        </header>
        <header className={styles.subHeader}>
          <div className={styles.container}>
            <a href='https://github.com/bvaughn/react-virtualized-select/'>Code and Docs on GitHub</a>.
          </div>
        </header>

        <section className={styles.container}>
          <h4>World's Largest 1,000 Cities</h4>

          <SelectExample options={citiesJSON}/>
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
