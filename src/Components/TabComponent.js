import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UserTable from './userTable';
import ServiceProviderTable from './ServiceProviderTable';
import AppointmentTable from './AppointmentTable';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Users`,
    children: <UserTable/>,
  },
  {
    key: '2',
    label: `Service Providers`,
    children:<ServiceProviderTable/>,
  },
  {
    key: '3',
    label: `Appoinments`,
    children:<AppointmentTable/>,
  },
 
];

const App: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;