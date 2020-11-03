import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './FileUpload.scss';

const FileUpload: React.FC<unknown> = () => {
  const wrapper: MutableRefObject<null | HTMLDivElement> = useRef(null);
  const fileInput: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const [file, setFile] = useState(null as File | null);
  useEffect(() => {
    const wrapperOnClick = () => {
      (fileInput.current as HTMLInputElement).click();
    };
    const fileInputOnInput = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length) {
        setFile(files.item(0));
      }
    };
    if (wrapper.current && fileInput.current) {
      wrapper.current.style.cursor = 'pointer';
      wrapper.current.addEventListener('click', wrapperOnClick);
      fileInput.current.addEventListener('change', fileInputOnInput);
      return () => {
        if (wrapper.current) {
          wrapper.current.removeEventListener('click', wrapperOnClick);
        }
        if (fileInput.current) {
          fileInput.current.removeEventListener('change', fileInputOnInput);
        }
      };
    }
  });
  return (
    <div ref={wrapper} className="m-file-upload pi pi-plus p-text-center">
      <input ref={fileInput} className="m-hidden" type="file" />
    </div>
  );
};

export default FileUpload;
