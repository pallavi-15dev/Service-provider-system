import { Card, Col, Row } from 'antd';
import React,{useState} from 'react';
import './Dashboard.module.css';
import { Link } from 'react-router-dom';
import Electrician from './Electrician';


const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    const handleCancel = () => {
        setIsModalOpen(false);
       
    };
    return(
  
   <Card>
    <h1><u>Our Service Provider</u> </h1>
 
  <Row>
    <Col>
      <Card title="Electrician" color='red' bordered={false} hoverable style={{
        width: 300,
        marginLeft:150,
        marginTop:50,
        textAlign:'left'
       
      }}>
       <b> Services:</b>
      
        <p>1.Switch and Outlet Repair/Installation</p>
        <p>2.Electrical Panel Upgrades</p>
        <p>3.Lighting Repair/Installation/Upgrades</p>
  
        <p>4.Ceiling Fan Installation</p>
        <p>5.Wiring and Rewiring</p>
        <p>6.Washer and Dryer Hookups</p>
        <Link to="/electrician"> More!!!</Link>
        {/* <button onClick={showModal}>More</button>
        {isModalOpen && <Electrician handleCancel={handleCancel} />} */}
      </Card  >
    </Col>
   
    <Col>
      <Card title="Plumber" bordered={false}  hoverable style={{
        width: 300,
        marginTop:50,
        marginLeft:30,
       textAlign:'left'
        
      }}>
        <b> Services:</b>
        <p>1.Cleaning and unclogging drains.</p>
          <p>2.Proper garbage disposal..</p>
          <p>3.Maintenance of valves and pipes.</p>
          <p>4.Fixing water jets.</p>
          <p>5.Detecting and fixing any gas leaks.</p>
          <p>6.Cleaning main pipelines.</p>
          <Link to="/plumber"> More!!!</Link>
      </Card>
    </Col>
   
    <Col >
      <Card title="Carpenter" bordered={false}  hoverable style={{
        width: 300,
        marginTop:50,
        marginLeft:30,
        textAlign:'left',
      
       
      }}>
          <b> Services:</b>
          
          <p>1.Furniture design and construction</p>
          <p>2.Door and window installation or repair</p>
          <p>3.Flooring installation</p>
          <p>4.Structural framing</p>
          <p>5.Custom woodworking</p>
          <p>6.Stair construction</p>
          <Link to="/carpenter"> More!!!</Link>
      </Card>
    </Col>
  </Row>
  </Card>
    );
  };



export default Dashboard;