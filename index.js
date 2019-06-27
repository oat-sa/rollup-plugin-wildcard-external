/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) Open Assessment Technologies SA ;
 */

const minimatch = require('minimatch');

module.exports = (externals = []) => ({
    name: 'external-alias', // this name will show up in warnings and errors
    /**
     * Rollup resolveId function
     * @param {string} source imported module name that should check
     * @param {string} importer importer module name
     * @returns {string | false | null | object} module definition
     */
    resolveId(source, importer) {
        if (importer && externals.find(pattern => minimatch(source, pattern))) {
            return {
                id: source,
                external: true,
                moduleSideEffects: true
            };
        }
        return null; // other ids should be handled as usually
    }
});
