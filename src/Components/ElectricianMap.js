
import { useEffect } from 'react';
import React, { useState } from "react";
import Electrician from "./Electrician";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Row, Col,Input } from 'antd';

const ElectricianMap = () => {
  const [electricianData, setElectricianData] = useState({});

  useEffect(() => {
    // Fetch data from the database and update the state with the data.
    const fetchElectricianData = async () => {
      try {
        const electriciansCollectionRef = collection(db, 'serviceProviders');
        const querySnapshot = await getDocs(electriciansCollectionRef);
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        data=data.filter((item)=>item.specialization === "electrician")
        setElectricianData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchElectricianData();
  }, []);
  if (!Array.isArray(electricianData)) {
    return <p>Loading...</p>;
  }

  const handleSearch = (searchText) => {
    // Filter electricians based on the specialization and update the state
    const filteredData = electricianData.filter(
      (electrician) => electrician.name === searchText
    );
    setElectricianData(filteredData);
  };
  return (
    <>
      <h1>ELECTRICIAN'S</h1>
      <div>
      <Input.Search
          placeholder="Search by name"
          enterButton="Search"
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
        />
        <Row gutter={[16, 16]}>
          {electricianData.map((electrician) => (
            <Col key={electrician.id} span={8}>
              <Electrician electricianData={electrician} />
            </Col>
          ))}
        </Row>


      </div>
    </>
  );
};

export default ElectricianMap;