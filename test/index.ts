import TestUtils from './utils';
import {type TestGlobal} from './types';

(globalThis as TestGlobal).TestUtils = TestUtils;
