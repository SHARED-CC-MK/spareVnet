import React, { useState,useEffect } from 'react'
import axios from 'axios';
function Quotation({orders,model,brand,userID}) {
  const [list,setList] = useState([]);
  const [totalUnit,setTotalUnit] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sendQuotationReq = async () => {
    
    setIsLoading(true)
    let payload =[]
    payload.push(
      {page:"transactions",
    task:"transactions",
    userID:userID }
    )
      let epoch_time=Math.floor(Date.now() / 1000)
    // Cannot read properties of undefined (reading 'CartUnits'
    // because i was using i<=list.length
    for(let i=0;i<list.length;i++){
      if(list[i].CartUnits){
      if(list[i].CartUnits>0){
        payload.push({
          Req_VID:userID,
          Resp_VID:list[i].Vendor_ID,
          Part_Type:list[i].Part_Type,
          Part_Logo:list[i].Part_Logo,
          Units:list[i].CartUnits,
          Unit_Price:list[i].Unit_Price,
          Order_ID:epoch_time,
          Brand:brand,
          Model:model})
      }}     
    }
    // console.log(payload)
    try {
        await axios.post('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec',
        JSON.stringify(payload),
        {
          headers: {
            'Content-Type': 'text/plain',
          },
          mode: "no-cors"
        })
      } catch (error) {
        console.error('Error', error);
      }finally {
        setIsLoading(false);
      }
  };
  useEffect(() =>  {
    setList(orders)
    // for(let i=0;i<orders.length;i++)
    // {
    //   if(orders[i].CartUnits>0)setTotalUnit(prevState =>(Number(prevState) + Number(orders[i].CartUnits)))
    //   if(orders[i].CartUnits>0)setTotalPrice(prevState =>(prevState +orders[i].Unit_Price*orders[i].CartUnits))
    // }
  }, [orders,model]);

  return (
    <div className='ml-2 mr-2'>
    <div class="flex justify-between border-b pb-2">
    <h1 class="font-semibold text-1xl">Quotation Form: ({model})</h1>
    {/* <h2 class="font-semibold text-1xl">Total Units : {totalUnit}</h2>
    <h2 class="font-semibold text-1xl">Total Price : {totalPrice}</h2> */}
  </div>
  <div class="flex mt-2 mb-2">
          <h3 class="border-b p-2 font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Part_Type</h3>
          <h3 class="border-b p-2 font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Avl. Units</h3>
          <h3 class="border-b p-2 font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Req. Units</h3>
          <h3 class="border-b p-2 font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">Unit Price</h3>
          <h3 class="border-b p-2 font-semibold text-gray-600 text-xs uppercase w-2/5 text-center">Vendor Name</h3>
        </div>
        {
            list.map(((value, index) => (
              value.CartUnits>0?
        <div class="flex flex-row justify-between ml-4 flex-grow mt-2">
            <h4 class="border-b p-2 font-bold text-left text-gray-600 text-xs uppercase w-1/5 font-bold">
            {<img src={value.Part_Logo} className='m-1 border-2 border-grey h-10 w-10 rounded'/>}
              {value.Part_Type}</h4>
            <h4 class="border-b p-2 font-semibold  text-gray-600 p-5 uppercase w-1/5 text-center">{value.Units}</h4>        
            <h4 class="border-b p-2 font-semibold text-gray-600 p-5 uppercase w-1/5 text-center">{value.CartUnits}</h4>        
            <h4 class="border-b p-2 font-semibold text-gray-600 p-5 uppercase w-1/5 text-center">{value.Unit_Price}</h4>        
            <h4 class="border-b p-2 font-semibold text-gray-600 p-5 uppercase w-2/5 text-left">{value.Vendor_Name}</h4>
            </div>:<p></p>)
            ))
        }
        {
        <button type="button" class="ml-4 mt-4 focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm p-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={sendQuotationReq}
        >Confirm</button>
        }
        <p>{isLoading?"Processing...":""}</p>
        </div>
    
  )
}

export default Quotation