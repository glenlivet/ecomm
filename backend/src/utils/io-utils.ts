import { ReadStream } from 'fs-capacitor';

export async function readStreamToBuffer(rs: ReadStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const bufferArray: Array<Buffer> = [];
    rs.once('end', () => {
      resolve(Buffer.concat(bufferArray));
    });
    rs.once('error', (err) => {
      reject(err);
    });
    rs.on('data', (data) => {
      if (data instanceof Buffer) {
        bufferArray.push(data);
      } else {
        bufferArray.push(Buffer.from(data, 'utf8'));
      }
    });
  });
}
