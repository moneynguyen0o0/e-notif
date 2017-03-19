import cp from 'child_process';
import path from 'path';
import watch from 'node-watch';
import { noop } from 'lodash';
import logger from 'winston';

let server;
let started;

const EXPRESS_PATH = path.join(__dirname, '../../server/index');

const startServer = () => {
  // Define `restartServer`
  const restartServer = () => {
    logger.info('Restarting express application');
    server.kill('SIGTERM');
    return startServer();
  };

  // merge env for the new process
  const env = { ...process.env, NODE_ENV: 'development', BABEL_ENV: 'server' };
  // start the server procress
  server = cp.fork(EXPRESS_PATH, { env });
  // when server is `online`
  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      if (!started) {
        started = true;

        // Listen for `rs` in stdin to restart server
        logger.info('Type `rs` in console for restarting express application');

        process.stdin.setEncoding('utf8');
        process.stdin.on('data', data => {
          if ((data + '').trim().toLowerCase() === 'rs') return restartServer();
        });

        // Start watcher on server files
        // and reload browser on change
        watch(
          path.join(__dirname, '../../server'),
          { recursive: true },
          (evt, file) => !file.match('webpack-stats.json') ? restartServer() : noop()
        );
      }
    }
  });
};

// kill server on exit
process.on('exit', () => server.kill('SIGTERM'));
export default () => !server ? startServer() : noop();
