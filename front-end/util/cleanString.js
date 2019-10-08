import deburr from 'lodash/deburr';
import trim from 'lodash/trim';
import flow from 'lodash/flow';

export default flow([trim, deburr]);
