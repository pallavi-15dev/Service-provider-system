import React from 'react';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Button, Form, Input, Card, Space, Select } from 'antd';

const { Option } = Select;

const ServiceProviderUpdate = (props) => {

    const [firstname, setFirstName] = useState(props.electricianData.firstname);
    const [lastname, setLastName] = useState(props.electricianData.lastname);
    const [address, setAddress] = useState(props.electricianData.address);
    const [mobile, setMobile] = useState(props.electricianData.mobile);
    const [city, setCity] = useState(props.electricianData.city);
    const [specialization, setSpecialization] = useState(props.electricianData.specialization);
    const [gender, setGender] = useState(props.electricianData.gender);
    const [email, setEmail] = useState(props.electricianData.email);
    const [password, setPassword] = useState(props.electricianData.password);

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
            email: props.email,
            password: props.password,
        });
    }, [form, props]);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const handleUpdate = async (id) => {

        try {
            const usersCollectionRef = collection(db, 'serviceProviders');
            const payload = {
                firstname,
                lastname,
                address,
                mobile,
                city,
                specialization,
                gender,
                email,
                password,

            }
            console.log(payload);
            await addDoc(usersCollectionRef, payload);
            await updateDoc(doc(db, 'serviceProviders', id), payload);
            props.handleOk();
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (

        <Space direction="vertical" size={16}>
            <Card

                style={{
                    width: 500,
                }}
            >
                <h1>Service Provider Update</h1>
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
                    onFinish={handleUpdate}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >


                    <Form.Item
                        label="First Name"
                        name="firstname"

                    >
                        <Input value={firstname} onChange={(e) => { setFirstName(e.target.value) }} defaultValue={props.electricianData.firstname} />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"

                    >
                        <Input onChange={(event) => { setLastName(event.target.lastname) }} defaultValue={props.electricianData.lastname} />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"

                    >
                        <Input onChange={(event) => { setAddress(event.target.address) }} defaultValue={props.electricianData.address} />
                    </Form.Item>

                    <Form.Item
                        label="Mobile"
                        name="mobile"

                    >
                        <Input onChange={(event) => { setMobile(event.target.mobile) }} defaultValue={props.electricianData.mobile} />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"

                    >
                        <Input onChange={(event) => { setCity(event.target.city) }} defaultValue={props.electricianData.city} />
                    </Form.Item>


                    <Form.Item
                        label="Specialization"
                        name="specialization"

                    >
                        <Select
                            onChange={(event) => { setSpecialization(event.target.specialization) }} defaultValue={props.electricianData.specialization}
                            style={{
                                width: 350,
                            }}

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

                    >
                        <Select
                            onChange={(event) => { setGender(event.target.gender) }} defaultValue={props.electricianData.gender}
                            style={{
                                width: 350,
                            }}

                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"

                    >
                        <Input onChange={(event) => { setEmail(event.target.email) }} defaultValue={props.electricianData.email} />
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >

                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"

                    >
                        <Input onChange={(event) => { setPassword(event.target.password) }} defaultValue={props.electricianData.password} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 28,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={() => handleUpdate(props.electricianData.id)}>
                            Update
                        </Button>

                    </Form.Item>


                </Form>
            </Card>
        </Space>
    );
};
export default ServiceProviderUpdate;