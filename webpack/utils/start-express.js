import cp from 'child_process';
import path from 'path';
import watch from 'node-watch';
import { noop } from 'lodash';

let server;
let started;

const EXPRESS_PATH = path.join(__dirname, '../../server/index');

const startServer = () => {
  // Define `restartServer`
  const restartServer = () => {
    console.info('Restarting SERVER');
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
        console.info('\x1b[36m%s\x1b[0m', '===> TYPE `rs` in console for restarting SERVER !!!');

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
