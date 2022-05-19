import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import axios from "axios";
import {useDropzone} from 'react-dropzone'



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

    return userProfiles.map((userProfiles, index) => {

        return (
        <div key={index}>
          <Dropzone />
          <h1>{userProfiles.username}</h1>
          <p>{userProfiles.userProfileId}</p>
        </div>
        );
      });

      function Dropzone() {
        const onDrop = useCallback(acceptedFiles => {
          const file = acceptedFiles[0];
          console.log(file);
        }, [])
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      
        return (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the image here ...</p> :
                <p>Drag 'n' drop some profile image, or click to select profile image</p>
            }
          </div>
        )
      }
};

function App() {
  return (
    <div className="App">
      <UserProfile />
    </div>
  );
}

export default App;
