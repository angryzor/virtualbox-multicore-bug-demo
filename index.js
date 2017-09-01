const chokidar = require('chokidar');

chokidar.watch('files', { usePolling: true, interval: 100 }).on('all', (event, path) => {
  console.log(event, path);
});

