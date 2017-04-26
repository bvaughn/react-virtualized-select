/* @flow */
import VirtualizedSelect from './VirtualizedSelect'

// Backwards compatible hack for require('...').default
// See bvaughn/react-virtualized-select/issues/57
VirtualizedSelect.default = VirtualizedSelect

module.exports = VirtualizedSelect
