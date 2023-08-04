
import Card from 'antd/es/card/Card';
import classes from './Dashboard.module.css';
import { useState } from 'react';
import UserRegister from './UserRegister';
import { Modal } from 'antd';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';


const Plumber = ({ plumberData }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setModalOpen(true);
    };
    const handleOk2 = () => {

        setModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
       
    };
    const handleCancel2 = () => {

        setModalOpen(false);

    };

    const onFinish = async (values) => {
        try {
            // ... Firebase authentication code ...
            const firstname = values.firstname;
            const address = values.address;
            const mobile = values.mobile;
            const city = values.city;
            const specialization = values.specialization;
            const gender = values.gender;


            const usersCollectionRef = collection(db, 'serviceProviders'); // Reference to the "electricians" collection
            await addDoc(usersCollectionRef, {
                firstname,
                address,
                mobile,
                city,
                specialization,
                gender,

                // Add any other data you want to store for the electrician
            });
            setIsModalOpen(false);

            // ... Clear form fields and close the modal ...

        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    return (


        <>
            {/* <Forms isModalOpen={isModalOpen} handleCancel={handleCancel}/> */}
            <Modal title="Sign-In Required" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>You have to sign-in first!</p>

            </Modal>

            {modalOpen && (
                <Modal open={modalOpen}
                    onCancel={handleCancel2}
                   
                >
                    <UserRegister
                        plumberData={plumberData}
                        type='plumber'
                        handleOk={handleOk2} handleCancel={handleCancel2} /></Modal>)}

            <Card

                bordered={true}
                hoverable style={{
                    width: 400,
                    height: 'auto',
                    marginLeft: 'auto',
                    marginTop: 50,
                    textAlign: 'left'
                }}
            >
                <p>Name: {plumberData.firstname}</p>
                <p>Address: {plumberData.address}</p>
                <p>Mobile: {plumberData.mobile}</p>
                <p>City: {plumberData.city}</p>
                <p>Specialization: {plumberData.specialization}</p>
                <p>Gender: {plumberData.gender}</p>



                <div className={classes.actions}>

                    <button type='button' onClick={showModal}>
                        Book
                    </button>
                </div>

            </Card>


        </>

    );
};

export default Plumber;