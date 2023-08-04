
import './App.css';
import TabComponent from './Components/TabComponent';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './Components/Login';
import ServiceProviderTable from './Components/ServiceProviderTable';
import Header from './Components/Header';
import Electrician from './Components/Electrician';
import UserRegister from './Components/UserRegister';
import ServiceProviderRegister from './Components/ServiceProviderRegister';
import Dashboard from './Components/Dashboard';
import CarpenterMap from './Components/CarpenterMap';
import ElectricianMap from './Components/ElectricianMap';
import PlumberMap from './Components/PlumberMap';
import UserTable from './Components/userTable';
import ElectricianDetail from './Components/ElectricianDetail';
import AppointmentTable from './Components/AppointmentTable';
import BookingForm from './Components/BookingForm';
import ServiceProviderUpdate from './Components/ServiceProviderUpdate';

function App() {

  return (
    <div className="App">



      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/electrician" element={<ElectricianMap />} />
          <Route path="/plumber" element={<PlumberMap />} />
          <Route path="/carpenter" element={<CarpenterMap />} />
          <Route path="/" element={<Login />} />
          <Route path="/electricianform" element={<Electrician />} />
          <Route path="/serviceprovidertable" element={<ServiceProviderTable />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/service-provider" element={<ServiceProviderRegister />} />
          <Route path="/usertable" element={<UserTable />} />
          <Route path="/tab" element={<TabComponent />} />
          <Route path="/electrician-details" element={<ElectricianDetail />} />
          <Route path="/appointment" element={<AppointmentTable/>} />
          <Route path="/booking" element={<BookingForm/>}/>
          <Route path='/provider-update' element={<ServiceProviderUpdate/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
