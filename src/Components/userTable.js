import React, { useState, useEffect, message } from 'react';
import { Tabs,Form, Input, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';
//import type { TabsProps } from 'antd';
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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
            mobile: '',
            city: '',
            email: '',
            password: '',
            ...record,
        });
        setEditingKey(record.email);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (email, id) => {
        try {
            const row = await form.validateFields();
            await updateDoc(doc(db, 'users', id), row);
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
            width: '15%',
            editable: true,
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            width: '15%',
            editable: true,
        },
        {
            title: 'address',
            dataIndex: 'address',
            width: '15%',
            editable: true,
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            width: '15%',
            editable: true,
        },
        {
            title: 'City',
            dataIndex: 'city',
            width: '15%',
            editable: true,
        },


        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => {
                const editable = record.email === editingKey;
                return editable ? (
                    <span>
                        <Button type="primary" onClick={() => save(record.email, record.id)}>
                            Save
                        </Button>
                        <Button onClick={cancel}>Cancel</Button>
                    </span>
                ) : (
                    <Button onClick={() => edit(record)}>Edit</Button>
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
        marginRight: '300px',
        marginLeft: '300px',
        marginTop: '30px',

    };

    return (
        <>
        {/* <Form form={form} component={false} > */}
            <h1><center>User's details</center></h1>
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
       {/*  </Form> */}
        </>
    );
    
};

  
  
export default UserTable;
