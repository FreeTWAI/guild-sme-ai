import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {renderWorkspace} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('renderWorkspace benchmark', () => {
  const iterations = 10000;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    renderWorkspace(workspace);
  }
  const end = performance.now();
  const duration = end - start;

  // ensure the duration is less than 500ms
  assert.ok(duration < 500, `renderWorkspace took ${duration}ms, which is above the 500ms threshold`);
});
