import {Worker} from 'worker_threads';
import path from 'path';

export type WorkerPoolIdType = number;

export interface WorkerInfo {
  id: WorkerPoolIdType;
  worker: Worker;
  tasking?: any;
}

export /*abstract*/ class WorkerPool<TOnMessage> {
  protected workers: Map<WorkerPoolIdType, WorkerInfo> = new Map<WorkerPoolIdType, WorkerInfo>();
  protected lastId: WorkerPoolIdType = 0;

  protected poolSize = 3;

  protected /*abstract*/ workerPath: string;

  constructor() {

    console.log('__dirname', __dirname);
    console.log('process.cwd()', process.cwd());

    this.workerPath = path.join(process.cwd(), 'dist', 'bundle-worker.js');
    console.log('workerPath: ' + this.workerPath);

  }

  public createWorker() {
    console.log('WorkerPool:createWorker()');

    const id = this.generateId();

    const worker = new Worker(this.workerPath);

    this.workers.set(id, {
      id: id,
      worker: worker,
    });

    // console.log('WorkerPool: new worker:', worker, this.workers.size);

    worker.on('exit', exitCode => {
      this.workers.delete(id);
    });
    worker.on('message', (v: any) => {
      // this.onMessage(id, v as TOnMessage);
    });
    worker.on('error', err => {
      console.error('WorkerPool worker error :', err);
    });
  }

  protected generateId(): WorkerPoolIdType {
    return ++this.lastId;
  }

  // protected abstract onMessage(workerId: WorkerPoolIdType, v: TOnMessage): void;

}
