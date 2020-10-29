/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products {
  __typename: "Product";
  _id: any | null;
  code: string;
  name: string;
  description: string;
}

export interface GetProducts {
  products: (GetProducts_products | null)[] | null;
}
