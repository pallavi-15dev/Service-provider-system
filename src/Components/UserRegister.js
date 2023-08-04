import React from 'react';
import { Button, Form, Input, Card, Space, Select } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import {  DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import firebase from '../firebase';

import { Timestamp } from 'firebase/firestore';


dayjs.extend(customParseFormat);



const { Option } = Select;

const UserRegister = (props) => {


    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            firstname: props.firstname,
            lastname: props.lastname,
            address: props.address,
            mobile: props.mobile,
            city: props.city,
           // time: props.time,
            date:props.date,
          //type:props.type,
            // Add other fields here
        });
    }, [form, props]);


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    //const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {

        console.log(firstname);
        console.log(lastname);
        console.log(address);
        console.log(mobile);
        console.log(city);
        //console.log(time);
        console.log(date);
        console.log(email);
        console.log(password);

    
    };

    const onFinish = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const { selectedTime } = values;
           const firestoreDate = Timestamp.fromDate(new Date([date,selectedTime]));
         // const firestoreTimestamp = Timestamp.fromDate(selectedTime.toDate());

            const usersCollectionRef = collection(db, 'users');
            await addDoc(usersCollectionRef, {
                firstname,
                lastname,
                address,
                mobile,
                city,
                //time:firestoreTimestamp,
               date:firestoreDate,
               // type:props.type,
                gender,
                email,
            });

            // Clear the form fields after successful registration
            form.resetFields();

            // Close the modal after successful registration
            props.handleOk();
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (

        <Space direction="vertical" size={16}>
            <Card

                style={{
                    width: 500,
                }}
            >
                <h1>User Register</h1>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 86,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}

                    autoComplete="off"

                >


                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your first name!',
                            },
                        ]}

                    >
                        <Input value={firstname} onChange={(event) => { setFirstName(event.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input value={lastname} onChange={(event) => { setLastName(event.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input value={address} onChange={(event) => { setAddress(event.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        label="Mobile"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile!',
                            },
                        ]}
                    >
                        <Input value={mobile} onChange={(event) => { setMobile(event.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your city!',
                            },
                        ]}
                    >
                        <Input value={city} onChange={(event) => { setCity(event.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select defaultValue="select"
                            style={{
                                width: 350,
                            }}
                            value={gender}
                            onChange={(value) => setGender(value)}
                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>

                        </Select>
                    </Form.Item>
{/* 
                    <Form.Item name="time" label="Select Time" value={time}>

                        <TimePicker
                        onChange={(time,timeString)=>setTime(timeString)}
                            format="HH:mm"
                            style={{
                                width: '200px', borderRadius: '4px', border: '1px solid #ccc',
                                padding: '8px'
                            }}
                        />
                    </Form.Item> */}

                    <Form.Item name="date" label="Select Date" value={date} >
                        <DatePicker
                           onChange={(date,dateString)=>setDate(dateString)}
                            style={{ width: '200px', borderRadius: '4px', border: '1px solid #ccc', }}
                        />
                    </Form.Item>



                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your mail!',
                                min: 5
                            },
                        ]}
                    >
                        <Input value={email} onChange={(event) => { setEmail(event.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >

                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 28,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={handleSignIn} >
                            Register
                        </Button>

                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
};
export default UserRegister;