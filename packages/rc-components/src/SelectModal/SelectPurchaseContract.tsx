
import React, {  useRef, useState } from 'react';

import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectModalPromise, SelectProTableProps, ShowModalCompCustomProps, ShowModalFnPropsBase } from './base';

import { ColumnRenderClickInput } from '../ClickInput';
import { contractCodeColumn, filterStrColumn, noLabelColumn, partybColumn, projectNameColumn, signDateColumn } from '../utils/columnConfig';
import { IProjectSystemRow, selectProjectSystem } from './SelectProjectSystem';
import { ProFormInstance } from '@ant-design/pro-components';
import { ISupplierRow, selectSupplier } from '..';

function SelectPurchaseContractModal<D = any>(
  props: ShowModalCompProps<ShowModalCompCustomProps<D>>,
) {
  const { modalProps, handles, headers, defaultValue, initSearch ,columns} = props;

  const [tableParams, setTableParams] = useState({});
 
  const formRef = useRef<ProFormInstance>();

  const defaultColumns: SelectProTableProps<any>['columns'] = [
    {
      ...noLabelColumn,
      title: '项目',
      dataIndex: 'projectRow',
      renderFormItem: (...p) =>
        ColumnRenderClickInput(...p)({
          disabled: initSearch && initSearch.projectRow,
          onSearchClick: () => {
            selectProjectSystem({
              defaultValue: formRef.current?.getFieldValue('projectRow') || null,
            }).then((res) => {
              formRef.current?.setFieldsValue({
                projectRow: res.selectedRow,
              });
              setTableParams((p) => ({
                ...p,
               
                projectRow:undefined,
                projectId: res.selectedRow.id,
              }));
            });
          },
        }),
    },
    {
      ...noLabelColumn,
      title: '供应商',
      dataIndex:'partybRow',
      renderFormItem: (...p) =>
      ColumnRenderClickInput(...p)({
        disabled: initSearch && initSearch.partybRow,
        onSearchClick: () => {
          selectSupplier({
            defaultValue: formRef.current?.getFieldValue('partybRow') || null,
          }).then((res) => {
            formRef.current?.setFieldsValue({
            
              partybRow: res.selectedRow,
            });
            setTableParams((p) => ({
              ...p,
              partybRow:undefined,
              
              partybId: res.selectedRow.partnerCompanyId,
            }));
          });
        },
      }),
    },
    filterStrColumn,
    contractCodeColumn,

    projectNameColumn,
    partybColumn,
    signDateColumn
   
  ];
  
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultValue={defaultValue}
      defaultColumns={defaultColumns}
      columns={columns}
      labelPath="code"
      initSearch={{
        contrType: 1,

        orderStatus: 54,
        ...props.initSearch,
      }}
      modalProps={modalProps}
      tableProps={{
        formRef: formRef,
        params: tableParams,
      }}
      requestInfo={{
        url: '/api/scm/v1/contract/table',
        headers: {
          // 'depend-method': 'POST',
          // 'depend-uri': '/api/purchase-system/v1/purchase',
          ...headers,
        },
      }}
      handles={handles}
    />
  );
}

export interface IPartybList {
  id: any;
  partycId: string;
  contrId: string;
  partyc: string;
}

export interface IContractRow  extends Record<string,any>{
  id: string;
  contractNo: string;
  contractName: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  totalAmount: string;
  contrTypeId: string;
  contrTypeName: string;
  payId: string;
  payName: string;
  partybId: string;
  partybName: string;
  partybList: IPartybList[];
  supplierId: string;
  supplierName: string;
  signedDate: any;
  tag: string;
  approveState: number;
}
export type  ISelectPurchaseContractProps = ShowModalFnPropsBase<{
  contrType: '1' | '2';
  orderStatus?: number;
  projectRow?: any;
  partybRow?: any;
}>

export function selectPurchaseContract({
  defaultValue,
  headers,
  columns,
  modalProps = {},
  initSearch,
}: ISelectPurchaseContractProps={}): Promise<SelectModalPromise<IContractRow,{
  filterStr?:string;
  partybRow?:ISupplierRow|null;
  projectRow?:IProjectSystemRow|null;
}>> {
  if (!initSearch) {
    initSearch = {
      contrType: '2',
    };
  }

  return showModal(
    SelectPurchaseContractModal,
    {
      defaultValue: defaultValue,
      initSearch,
      headers: headers || {},
      columns
    },
    {
      title: initSearch.contrType === '1' ? '选择采购合同' : '选择销售合同',

      ...modalProps,
    },
  );
}
