
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { List, Button, Modal, Card } from 'antd';


const UserByServiceProvider = () => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (item) => {

        setSelectedItem(item);
        setIsModalOpen(true);

    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [data, setData] = useState();
    useEffect(() => {

        const fetchUsers = async () => {

            try {
                const usersCollectionRef = collection(db, 'appointments');
                const querySnapshot = await getDocs(usersCollectionRef);

                const usersData = querySnapshot.docs.map((doc) => ({

                    ...doc.data(),
                    id: doc.id, // Add the 'id' property to the data

                }));
                setData(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <h2><center>Appointments</center></h2>
            <Modal title="User Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {selectedItem && (
                    <>
                        <p>Name: {selectedItem.firstname + ' ' + selectedItem.lastname}</p>
                        <p>Address: {selectedItem.address}</p>
                        <p>Mobile: {selectedItem.mobile}</p>
                    </>
                )}
            </Modal>
            <List
                itemLayout="horizontal"
                style={{
                    marginTop: 40,
                    width: 800,
                    marginLeft: 250,
                }}


                bordered={true}
                dataSource={data}
                renderItem={(item, index) => (

                    <List.Item
                        actions={
                            [<Button type="primary" >Accept</Button>, <Button type="primary" onClick={() => showModal(item)}>More</Button>]}

                    >
                        
                        <List.Item.Meta

                            title={item.firstname}
                            description={item.address}
                        />
                        <div>{item.time}</div>


                    </List.Item>
                )}

            />
        </>
    );
};
export default UserByServiceProvider;

// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase'; // Assuming you have set up your Firestore connection
// import { collection, query, where, getDocs } from 'firebase/firestore';

// const UserByServiceProvider = () => {
//   const [users, setUsers] = useState([]);
  
//   useEffect(() => {
//     const fetchUsersByServiceProvider = async () => {
//       try {
//         const serviceProviderId = 'id';
//         const usersCollectionRef = collection(db, 'users');
//         const q = query(usersCollectionRef, where('service_provider_email', '==', serviceProviderEmail));
//         const querySnapshot = await getDocs(q);

//         const usersData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setUsers(usersData);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
    
//     fetchUsersByServiceProvider();
//   }, []);

//   return (
//     <div>
//       <h2>Users Associated with Service Provider</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserByServiceProvider;
