import assert from 'assert';
import plugin from './index';

describe('Empty', () => {
    it('empty glob does not match', () => {
        const pluginInstance = plugin();
        assert.equal(pluginInstance.resolveId('/src/foo/bar.js'), null);
    });
});
