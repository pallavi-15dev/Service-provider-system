
import { useEffect } from 'react';
import React, { useState } from "react";
import Carpenter from "./Carpenter";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Row, Col,Input } from 'antd';
const { Search } = Input;


const CarpenterMap = () => {
  const [carpenterData, setCarpenterData] = useState([]);
 

  useEffect(() => {
    const fetchCarpenterData = async () => {
      try {
        const carpentersCollectionRef = collection(db, 'serviceProviders');
        const querySnapshot = await getDocs(carpentersCollectionRef);
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        data=data.filter((item)=>item.specialization === "carpenter");
        setCarpenterData(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCarpenterData();
  }, []);

  const onSearch = (searchText) => {
    const filteredData = carpenterData.filter(obj =>obj.firstname.includes(searchText));
    setCarpenterData(filteredData);
  };
  
  if (!Array.isArray(carpenterData)) {
    return <p>Loading...</p>;
  }
  
  return (
    <>
      <h1>CARPENTER'S</h1>
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
          {carpenterData.map((carpenter) => (
            <Col key={carpenter.id} span={8}>
              <Carpenter carpenterData={carpenter} />
            </Col>
          ))}
        </Row>


      </div>
    </>
  );
};

export default CarpenterMap;