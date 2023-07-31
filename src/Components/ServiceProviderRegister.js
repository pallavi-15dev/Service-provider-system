import React from 'react';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Button, Form, Input, Card, Space, Select } from 'antd';


const { Option } = Select;


const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const ServiceProviderRegister = (props) => {


    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };


    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            firstname: props.firstname,
            lastname: props.lastname,
            address: props.address,
            mobile: props.mobile,
            city: props.city,
            specialization: props.specialization,
            gender: props.gender,
            //email:props.email,
            // Add other fields here
        });
    }, [form, props]);


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [city, setCity] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSignIn = async (event) => {
        //event.preventDefault();
        console.log(firstname);
        console.log(lastname);
        console.log(address);
        console.log(mobile);
        console.log(city);
        console.log(specialization);
        console.log(gender);
        console.log(email);
        console.log(password);

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const usersCollectionRef = collection(db, 'serviceProviders');
            await addDoc(usersCollectionRef, {
                firstname,
                lastname,
                address,
                mobile,
                city,
                specialization,
                gender,
                email,
                password,

            });

        } catch (error) {
            console.error('Registration error:', error);

        };


    };

    const onFinish = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const usersCollectionRef = collection(db, 'serviceProviders');
            await addDoc(usersCollectionRef, {
                firstname,
                lastname,
                address,
                mobile,
                city,
                specialization,
                gender,
                email,
                password,

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
                <h1>Service Provider Register</h1>
                <Form
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
                    onFinishFailed={onFinishFailed}
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
                        label="Specialization"
                        name="specialization"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose your specialization!',
                            },
                        ]}
                    >
                        <Select
                            defaultValue="select"
                            style={{
                                width: 350,
                            }}
                            value={specialization}
                            onChange={(value) => setSpecialization(value)}
                        >
                            <Option value="electrician">Electrician</Option>
                            <Option value="plumber">Plumber</Option>
                            <Option value="fitter">Fitter</Option>
                            <Option value="carpenter">Carpenter</Option>
                        </Select>


                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a gender!',
                            },
                        ]}
                    >
                        <Select
                            defaultValue="select"
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

                    {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 28,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={handleSignIn}>
                            Register
                        </Button>

                    </Form.Item>


                </Form>
            </Card>
        </Space>
    );
};
export default ServiceProviderRegister;