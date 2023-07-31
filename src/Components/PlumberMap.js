import { useEffect } from 'react';
import React, { useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Row, Col } from 'antd';
import Plumber from "./Plumber";

const PlumberMap = () => {

    const [plumberData, setPlumberData] = useState({});
    useEffect(() => {
        // Fetch data from the database and update the state with the data.
        const fetchPlumberData = async () => {
            try {
                const plumbersCollectionRef = collection(db, 'serviceProviders');
                const querySnapshot = await getDocs(plumbersCollectionRef);
                let data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                data=data.filter((item)=>item.specialization === "plumber");
    
                setPlumberData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPlumberData();
    }, []);
    if (!Array.isArray(plumberData)) {
        // Add some fallback UI or loading state if the data is not an array yet
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>PLUMBER'S</h1>
            <div>
                <Row gutter={[16, 16]}>
                    {plumberData.map((plumber) => (
                        <Col key={plumber.id} span={8}>
                            <Plumber plumberData={plumber} />
                        </Col>
                    ))}
                </Row>


            </div>
        </>
    )
}

export default PlumberMap;