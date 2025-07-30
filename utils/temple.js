import tmp from 'tmp';
import fs from 'fs/promises';

/**
 * Creates a temporary file and writes the provided buffer to it.
 * @param {Buffer} buffer - The file data as a buffer.
 * @param {string} filename - The name of the file to be created.
 * @returns {Promise<string>} The path to the created temporary file.
 */



async function createTempFile(buffer, filename) {
  const tmpFile = tmp.fileSync({ postfix: `-${filename}` });

  try {
    await fs.writeFile(tmpFile.name, buffer);
    return tmpFile.name;
  } catch (error) {
    tmpFile.removeCallback();
    throw new Error('Failed to write to temporary file');
  }
}


export { createTempFile}
