import mongoose from 'mongoose';

export type FileDocument = mongoose.Document & {
  name: string;
  data: Buffer;
  mimetype: string;
  encoding: BufferEncoding;
};

const fileSchema = new mongoose.Schema(
  {
    name: String,
    data: Buffer,
    mimetype: String,
    encoding: String,
  },
  { timestamps: true },
);

export const File = mongoose.model<FileDocument>('File', fileSchema);
