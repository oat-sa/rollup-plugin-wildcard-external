# rollup-plugin-wildcard-external

This plugin extends the behaviour of rollup external to be able to define wildcard externals.

Plugin uses `minimatch` under the hood, so any glob pattern supported.

## Installation

```bash
npm install --save-dev @oat-sa/rollup-plugin-wildcard-external
```

## Usage

```js
// rollup.config.js
import wildcardExternal from '@oat-sa/rollup-plugin-wildcard-external';

export default {
  // ...
  plugins: [
    wildcardExternal([
        // Exclude all module from lib alias
        'lib/**'
    ])
  ]
};
```