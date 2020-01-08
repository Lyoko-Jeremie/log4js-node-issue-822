// https://github.com/log4js-node/log4js-node/blob/master/docs/faq.md#what-happened-to-replaceconsole---it-doesnt-work-any-more
import log4js from 'log4js';
import {Configuration, Layout} from 'log4js';

log4js.configure({
  appenders: {
    console: {type: 'console', layout: {type: 'colored'}},
  },
  categories: {
    default: {appenders: ['console'], level: 'ALL', enableCallStack: true},
    console: {appenders: ['console'], level: 'ALL', enableCallStack: true},
    express: {appenders: ['console'], level: 'ALL', enableCallStack: true},
    work_thread: {appenders: ['console'], level: 'ALL', enableCallStack: true},
  },
} as Configuration);

const logger = log4js.getLogger('console');
console.log = logger.info.bind(logger);
console.debug = logger.debug.bind(logger);
console.warn = logger.warn.bind(logger);
console.error = logger.error.bind(logger);
console.info = logger.info.bind(logger);
console.trace = logger.trace.bind(logger);
