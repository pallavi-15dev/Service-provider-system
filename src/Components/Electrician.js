
import Card from 'antd/es/card/Card';
import classes from './Dashboard.module.css';
import { useState } from 'react';
import ElectricianMap from './ElectricianMap';
import UserRegister from './UserRegister';
import { Modal } from 'antd';
import { collection, addDoc} from 'firebase/firestore';
import { db } from '../firebase';


const Electrician = ({ electricianData }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        // setFormData({ name: '', email: '', phone: '' });
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

{isModalOpen && (
    <Modal open={isModalOpen}
    onCancel={handleCancel}
    onOk={handleOk}
    >
                <UserRegister 
                electricianData={electricianData}
                handleOk={handleOk} handleCancel={handleCancel} /></Modal>)}

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