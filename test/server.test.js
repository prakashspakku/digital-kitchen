/* Minimal, dependency-free smoke test */
const http = require('http');
const { spawn } = require('child_process');
const assert = require('assert');

const PORT = 3000;

(async () => {
  const proc = spawn(process.execPath, ['app.js'], { stdio: 'inherit' });
  await new Promise(r => setTimeout(r, 800));
  try {
    const body = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${PORT}/`, (res) => {
        let data = '';
        res.on('data', c => (data += c));
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });

    assert.ok(body.includes('Welcome to the Digital Kitchen!'));
    console.log('✅ Test passed');
  } catch (err) {
    console.error('❌ Test failed', err);
    process.exitCode = 1;
  } finally {
    proc.kill('SIGTERM');
    await new Promise(r => setTimeout(r, 300));
  }
})();
