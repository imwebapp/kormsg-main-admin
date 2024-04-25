import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, TablePaginationConfig, Tooltip } from "antd";
import "./styles.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { classNames } from "../../utils/common";
import { UpOutlined } from "@ant-design/icons";
import BaseText from "../text";

interface DraggableBodyProps {
  [key: string]: any;
}
const DraggableBody: React.FC<DraggableBodyProps> = (props) => <tbody {...props} />;


interface DraggableRowProps {
  draggableProps: {
    innerRef?: React.Ref<any>;
    [key: string]: any;
  };
  dragHandleProps: any;
  innerRef: React.Ref<any>;
  style: React.CSSProperties;
  'data-row-key': string;
  'data-row-index': number;
  children?: React.ReactNode;
}

// Hàm mergeRefs để kết hợp các tham chiếu lại với nhau
const mergeRefs = (...refs: (React.Ref<any> | undefined)[]) => {
  return (value: any) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<any>).current = value;
      }
    });
  };
};

const DraggableRow: React.FC<DraggableRowProps> = (props) => {
  const { draggableProps, dragHandleProps, innerRef: rowRef, style } = props;
  const draggableRef = draggableProps?.innerRef || (() => { }); // Kiểm tra innerRef có tồn tại không

  return (
    <Draggable
      draggableId={props['data-row-key']}
      index={props['data-row-index']}
      disableInteractiveElementBlocking={true} // Tắt chặn các phần tử tương tác
    >
      {(provided, snapshot) => {
        return (
          <tr
            ref={mergeRefs(provided.innerRef, rowRef)} // Kết hợp hai tham chiếu lại với nhau
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...draggableProps}
            {...dragHandleProps}
            style={{
              ...style,
              ...provided.draggableProps.style,
            }}
          >
            {snapshot.isDragging ? (
              <div className="flex flex-col items-center justify-center w-4 drop-shadow-lg">
                <UpOutlined />
                <BaseText>
                  MoveTo
                </BaseText>
              </div>
            ) : props.children}
          </tr>
        )
      }
      }
    </Draggable >
  );
};


type TableProps = {
  onSelectChange?: (newSelectedRowKeys: any) => void;
  pagination?: false | TablePaginationConfig | undefined;
  columns: TableColumnsType<any>;
  data: Array<object>;
  sticky?: any;
  maxContent?: boolean;
  onRowClick?: (record: any, index: any) => void;
  className?: string; // for tailwindcss
};

export const BaseTableDnD = (props: TableProps) => {
  const {
    className,
    data,
    columns,
    onSelectChange,
    pagination,
    sticky,
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
    let classCustom = onRowClick ? "row-click" : "";
    return rowClickKey === `${(pagination as any)?.current || ""}-${index}`
      ? classCustom + " selected-row"
      : classCustom;
  };

  return (
    <Droppable droppableId="tableDnD">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Table
            scroll={maxContent ? { x: "max-content" } : {}}
            sticky={sticky}
            className={className}
            rowClassName={getRowClassName}
            rowSelection={onSelectChange && rowSelection}
            pagination={pagination}
            columns={columns}
            dataSource={data}
            rowKey="key"
            onRow={(record, index) => ({
              onClick: () => {
                if (onRowClick) {
                  onRowClick(record, index);
                  setRowClickKey(`${(pagination as any)?.current || ""}-${index}`);
                }
              },
            })}
            components={{
              body: {
                wrapper: DraggableBody,
                row: DraggableRow,
              },
            }}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
