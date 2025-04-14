import {expect} from 'chai';
import TestUtils from '../utils/index.js';
import type { GlobalThis } from "type-fest";

export type TestGlobal = GlobalThis & {
  expect: typeof expect;
  TestUtils: typeof TestUtils;
}
