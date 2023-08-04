
import Card from 'antd/es/card/Card';
import classes from './Dashboard.module.css';
import { useState } from 'react';
import UserRegister from './UserRegister';
import { Button, Modal } from 'antd';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';


const Electrician = ({ electricianData }) => {

   const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // const handleBookElectrician = async (userId) => {
    //     try {
    //         const userRef = doc(db, 'users', userId);
    //         await updateDoc(userRef, { type: 'electrician' });
    //     } catch (error) {
    //         console.error('Error booking electrician:', error);
    //     }
    // };

    const showModal = () => {
        // handleBookElectrician(electricianData.id)
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


            });
            setIsModalOpen(false);



        } catch (error) {
            console.error('Registration error:', error);
        }
    };
    return (


        <>

            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Link to="/"> You have already login??Login here!!!!</Link>

                <p>Sign-up required first...</p>

            </Modal>


            {modalOpen && (
                <Modal open={modalOpen}
                    onCancel={handleCancel2}

                >
                    <UserRegister
                        electricianData={electricianData}
                        type='electrician'
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
                <p>Name: {electricianData.firstname}</p>
                <p>Address: {electricianData.address}</p>
                <p>Mobile: {electricianData.mobile}</p>
                <p>City: {electricianData.city}</p>
                <p>Specialization: {electricianData.specialization}</p>
                <p>Gender: {electricianData.gender}</p>



                <div className={classes.actions}>

                    <button type='button' onClick={showModal}>
                        Book
                    </button>
                </div>

            </Card>


        </>

    );
};

export default Electrician;