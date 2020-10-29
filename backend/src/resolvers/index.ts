import util from 'util';
import { pipeline } from 'stream';
import { FileUpload } from 'graphql-upload';
import fs from 'fs';
import { File as TypeFile, Product, MutationSaveProductArgs } from '../generated/graphql';
import { readStreamToBuffer } from '../utils/io-utils';
import { File as FileModel } from '../schemas/file';
import { Product as ProductModel } from '../schemas/product';
import objectIdScalarType from '../schemas/ObjectIdScalarType';

const pipelineProm = util.promisify(pipeline);
const resolvers = {
  Query: {
    hello: (): string => `Hello world!`,
    products: async (): Promise<Product[]> => {
      const prod = await ProductModel.find();
      return prod;
    },
  },
  Mutation: {
    saveProduct: async (_: unknown, { product }: MutationSaveProductArgs): Promise<Product[]> => {
      const prod = new ProductModel(product);
      await prod.save();
      const products = await ProductModel.find();
      return products;
    },
    singleUpload: async (_: unknown, { file }: { file: Promise<FileUpload> }): Promise<TypeFile> => {
      const { filename, mimetype, encoding, createReadStream } = (await file) as FileUpload;
      const rs = createReadStream();
      const data = await readStreamToBuffer(rs);
      const uploadedFile = new FileModel({
        name: filename,
        mimetype,
        encoding: 'binary',
        data,
      });
      uploadedFile.save();

      const ws = fs.createWriteStream(`${process.env.UPLOADS_PATH}/${filename}`, {
        encoding: 'binary',
      });

      await pipelineProm(rs, ws);
      return { filename, mimetype, encoding };
    },
  },
  ObjectId: objectIdScalarType,
};

export default resolvers;
