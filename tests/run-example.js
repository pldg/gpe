#!/usr/bin/env node

/**
 * Run a specific example:
 *
 * `node tests/run-example.js 3`
 *
 * where `3` is example number.
 */

const args = process.argv;
const n = args[2];

if (!n) throw new Error('Provide example number as first argument');

const example = require(`./examples/example-${n}`);
const candidates = require('./candidates');

const output = example(candidates);

console.log(output);