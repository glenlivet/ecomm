import React, { useReducer } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ProductInput } from '../../generated/globalTypes';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import FileUpload from './FileUpload';

import './ProductEdit.scss';

type ActionType = {
  type: string;
  payload: any;
};

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case 'update-product':
      return { ...state, product: { ...action.payload } };
    default:
      throw new Error(`No Action "${action.type}" defined.`);
  }
};

type propsType = {
  product?: ProductInput;
};

const ProductEdit: React.FC<propsType> = (props: propsType) => {
  const [state, dispatch] = useReducer(reducer, {
    product: { ...(props.product || {}) },
  });
  return (
    <div className="m-product-edit p-m-5">
      <div className="m-action-bar p-d-flex p-flex-row-reverse p-mb-4">
        <Button label="Delete" icon="pi pi-times" className="p-mr-2" />
        <Button label="Save" icon="pi pi-plus" className="p-mr-2" />
      </div>
      <div className="m-edit-form">
        <div className="m-form-row p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="prod-dlg-name">Name</label>
            <InputText
              id="prod-dlg-name"
              type="text"
              value={state.product.name}
              onChange={(e) =>
                dispatch({
                  type: 'update-product',
                  payload: { name: (e.target as HTMLInputElement).value },
                })
              }
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="prod-dlg-code">Code</label>
            <InputText
              id="prod-dlg-code"
              type="text"
              value={state.product.code}
              onChange={(e) =>
                dispatch({
                  type: 'update-product',
                  payload: { code: (e.target as HTMLInputElement).value },
                })
              }
            />
          </div>
        </div>
        <div className="m-form-row p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="prod-dlg-desc">Description</label>
            <InputTextarea
              id="prod-dlg-desc"
              rows={3}
              value={state.product.description}
              onChange={(e) =>
                dispatch({
                  type: 'update-product',
                  payload: { code: (e.target as HTMLTextAreaElement).value },
                })
              }
              autoResize
            />
          </div>
        </div>
        <div className="m-form-row p-fluid p-formgrid p-grid">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
