import React, { useEffect,useState } from 'react'
import axios from 'axios';
import sparevnet from '../images/sparevnet.png' 
// import { useHistory } from 'react-router-dom';

function Login({status,user,userID}) {
    // const history = useHistory();
    const [vendorList, setVendorList] = useState([]);
    const [inputVendor, setInputVendor] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const login = () =>{
        for(let i=0; i < vendorList.length; i++){
            if(inputVendor.toLowerCase() == vendorList[i].Vendor_Name.toLowerCase()){
                if(inputPassword.toLowerCase() == vendorList[i].Vendor_ID.toLowerCase()){
                    status(true)
                    user(vendorList[i].Vendor_Name)
                    userID(vendorList[i].Vendor_ID)
                    // history.push('/');
                }else{
                    alert("Try Again")
                }
            }
        }
    }
    useEffect(() => {
    const fetchVendorList = async () => {
        try {
            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint providing the image URLs
            const response = await axios.get('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec?reqAsset=Vendor');
            // Assuming the response data is an array of image URLs
            setVendorList(response.data.data.slice(1,));
            // console.log(vendorList);
        } catch (error) {
            console.error('Error fetching image list:', error);
        }
        };
        fetchVendorList();
    }, []);

  return (
    
<div className='h-screen w-screen flex justify-center'>
    <div className='text-center border p-10 rounded w-80 h-96 mt-10'>
        <div>
        <div className='flex justify-center'>    
        <img
            //src="https://img.logoipsum.com/243.svg"
            src={sparevnet}
            className={"w-48 mr-5"}
            alt=""
          /></div>
        <input className="shadow appearance-none border rounded w-full p-2 m-4 text-gray-700 focus:outline-none focus:shadow-outline" type="text" placeholder="Vendor Name" onChange={(event) => setInputVendor(event.target.value)}/>
        <input className="shadow appearance-none border rounded w-full p-2 m-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password: Vendor Id" onChange={(event) => setInputPassword(event.target.value)}/>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={login}>
        Sign In
      </button>
    </div>    
    </div>
    </div>

  )
}

export default Login

//  <div className='border p-10 rounded text-center m-50'>
// sequence matters too