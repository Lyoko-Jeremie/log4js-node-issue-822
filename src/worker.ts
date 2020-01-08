import log4js, {Configuration} from 'log4js';


// https://github.com/log4js-node/log4js-node/issues/822

// if set flag to false, will never print the "Worker init ." by follow code
const flag = true;

// node -v : v13.0.1
// yarn -v : 1.21.1

// ===============begin==================
if (flag) {
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
}
// ===============end==================


const logger = log4js.getLogger('work_thread');
console.log = logger.info.bind(logger);
console.debug = logger.debug.bind(logger);
console.warn = logger.warn.bind(logger);
console.error = logger.error.bind(logger);
console.info = logger.info.bind(logger);
console.trace = logger.trace.bind(logger);


// if flag be set to false, follow code will not work
logger.error('Worker init .');
console.log('Worker init .');

