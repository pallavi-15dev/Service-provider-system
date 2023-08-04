
import { useEffect } from 'react';
import React, { useState } from "react";
import Electrician from "./Electrician";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Row, Col,Input } from 'antd';
const { Search } = Input;

const ElectricianMap = () => {
  const [electricianData, setElectricianData] = useState({});

  useEffect(() => {
  
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

  const onSearch = (searchText) => {
    const filteredData = electricianData.filter(obj =>obj.firstname.includes(searchText));
    setElectricianData(filteredData);
  };
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
      <Search
    style={{ width: '300px', marginBottom: '16px' }}
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
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