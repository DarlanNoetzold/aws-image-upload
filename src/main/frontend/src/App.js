import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";


const UserProfile = () =>{

    const [userProfiles, setUserProfiles] = useState([]);

    const fetchUserProfiles = () => {
      axios.get("http://localhost:8080/api/v1/user-profile").then(res =>{
        console.log(res);
        setUserProfiles(res.data);
      });
    }

    useEffect(() => {
      fetchUserProfiles();
    }, []);

    return userProfiles.mao((userProfiles, index) => {

        return (<div>
          <h1>{userProfiles.username}</h1>
          <p>{userProfiles.userProfileId}</p>
        </div>
        );
      });
};

function App() {
  return (
    <div className="App">
      <UserProfile />
    </div>
  );
}

export default App;
