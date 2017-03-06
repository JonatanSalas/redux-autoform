import fs from 'fs';
import React from 'react';
import express from 'express';
import webpackConfig from '../webpack/webpack.config.demo.dev';
import colors from 'colors';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

const webpackCompiler = webpack(webpackConfig);

require.extensions['.html'] =  (module, filename) => module.exports = fs.readFileSync(filename, 'utf8');

const app = express();

app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));
app.use((req, res) => res.status(200).send(require('./index.html')));

app.listen(4000, err => {
    if (!err) {
        console.log(colors.green(`Redux-autoform started at http://localhost:4000/`));
    }
});