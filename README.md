# rollup-plugin-wildcard-external

This plugin extends the behaviour of rollup externals to be able to define wildcard externals.

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

## For developers

### Tests

The plugin is tested with `mocha`. You can run tests with

`npm run test`

or with coverage

`npm run test:cov`

### Code link

`npm run lint`
