#! /usr/bin/env node
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { program } from 'commander';
// import fse from 'fs-extra';
// import path from 'path';

import Test from '../packages/viewer/src/components/Test';

program.parse(process.argv);

const element = React.createElement(Test, {});
const staticMarkup = ReactDOMServer.renderToStaticMarkup(element);

console.log(staticMarkup);
