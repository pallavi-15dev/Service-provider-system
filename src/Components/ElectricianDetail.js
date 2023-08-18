
import { Card, Col, Row, Modal, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ServiceProviderUpdate from './ServiceProviderUpdate';

const ElectricianDetail = () => {
  const [electricianData, setElectricianData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
    //setInitialValues(electricianData[0]);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProviderData = async () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(collection(db, 'serviceProviders'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        const userDataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setElectricianData(userDataArray);
        setLoading(false);
      }
    };
    fetchProviderData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>

          <Card
            title="My Intro"
            bordered={false}
            hoverable
            style={{
              width: 400,
              marginTop: 90,
              marginLeft: 200,
              textAlign: 'left',
            }}
          >
            <Button type="primary" onClick={showModal}>
              Edit
            </Button>

           {isModalOpen && <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <ServiceProviderUpdate
                electricianData={electricianData[0]}
               // initialValues={initialValues}
              /></Modal>}


            <p>Name: {electricianData[0]?.firstname + '  ' + electricianData[0]?.lastname}</p>
            <p>Address: {electricianData[0]?.address}</p>
            <p>Mobile: {electricianData[0]?.mobile}</p>
            <p>City: {electricianData[0]?.city}</p>
            <p>Specialization: {electricianData[0]?.specialization}</p>
            <p>Gender: {electricianData[0]?.gender}</p>
          </Card>
        </Col>
        </Row>

    </>
  );
};

export default ElectricianDetail;