import React, { useReducer } from 'react';
import { gql, useMutation } from '@apollo/client';
import { FileUpload } from 'primereact/fileupload';
import { ProductInput } from '../../generated/globalTypes';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

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
    <div className="m-product-edit">
      <div className="p-fluid p-formgrid p-grid">
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
      <div className="p-fluid p-formgrid p-grid">
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
      <div className="p-fluid p-formgrid p-grid">
        <Button label="New" icon="pi pi-plus" className="p-mr-2" />
        <Button label="Delete" icon="pi pi-times" className="p-mr-2" />
      </div>
    </div>
  );
};

export default ProductEdit;
