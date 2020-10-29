/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveProduct
// ====================================================

export interface SaveProduct_saveProduct {
  __typename: "Product";
  _id: any | null;
  code: string;
  name: string;
  description: string;
}

export interface SaveProduct {
  saveProduct: (SaveProduct_saveProduct | null)[];
}

export interface SaveProductVariables {
  product: ProductInput;
}
