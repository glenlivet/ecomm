export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** This is for MongoDB ObjectId */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  _id?: Maybe<Scalars['ObjectId']>;
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type ProductInput = {
  _id?: Maybe<Scalars['ObjectId']>;
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  products?: Maybe<Array<Maybe<Product>>>;
  hello?: Maybe<Scalars['String']>;
  uploads?: Maybe<Array<Maybe<File>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  singleUpload: File;
  saveProduct: Array<Maybe<Product>>;
};

export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
};

export type MutationSaveProductArgs = {
  product: ProductInput;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

import { ObjectID } from 'mongodb';
