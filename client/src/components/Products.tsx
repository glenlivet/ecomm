import React, { useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      code
      name
      description
    }
  }
`;

const SAVE_PRODUCT = gql`
  mutation SaveProduct($product: ProductInput!) {
    saveProduct(product: $product) {
      _id
      code
      name
      description
    }
  }
`;

const getLeftContents = (setProdDlgVis: any) => {
  const leftContents = () => (
    <>
      <Button
        label="New"
        icon="pi pi-plus"
        className="p-mr-2"
        onClick={() => setProdDlgVis(true)}
      />
      <Button label="Delete" icon="pi pi-times" className="p-mr-2" />
    </>
  );
  return leftContents;
};

const prodDlgFtr = (onSave: any) => {
  return (
    <div>
      <Button label="Save" icon="pi pi-check" onClick={onSave} />
      <Button label="Cancel" icon="pi pi-times" />
    </div>
  );
};

const Products: React.FC<unknown> = () => {
  //get data
  const { loading, error, data: getProducts, refetch: refetchProducts } = useQuery(
    GET_PRODUCTS,
  );
  const [saveProduct, { data: updated }] = useMutation(SAVE_PRODUCT);
  const [prodDlgVis, setProdDlgVis] = useState(false);
  const [prod, setProd] = useState({
    code: '',
    name: '',
    description: '',
  });
  if (loading) return <>loading...</>;
  if (error) return <>{`Error! ${error.message}`}</>;
  return (
    <div className="products-page">
      <Toolbar left={getLeftContents(setProdDlgVis)} />
      <DataTable value={updated ? updated.saveProduct : getProducts.products}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="description" header="Description"></Column>
      </DataTable>
      <Dialog
        header="Product"
        visible={prodDlgVis}
        footer={prodDlgFtr(() => {
          saveProduct({ variables: { product: prod } });
          setProdDlgVis(false);
        })}
        modal
        onHide={() => setProdDlgVis(false)}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="prod-dlg-name">Name</label>
            <InputText
              id="prod-dlg-name"
              type="text"
              value={prod.name}
              onChange={(e) =>
                setProd({ ...prod, name: (e.target as HTMLInputElement).value })
              }
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="prod-dlg-code">Code</label>
            <InputText
              id="prod-dlg-code"
              type="text"
              value={prod.code}
              onChange={(e) =>
                setProd({ ...prod, code: (e.target as HTMLInputElement).value })
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
              value={prod.description}
              onChange={(e) =>
                setProd({
                  ...prod,
                  description: (e.target as HTMLTextAreaElement).value,
                })
              }
              autoResize
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Products;
