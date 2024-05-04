import React, { useState } from 'react';
import { Table, TableColumnsType, TablePaginationConfig } from 'antd';
import './styles.css';

type TableProps = {
  onSelectChange?: (newSelectedRowKeys: any) => void;
  pagination?: false | TablePaginationConfig | undefined;
  columns: TableColumnsType<any>;
  data: Array<object>;
  sticky?: any;
  maxContent?: boolean;
  scroll?: any;
  onRowClick?: (record: any, index: any) => void;
  className?: string; // for tailwindcss
};

export default function BaseTable(props: TableProps) {
  const {
    className,
    data,
    columns,
    onSelectChange,
    pagination,
    sticky,
    scroll = {},
    maxContent,
    onRowClick,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [rowClickKey, setRowClickKey] = useState<any>();

  const _onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    onSelectChange && onSelectChange(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: _onSelectChange,
  };

  const getRowClassName = (record: any, index: any) => {
    let classCustom = onRowClick ? 'row-click' : '';
    return rowClickKey === `${(pagination as any)?.current || ''}-${index}`
      ? classCustom + ' selected-row'
      : classCustom;
  };

  return (
    <>
      <Table
        scroll={maxContent ? { x: 'max-content' } : scroll}
        sticky={sticky}
        className={className}
        rowClassName={getRowClassName}
        rowSelection={onSelectChange && rowSelection}
        pagination={pagination}
        columns={columns}
        dataSource={data}
        onRow={(record, index) => ({
          onClick: () => {
            if (onRowClick) {
              onRowClick(record, index);
              setRowClickKey(`${(pagination as any)?.current || ''}-${index}`);
            }
          },
        })}
      />
    </>
  );
}

// EXAMPLE:

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
// const columns: TableColumnsType<any> = [
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     render: (text) => <div className="bg-red-300">{text}</div>,
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
// ];

// const onSelectChange = (newSelectedRowKeys: any) => {
//   console.log("newSelectedRowKeys", newSelectedRowKeys);
// };
// return (
//     <BaseTable
//       className="p-4"
//       onSelectChange={onSelectChange}
//       pagination={{ pageSize: 5 }}
//       columns={columns}
//       data={data}
//     ></BaseTable>
// );
