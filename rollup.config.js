import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'dist/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    strict: false,
    banner: '#! /usr/bin/env node\n',
    preferConst: true,
  },
  plugins: [json(), commonjs()],
  external: [],
};