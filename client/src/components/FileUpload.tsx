import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './FileUpload.scss';

type propsType = {
  className?: string;
  onChange: (f: File | null) => void;
};
const FileUpload: React.FC<propsType> = ({ className, onChange }: propsType) => {
  //variables
  const wrapperEle: MutableRefObject<null | HTMLDivElement> = useRef(null);
  const fileEle: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const imgEle: MutableRefObject<null | HTMLImageElement> = useRef(null);
  const [file, setFile] = useState(null as File | null);

  useEffect(() => {
    if (wrapperEle.current && fileEle.current) {
      //enable div click to upload file.
      const wrapperElement = wrapperEle.current;
      const fileElement = fileEle.current;
      const wrapperEleOnClick = () => {
        fileElement.click();
      };
      const fileEleOnInput = (e: Event) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length) {
          setFile(files.item(0));
          onChange(files.item(0));
        }
      };
      wrapperEle.current.style.cursor = 'pointer';
      wrapperElement.addEventListener('click', wrapperEleOnClick);
      fileElement.addEventListener('change', fileEleOnInput);
      return () => {
        wrapperElement.removeEventListener('click', wrapperEleOnClick);
        fileElement.removeEventListener('change', fileEleOnInput);
      };
    }
    if (imgEle.current) {
      //enable image preview
      const imgElem = imgEle.current;
      const fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        imgElem.setAttribute('src', (e.target as FileReader).result as string);
      };
      fileReader.readAsDataURL(file as File);
      return () => {
        fileReader.onload = null;
      };
    }
  });
  const wrapperClass = classnames('m-file-upload', className, {
    'pi pi-plus p-text-center': !file,
  });
  return (
    <div ref={wrapperEle} className={wrapperClass}>
      {!file && <input ref={fileEle} className="m-hidden" type="file" />}
      {file && <img ref={imgEle} alt="Image Preview." className="m-preview" />}
    </div>
  );
};

export default FileUpload;
