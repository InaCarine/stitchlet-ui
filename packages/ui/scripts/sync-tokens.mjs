import { access, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = path.resolve(__dirname, '../../design-tokens/build/css/_variables.css');

const destinationDir = path.resolve(__dirname, '../styles');
const destinationFile = path.join(destinationDir, 'tokens.css');

async function main() {
  try {
    await access(sourceFile);
  } catch {
    throw new Error(
      [
        'Missing design token build output.',
        `Expected source file: ${sourceFile}`,
        'Build @stitchlet/design-tokens before packaging @stitchlet/ui.',
      ].join('\n')
    );
  }

  await mkdir(destinationDir, { recursive: true });
  await copyFile(sourceFile, destinationFile);

  console.log(`Synced tokens.css from ${sourceFile} to ${destinationFile}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
