
import React from 'react';
import { Modal } from 'antd';
import { useState, useRef } from 'react';
import { Form, Input, Button,message  } from 'antd';
import Electrician from './Electrician';

const Forms = (props) => {
 return (
        <>

        <Electrician></Electrician>
        {/* <Modal

            open={props.isModalOpen}
            onCancel={props.handleCancel}
            cancelButtonProps={{ children: 'Close' }}
            onOk={confirmHandler}
        >
            <Form
                onFinish={onFinish}
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

                //onFinishFailed={onFinishFailed}
                autoComplete="off"
                ref={formRef}
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your mobile number!',
                        },
                    ]}
                >
                    <Input />
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
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="submit" htmlType="submit">submit</Button>
                </Form.Item>

                <Modal
        title="Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to submit the form?</p>
      </Modal>
            </Form>

        </Modal> */}
       
        </>
       
        
    )
}

export default Forms;