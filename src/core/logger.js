/* istanbul ignore next */
import winston from 'winston';
import { each } from 'lodash';

/* istanbul ignore next */
const timestamp = () => Date.now();

const serializeMeta = (meta) => {
    let output = '';
    each(meta, (value, key) => {
        let val = value;
        if (val instanceof Object) {
            val = JSON.stringify(val).replace(/"/g, '\\"');
        }
        output = `${output} ${key}="${val}"`;
    });
    return output;
};

/* istanbul ignore next */
const formatter = (options) => {
    // Return string will be passed to logger.
    const meta = (options.meta && Object.keys(options.meta).length ? serializeMeta(options.meta) : '');

    return `time="${options.timestamp()}" level="${options.level.toUpperCase()}" cid="hostname"` +
    ` message="${(undefined !== options.message ? options.message : '')}"${meta}`;
};

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp,
            formatter,
            level: 'debug'
        })
    ]
});

export default logger;
