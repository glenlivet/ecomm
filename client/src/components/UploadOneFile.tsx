import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { FileUpload } from 'primereact/fileupload';

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

const handleUpload = ({ files }: { files: Array<unknown> }, uploadFile: any) => {
  uploadFile({ variables: { file: files.length && files[0] } });
};

const UploadOneFile: React.FC<unknown> = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  return (
    <FileUpload
      name="demo"
      customUpload
      uploadHandler={(e) => handleUpload(e, uploadFile)}
    />
  );
};

export default UploadOneFile;
