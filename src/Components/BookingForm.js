import React from 'react';
import { Button, Form, Input, Card, Space, Select } from 'antd';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc,Timestamp } from 'firebase/firestore';
import { TimePicker, DatePicker } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


const { Option } = Select;

const BookingForm = (props) => {


    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            firstname: props.firstname,
            lastname: props.lastname,
            address: props.address,
            mobile: props.mobile,
           time: props.time,
            date: props.date,
           
        });
    }, [form, props]);


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const[time,setTime]=useState('');
    const[date,setDate]=useState('');
    const[selectedTime,setSelectedTime]=useState(null);
   


   
    const onFinish = async (values) => {
        try {
  
            const firestoreDate = new Date(); 
            const firestoreTime = new Date(selectedTime);
        

            const usersCollectionRef = collection(db, 'appointments');
            await addDoc(usersCollectionRef, {
                firstname,
                lastname,
                address,
                mobile,

               
                date: firestoreDate.toDateString(),
              time: firestoreTime.toTimeString(),


            });


            form.resetFields();
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
                <h2>Booking form</h2>
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





                    <Form.Item name="time" label="Select Time" value={time}>

                        <TimePicker
                              onChange={(time) => setSelectedTime(time)}
                            format="HH:mm"
                            style={{
                                width: '200px', borderRadius: '4px', border: '1px solid #ccc',
                                padding: '8px'
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="date" label="Select date" value={date}>

                        <DatePicker
                           onChange={(date) => setDate(date)}
                           
                            style={{
                                width: '200px', borderRadius: '4px', border: '1px solid #ccc',
                                padding: '8px'
                            }}
                        />
                    </Form.Item>
                    
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 28,
                        }}
                    >
                        <Button type="primary" htmlType="submit" >
                            Book
                        </Button>

                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
};
export default BookingForm;