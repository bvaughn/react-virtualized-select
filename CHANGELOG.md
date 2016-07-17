Changelog
------------

##### 1.1.1
Fixed a regression for non-function `optionHeight` values.

##### 1.1.0
Supports dynamic option heights via `optionHeight` as a function.
Function should implement the following signature: `({ option: Object }): number`

##### 1.0.0
First major release; interface now stable.

##### 0.0.4
Dependency bump for React 15.0 now that it has been released.

##### 0.0.3
Finalized props signature of `VirtualizedSelect`; changed `rowRenderer` to `optionRenderer` to better align with `react-select` terminology.

##### 0.0.2
Moved `react-select` and `react-virtualized` from `peerDependencies` to `dependencies` block.
Updated CommonJS/ES module build to export `VirtualizedSelect` as a default.

##### 0.0.1
Initial release.

##### 0.0.0
Reserved NPM package name.
