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
          {userProfiles.userProfileId ? <img src={`http://localhost:8080/api/v1/user-profile/${userProfiles.userProfileId}/image/download`}/> : null}
          <h1>{userProfiles.username}</h1>
          <p>{userProfiles.userProfileId}</p>
          <Dropzone {...userProfile}/>
        </div>
        );
      });

      function Dropzone({ userProfileId }) {
        const onDrop = useCallback(acceptedFiles => {
          const file = acceptedFiles[0];
          
          console.log(file);
          
          const formData = new FormData();
          formData.append("file", file)

          axios.post(
            `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
            formData,
            {
              headers:{
                "Content-Type": "multipart/form-data"
              }
            }            
            ).then(() =>{
              console.log("file uploaded")
            }).catch(err =>{
              console.log("file uploaded error" + err)
            });
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
