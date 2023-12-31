import babel from '@rollup/plugin-babel';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';
// import cssnano from 'rollup-plugin-cssnano';
import packageData from "./package.json";

let configList = []
let formats = ['iife', 'es', 'cjs', 'umd']
let config = (format, filePrefix) => {
    return {
        input: './code/index.js',
        output: {
            file: `${filePrefix}simple-web${format === 'iife' ? '' : `.${format}`}.js`,
            format: format,
            name: 'simpleWeb',
            compact: true,
            banner: '/* version ' + packageData.version + ' */',
            footer: '/* End */',
            intro: 'const ENVIRONMENT = "production";'
        },
        plugins: [
            nodePolyfills(),
            babel({
                babelHelpers: 'runtime',
                exclude: 'node_modules',
            }),
            commonjs(),
            resolve(),
            json(),
            // cssnano(),
            copy({
                targets: [
                    // {src: './README.md', dest: 'publish'},
                ]
            }),
            terser({
                compress: {
                    drop_console: false
                }
            }),
        ],
    }
}
configList = formats.map(f => config(f, 'publish/dist/'))
export default configList
