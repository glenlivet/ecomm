/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadFile
// ====================================================

export interface uploadFile_singleUpload {
  __typename: "File";
  filename: string;
}

export interface uploadFile {
  singleUpload: uploadFile_singleUpload;
}

export interface uploadFileVariables {
  file: any;
}
