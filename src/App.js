import { useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';


function App() {

  const [file, setFile] = useState()
  const [myipfsHash, setIPFSHASH] = useState('')
 

  const handleFile=async (fileToHandle) =>{

    

    console.log('starting')

    // initialize the form data
    const formData = new FormData()

    // append the file form data to 
    formData.append("file", fileToHandle)

    // call the keys from .env

    const API_KEY = process.env.REACT_APP_API_KEY
    const API_SECRET = process.env.REACT_APP_API_SECRET

    // the endpoint needed to upload the file
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      formData,
      {
          maxContentLength: "Infinity",
          headers: {
              "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
              'pinata_api_key': 'd6f95d9e9aa8496fbfc7',
              'pinata_secret_api_key': '7640b56dee9b2db26af10ae2000b169b17ed13925a9254160d956e2d5d989c41'

          }
      }
  )

  console.log(response)

  // get the hash
  setIPFSHASH(response.data.IpfsHash)

  
  }

  

  return (
    <div className="App">
      <input type="file" onChange={(event)=>setFile(event.target.files[0])}/>
      <button onClick={()=>handleFile(file)}>Pin</button>
      
      
    {

      //  render the hash
      myipfsHash.length > 0 && <img height='200' src={`https://gateway.pinata.cloud/ipfs/${myipfsHash}`} alt='not loading'/>
    }
    

    </div>
  );
}

export default App;
