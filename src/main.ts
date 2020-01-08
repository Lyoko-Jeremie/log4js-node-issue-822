import './log4jsPolyfill'

import {WorkerPool} from './WorkerPool'


const pool = new WorkerPool();

pool.createWorker();

