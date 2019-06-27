const assert = require('assert');
const plugin = require('./index');

describe('Empty', () => {
    beforeEach(function() {
        this.plugin = plugin();
    });

    it('empty glob does not match', function() {
        assert.equal(this.plugin.resolveId('/src/foo/bar.js'), null);
    });

    it('empty glob does not match with importer', function() {
        assert.equal(this.plugin.resolveId('/src/foo/bar.js', 'importer'), null);
    });
});

describe('Simple glob', () => {
    beforeEach(function() {
        this.plugin = plugin(['/src/**']);
    });

    it('does not external if there is no importer', function() {
        assert.equal(this.plugin.resolveId('/src/foo/bar.js'), null);
    });

    it('it should be an external if there is importer', function() {
        assert.equal(this.plugin.resolveId('/src/foo/bar.js', 'importer').external, true);
    });
});

describe('Multiple glob', () => {
    beforeEach(function() {
        this.plugin = plugin(['/src/**', '/test/**']);
    });

    it('non of the glob should match if there is no importer', function() {
        assert.equal(this.plugin.resolveId('/src/foo/bar.js'), null);
        assert.equal(this.plugin.resolveId('/test/bar/baz.js'), null);
    });

    it('both glob should match', function() {
        assert.deepEqual(this.plugin.resolveId('/src/foo/bar.js', 'importer'), {
            id: '/src/foo/bar.js',
            external: true,
            moduleSideEffects: true
        });
        assert.deepEqual(this.plugin.resolveId('/test/bar/baz.js', 'importer'), {
            id: '/test/bar/baz.js',
            external: true,
            moduleSideEffects: true
        });
    });
});

describe('Complex glob', () => {
    beforeEach(function() {
        this.plugin = plugin(['/+(src|test)/**']);
    });

    it('both glob should match', function() {
        assert.deepEqual(this.plugin.resolveId('/src/foo/bar.js', 'importer'), {
            id: '/src/foo/bar.js',
            external: true,
            moduleSideEffects: true
        });
        assert.deepEqual(this.plugin.resolveId('/test/bar/baz.js', 'importer'), {
            id: '/test/bar/baz.js',
            external: true,
            moduleSideEffects: true
        });
    });
});

describe('Alias glob', () => {
    beforeEach(function() {
        this.plugin = plugin(['lodash', '@babel/**']);
    });

    it('module should be match but only that', function() {
        assert.deepEqual(this.plugin.resolveId('lodash', 'importer'), {
            id: 'lodash',
            external: true,
            moduleSideEffects: true
        });
        assert.equal(this.plugin.resolveId('lodash/pluck', 'some importer'), null);
    });

    it('module path should match but not the module', function() {
        assert.deepEqual(this.plugin.resolveId('@babel/core', 'importer'), {
            id: '@babel/core',
            external: true,
            moduleSideEffects: true
        });
        assert.equal(this.plugin.resolveId('@babel', 'some importer'), null);
    });
});