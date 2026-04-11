import type {GlobalThis} from 'type-fest';
import type TestUtils from '../utils';

export type TestGlobal = GlobalThis & {
	TestUtils: typeof TestUtils;
};
