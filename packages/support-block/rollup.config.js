import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss'
import {
  pascal,
} from 'naming-style';

const name = pkg.name;
const pascalName = pascal(name)
console.log(pascalName, 'pascalName')
/**
 * @type {import('rollup').RollupOptions}
 */
const entry = [
  './src/index.ts',
]
export default () => [
  {
    input: entry,
    output: {
      file: pkg.publishConfig.module,
      format: 'esm',
      name: pascalName
    },
    plugins: [
      postcss(),
      esbuild({
        target: 'es2017',
      }),
    ]
  },
  {
    input: entry,
    output: {
      file: pkg.publishConfig.main,
      // format: 'cjs',
      global:'this',
      format: 'umd',
      name: pascalName
    },
    plugins: [
     
      postcss(),
     

      esbuild({
        target: 'es2015',
      }),
     
  
      babel({
        presets: ['@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],
        //  exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      // terser(),
      nodePolyfills(),
      commonjs({
        include: /node_modules/,
      }),
      json(),
      nodeResolve({
        browser: true,
        moduleDirectories:['node_modules','packages']
      }),



    ]
  },
  {
    input: entry,
    output: {
      file: pkg.publishConfig.types,
      format: 'es',
      name: pascalName
    },
    plugins: [
      postcss(),
      dts(),
    ],
  },


]