/**
 * Test Suite Index
 *
 * Loads all test files for execution.
 */

import * as glob from 'glob';
import Mocha from 'mocha';
import * as path from 'path';

export function run(): Promise<void> {
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    const globInstance = new glob.Glob('**/**.test.ts', { cwd: testsRoot });

    globInstance.on('error', (err: any) => {
      e(err);
    });

    globInstance.on('end', (files: string[]) => {
      if (!files || files.length === 0) {
        c();
        return;
      }

      files.forEach((f: string) => {
        mocha.addFile(path.resolve(testsRoot, f));
      });

      try {
        mocha.run((failures: number) => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed`));
          } else {
            c();
          }
        });
      } catch (err) {
        console.error(err);
        e(err);
      }
    });
  });
}
