const candidates = require('./candidates');

const runSnapshotTest = (n) => {
  const example = require(`./examples/example-${n}`);
  const output = example(candidates);

  test(`example-${n} snapshot`, () => expect(output).toMatchSnapshot());
}

describe('Without breakpoints', () => runSnapshotTest(1));
describe('Only defaultBreakpoint', () => runSnapshotTest(2));
describe('One breakpoint', () => runSnapshotTest(3));
describe('consecutiveBreakpoints', () => runSnapshotTest(4));
describe('consecutiveBreakpoints with art', () => runSnapshotTest(5));
describe('One breakpoint and defaultBreakpoint', () => runSnapshotTest(6));

describe('Error art', () => {
  const example = require('./examples/example-7');

  test('example-7', () => expect(() => {
    // toThrow() works only if you call the
    // testing function inside the expect() callback
    // https://stackoverflow.com/a/46707558/
    example(candidates);
  }).toThrow());
});

describe('`extensions`', () => runSnapshotTest(8));
describe('`alt`', () => runSnapshotTest(9));
describe('`className`', () => runSnapshotTest(10));
describe('`publicPath`', () => runSnapshotTest(11));
describe('`src`', () => runSnapshotTest(12));

describe('`src` warning', () => {
  // Place mock function before the execution of the code you're testing
  // https://jestjs.io/docs/en/mock-functions
  console['warn'] = jest.fn();

  const example = require('./examples/example-13');
  const output = example(candidates);

  test('example-13 snapshot', () => {
    expect(output).toMatchSnapshot();
  });

  test('example-13 `src` warning', () => {
    const msg = 'Warning: "600" width doesn\'t exist in candidates, ' +
    'src attribute will fallback to the max width available: "triss_400w.jpg"';

    expect(console.warn).toHaveBeenCalledWith(msg);
  });
});
