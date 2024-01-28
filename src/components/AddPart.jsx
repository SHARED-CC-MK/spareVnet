import React, { useEffect, useState } from 'react'
import loading from '../images/loading.gif' 
import axios from 'axios';

function AddPart({inventory,parts,model, userID,brand}) {
  // inventory: self Inventory
  // parts: all possible parts
  const [selfInventory,setSelfInventory] = useState([])
  const [inventoryCopy,setInventoryCopy] = useState([])
  let payload = [];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("-------------")
    setSelfInventory(inventory);
    // console.log(selfInventory);

    // console.log("use effect")
    let newArray = []
    for(let i = 0; i< parts.length ; i++){
      let search = selfInventory.filter(item => item.Part_Type === parts[i].Part_Type)

      newArray.push([search.length>0?search[0].Units:0
        ,false,
        search.length>0?search[0].Unit_Price:0,
        false,
        parts[i].Part_Type])
    }
    setInventoryCopy(newArray);
    // console.log(inventoryCopy);
    // console.log("$##############")
  }, [model,inventory]);

  const addToInventory = (item) => {
    inventoryCopy[item.key][0] = item.Units
    setInventoryCopy(inventoryCopy)
    inventoryCopy[item.key][1] = true
    setInventoryCopy(inventoryCopy)
    // console.log(inventoryCopy)
    
  }
  const addToInventory2 = (item) => {
    inventoryCopy[item.key][2] = item.Unit_Price
    setInventoryCopy(inventoryCopy)
    inventoryCopy[item.key][3] = true
    setInventoryCopy(inventoryCopy)
    // console.log(inventoryCopy)
    
  }

  const updateInventory = async () => {
    setIsLoading(true);
    payload = []
    payload.push({page:brand+'_'+model.replaceAll(' ','_'),
    task:"inventory",
    userID:userID })
    // console.log(inventoryCopy)
    for(let i= 0; i < inventoryCopy.length;i++){
      let search = selfInventory.filter(item => item.Part_Type === inventoryCopy[i][4])
      if(!inventoryCopy[i][1]){
        inventoryCopy[i][0] = search.length>0?search[0].Units: 0
        setInventoryCopy(inventoryCopy)
      }
      if(!inventoryCopy[i][3]){
        inventoryCopy[i][2] = search.length>0?search[0].Unit_Price: 0
        setInventoryCopy(inventoryCopy)
      }
      payload.push({
        Vendor_ID:userID,
        Part_Type:inventoryCopy[i][4],
        Units: inventoryCopy[i][0],
        Unit_Price:inventoryCopy[i][2]
      }) // this solved the issue
    }
    // console.log(inventoryCopy)
    // this was not working
    // setPayload([payload[0],...inventoryCopy])
    console.log(payload)
      try {
        await axios.post('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec',
        JSON.stringify(payload),
        {
          headers: {
            'Content-Type': 'text/plain',
          },
          mode: "no-cors"
        })
        // https://stackoverflow.com/questions/53433938/how-do-i-allow-a-cors-requests-in-my-google-script
        // followed this link to fix error
        // had to make it string JSON.stringify(payload)
        // +brand+'_'+ModelId.replaceAll(' ','_').replaceAll('+','%2B')
      } catch (error) {
        console.error('Error', error);
      }finally {
        setIsLoading(false);
      }
  };

  return (
    <div className='ml-2 mr-2'>
    <div class="flex justify-between border-b pb-2">
    <h1 class="font-semibold text-1xl">Add Inventory  ({model})</h1>
    {/* <h2 class="font-semibold text-1xl">3 Items</h2> */}
  </div>
  <div class="flex mt-2 mb-2">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Part_Name</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Existing Unit</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Updated Unit</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Old Price</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">New Price</h3>
        </div>
        {
            parts.map(((value, index) => (
        <div key={index} class="flex flex-row justify-between ml-4 flex-grow mt-2 border-t p-2">
            <h4 class="font-bold text-left text-gray-600 text-xs uppercase w-2/5 font-bold">
            {<img src={value.Part_Logo} className='m-1 border-2 border-grey h-10 w-10 rounded'/>}
            {value.Part_Type}</h4>
            <h4 class="font-semibold  text-gray-600 uppercase w-1/5 text-center p-5">{
               selfInventory.filter(item => item.Part_Type === value.Part_Type).length>0?
               selfInventory.filter(item => item.Part_Type === value.Part_Type)[0].Units: "0"
              }</h4>        
            <input class="mx-2 border text-center w-1/5 align-middle h-8 mt-4" type="number" min="0" onChange={evt => addToInventory({
                                key:index,
                                Units: evt.target.value,
                              })} 
                              placeholder='0'
                              required />
            <h4 class="font-semibold text-gray-600 uppercase w-1/5 text-center p-5">{
               selfInventory.filter(item => item.Part_Type === value.Part_Type).length>0?
               selfInventory.filter(item => item.Part_Type === value.Part_Type)[0].Unit_Price: "0"
            }</h4>        
            <input class="mx-2 border text-center w-1/5 align-middle h-8 mt-4" type="number" min="0" onChange={evt => addToInventory2({
                                key:index,
                                Unit_Price:evt.target.value
                              })} 
                              placeholder='0'
                               required />
            </div>)))
        }
        <button type="button" class="ml-4 mt-1 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm p-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={updateInventory}
        >Submit</button>
        {isLoading ? <img src={loading} 
        className='h-5 w-5'
        />:<></>}
    </div>
    
  )
}

export default AddPart