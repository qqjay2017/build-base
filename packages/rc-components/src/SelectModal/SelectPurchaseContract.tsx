import { IDependHeader } from '@core/service-api';
import { dateFormat } from '@core/shared';
import React, { useEffect, useRef } from 'react';
import { ColumnRenderFormItem } from '../ColumnRenderFormItem';
import { showModal, ShowModalCompProps } from '../showModal';
import { BaseModel, BaseSingleSelectModal, SelectProTableProps } from './base';
import type { ModalProps } from 'antd/lib/modal';
import { ColumnRenderClickInput } from '../ClickInput';
import { noLabelColumn } from '../utils/columnConfig';
import { selectProjectSystem } from './SelectProjectSystem';
import { ProFormInstance } from '@ant-design/pro-components';

function SelectPurchaseContractModal<D = any>(
  props: ShowModalCompProps<{
    defaultValue?: D;
    initSearch?: Record<string, any>;
    headers?: any;
  }>,
) {
  const { modalProps, handles, headers, defaultValue,initSearch } = props;
 
  const formRef = useRef<ProFormInstance>();
  if(initSearch&&initSearch.project){
    initSearch.projectId = initSearch.project.projectId;
    initSearch.projectName = initSearch.project.projectName;
    initSearch.project = undefined;
  }
  const columns: SelectProTableProps<any>['columns'] = [
    {
      ...noLabelColumn,
      title: '项目',
      dataIndex: 'projectName',
      renderFormItem: (...p) =>
      ColumnRenderClickInput(...p)({
        disabled:initSearch&&initSearch.projectName,
        onSearchClick: () => {
          selectProjectSystem({
            defaultValue: formRef.current?.getFieldValue('_projectObj_')||null
          }).then((res) => {
            formRef.current?.setFieldsValue({
              projectId:res.id,
              projectName:res.name,
              _projectObj_:res
            })
            formRef.current.submit()
          });
        },
      }),
    },
    {
      title: '合同编号',
      dataIndex: 'code',
     
      search: false,
      // render: (_, entity) => findConstantLabel(entity.portalType, ossDevSystemType),
    },

    {
    
      title: '项目',
      dataIndex: 'projectName',
     search:false,
      
    },
    {
      ...noLabelColumn,
      title: '供应商',
      dataIndex: 'partyb',

      renderFormItem: (...p) =>
        ColumnRenderClickInput(...p)({
          onSearchClick: () => {
            console.log('click');
          },
        }),
    },
    {
      title: '签订日期',
      dataIndex: 'signDate',
      search: false,

      render: (_, record) => {
        return dateFormat(record.signDate);
      },
    },
    {
      ...noLabelColumn,
      title: '关键字',
      hideInTable: true,
      dataIndex: 'filterStr',

      renderFormItem: ColumnRenderFormItem,
    },
  ];
  return (
    <BaseSingleSelectModal<BaseModel>
      defaultValue={defaultValue}
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

export interface IContractRow {
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
export interface ISelectPurchaseContractProps {
  defaultValue?: Partial<BaseModel> | null;
  headers?: IDependHeader;
  modalProps?: ModalProps;
  /**
   * contrType: 1. 采购合同  2: 销售合同
   * project: 已选项目回显
   * 
   *
   */
  initSearch?: {
    contrType: '1' | '2';
    orderStatus?: number;
    project?:{
      projectId?:string,
      projectName?:string;
    };
   
  };
}
export function selectPurchaseContract({
  defaultValue,
  headers,
  modalProps = {},
  initSearch,
}: ISelectPurchaseContractProps): Promise<IContractRow> {
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
    },
    {
      title: initSearch.contrType === '1' ? '选择采购合同' : '选择销售合同',

      ...modalProps,
    },
  );
}
