
import React, { useState,message,useEffect, } from 'react';

import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc, getFirestore, updateDoc } from 'firebase/firestore';
import app from '../firebase';

const originData = [];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'mobile' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
            width: '100px',
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const UserTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  
  const isEditing = (record) => record.email === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      firstname: '',
      lastname: '',
      address: '',
      mobile:'',
      email:'',
      ...record,
    });
    setEditingKey(record.email);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (email,id) => {
    try {
      const row = await form.validateFields();
    await updateDoc(doc(db, 'users',id), row);
      const newData = [...data];
      const index = newData.findIndex((item) => email === item.email);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  useEffect(() => {

            const fetchUsers = async () => {
    
                try {
                    const usersCollectionRef = collection(db, 'users');
                    const querySnapshot = await getDocs(usersCollectionRef);
    
                    const usersData = querySnapshot.docs.map((doc) => ({
                   
                            ...doc.data(),
                            id: doc.id, // Add the 'id' property to the data
                  
                    }));
                    setData(usersData);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
    
            fetchUsers();
        }, []);
        const handleDelete = async (email, id) => {
            try {
                const db = getFirestore(app);
                await deleteDoc(doc(db, 'users', id));
                const newData = data.filter((item) => item.email !== email);
                setData(newData);
                message.success('Data deleted successfully!');
            } catch (error) {
                console.error('Error deleting data:', error);
                message.error('Error deleting data. Please try again.');
            }
        };

  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      width: '25%',
      editable: true,
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      width: '15%',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
        width: '40%',
        editable: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '40%',
        editable: true,
      },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);  //record.email === editingKey;
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.email,record.id,)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
        render: (_, record) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.email, record.id,)}>
                <a>Delete</a>
            </Popconfirm>

        ),
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'mobile' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const tableStyles = {
            marginRight: '200px',
            marginLeft: '200px',
            marginTop: '30px',
    
        };
  return (
    <Form form={form} component={false}>
      <Table
       style={tableStyles}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default UserTable;