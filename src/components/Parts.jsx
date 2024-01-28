import React, { useEffect,useState,useRef } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom"
import { useLocation } from 'react-router-dom'
import loading from '../images/loading.gif' 
import Drawer from './Drawer';
import AddPart from './AddPart';
import { MapPin  } from 'lucide-react';
import Quotation from './Quotation';
import ViewPart from './ViewPart';

function Parts({user,userID}) {
    const location = useLocation()
    const {brand,partList} = location.state
    const {ModelId} = useParams();
    const [partData, setPartData] = useState([]);
    const [partDataCopy, setPartDataCopy] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [isOpen3, setIsOpen3] = useState(false)
    const [isOpen4, setIsOpen4] = useState(false)
    const [map, setMap] = useState(<></>)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const toggleDrawer2 = () => {
      setIsOpen2((prevState) => !prevState)
  }
  const toggleDrawer3 = (event,map) => {
    setIsOpen3((prevState) => !prevState)
    setMap(map)
}
  const toggleDrawer4 = (event,map) => {
    setIsOpen4((prevState) => !prevState)
}

    const addToCart = (order) => {
      partDataCopy[order.key].CartUnits = order.Units
      setPartDataCopy(partDataCopy)
      console.log(partDataCopy)
    }

    useEffect(() => {
        setIsLoading(true);
        // Function to fetch data using Axios
        const fetchPartData = async () => {
          try {
            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint providing the image URLs
            const response = await axios.get('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec?reqAsset='+brand+'_'+ModelId.replaceAll(' ','_').replaceAll('+','%2B'));
            // Assuming the response data is an array of image URLs
            setPartData(response.data.data.slice(1,));
            setPartDataCopy(response.data.data.slice(1,));
          //  console.log(partData);
           setIsLoading(false);
          } catch (error) {
            console.error('Error fetching image list:', error);
          }
        };

        fetchPartData();
        // console.log(user);
      }, [ModelId]);


  return (
    <div className='flex'>
        <Drawer children={<AddPart parts={partList} model={ModelId}
          inventory={
            partData.filter(item => item.Vendor_ID === userID)
          } userID={userID} brand={brand} toggle={isOpen}/>} isOpen={isOpen} setIsOpen={toggleDrawer}/>
        <Drawer children={<Quotation orders={partDataCopy} model={ModelId} brand={brand} userID={userID}/>} isOpen={isOpen2} setIsOpen={toggleDrawer2}/>
        <Drawer children={<ViewPart inventory={
                partData.filter(item => item.Vendor_ID === userID)
              } model={ModelId}/>} isOpen={isOpen4} setIsOpen={toggleDrawer4}/>
        <Drawer children={<>{map}</>} isOpen={isOpen3} setIsOpen={toggleDrawer3}/>
        <div className='pl-8 pr-6 overflow-y-auto overflow-hidden lg:h-96 xl:h-lvh'>
        <p className='bold text-xl '>Marketplace: ({ModelId})
        </p>  
        {isLoading ? <img src={loading} 
        className='h-5 w-5'
        /> : 
         <table class="table-fixed ">
         <thead>
            <tr>
            <th class="font-bold p-2 border-b text-left w-1/5">Part_Type</th>
            <th class="font-bold p-2 border-b text-left w-1/5">Units</th>
            <th class="font-bold p-2 border-b text-Center w-1/5">Add to Cart</th>  
            <th class="font-bold p-2 border-b text-left w-1/5">Unit_Price</th>   
            <th class="font-bold p-2 border-b text-left w-2/5">Vendor_Name</th>
            <th class="font-bold p-2 border-b text-left w-1/5">Contact</th>
            
                  
            </tr>
        </thead>
            {  
                partData.filter(item => item.Vendor_ID !== userID).map((value, index) => (     
                        <tbody>
                        <tr key={index}>
                            <td class="border-b text-left w-1/5">
                              {<img src={value.Part_Logo} className='m-1 border-2 border-grey h-10 w-10 rounded'/>}
                              {value.Part_Type}</td>
                            <td class="p-2 border-b text-center w-1/5">{value.Units}</td>
                            <td class="p-2 border-b text-left w-1/5">
                              <input class="mx-2 border text-center " type="number" min="0" max={value.Units} onChange={evt => addToCart({
                                key:index,
                                Part_Type: value.Part_Type,
                                Part_Logo: value.Part_Logo,
                                Units: evt.target.value,
                                Unit_Price:value.Unit_Price,
                                Vendor_Name: value.Vendor_Name,
                                Vendor_ID: value.Vendor_ID,
                              })} required />
                            </td>
                            <td class="p-2 border-b text-left w-1/5">{value.Unit_Price}</td>
                            <td class="p-2 border-b text-left w-2/5">{value.Vendor_Name}</td>
                            <td class="border-b text-left w-1/5">
                            <a href={"tel:"+value.Phone_Num} className='text-sm'>📞 +{value.Phone_Num}</a>
                            <button type="button" onClick={(event)=>toggleDrawer3(event,
                              <div dangerouslySetInnerHTML={{__html: value.Google_Loc}} />
                            )}><MapPin /></button>
                            </td>
                            {/* <div dangerouslySetInnerHTML={{__html: value.Google_Loc}} /> */}
                        </tr>
                                              
                        {/* <MyModal toggle={toggleDrawer3} map={<div style={{width:100}} dangerouslySetInnerHTML={{__html: value.Google_Loc}} />}></MyModal> */}
                        </tbody>
                        
                
                 ))
            }
        </table>}
        </div>
        <div className='flex flex-col'>
        <button type="button" onClick={toggleDrawer} class="ml-4 mt-1 focus:outline-none text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm p-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 h-12">Update Model Inventory</button>
        <button type="button" onClick={toggleDrawer4} class="ml-4 mt-1 focus:outline-none text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm p-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 h-8">View Inventory</button>
        <button type="button" onClick={toggleDrawer2} class="ml-4 mt-1 focus:outline-none text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm p-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 h-8">Get Quotation</button>
        </div>
    </div>
  )
}

export default Parts

// Planning to add Modal
// or may be side drawer

/*

  <button type="button" onClick={toggleDrawer3(
                              <div dangerouslySetInnerHTML={{__html: value.Google_Loc}} />
                            )}><MapPin /></button>

                            this is wrong it doesn't work it says infinite rendar error
*/