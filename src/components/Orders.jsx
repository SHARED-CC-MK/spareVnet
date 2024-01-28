import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { ArrowDownSquare, ArrowUpSquare } from 'lucide-react';


function Orders({userID}) {

  const [transactionList,setTransactionList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Function to fetch data using Axios
    const fetchTransactions = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint providing the image URLs
        const response = await axios.get('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec?reqAsset=transactions');

        // Assuming the response data is an array of image URLs
        setTransactionList(response.data.data.slice(1,));
       setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image list:', error);
      }
    };
    fetchTransactions();
  }, []); 

  return (
    <div className='w-full'>
      {isLoading?<p>Loading...</p>:
    <div className='flex h-full'>
        <div className='w-1/2 border-grey-500 pl-8 pr-6 overflow-y-auto overflow-hidden lg:h-96 xl:h-lvh'>
        <ArrowUpSquare size={40}/>
              <table class="table-fixed ">
                <thead>
                    <tr>
                    <th class="font-bold p-2 border-b text-left w-1/5">Order_ID</th>
                    <th class="font-bold p-2 border-b text-left w-1/5">Vendor_Name</th>
                    <th class="font-bold p-2 border-b text-Center w-1/5">Brand</th>  
                    <th class="font-bold p-2 border-b text-left w-1/5">Model</th>   
                    <th class="font-bold p-2 border-b text-left w-2/5">Part_Type</th>
                    <th class="font-bold p-2 border-b text-left w-1/5">Units</th>
                    <th class="font-bold p-2 border-b text-left w-1/5">Unit_Price</th>                       
                    </tr>
                </thead>
                <tbody>
                {transactionList.filter(item => item.Req_VID === userID).map(((value, index) => (
                        <tr key={index}>
                            <td class="p-2 border-b text-center w-1/5">{value.Order_ID}</td>
                            <td class="p-2 border-b text-center w-1/5">{value.Res_VName}</td>
                            <td class="p-2 border-b text-center w-1/5">{value.Brand}
                              </td>
                            <td class="p-2 border-b text-left w-1/5"> {value.Model}</td>
                            <td class="p-2 border-b text-left w-2/5">{JSON.parse(value.Order).Part_Type}
                                  {<img src={JSON.parse(value.Order).Part_Logo} className='m-1 border-2 border-grey h-10 w-10 rounded'/>}</td>
                            <td class="p-2 border-b text-left w-2/5">{JSON.parse(value.Order).Units}</td>
                            <td class="border-b text-left w-1/5"> {JSON.parse(value.Order).Unit_Price}</td>
                        </tr>
                         )))
                        }
                        </tbody>
                </table>
            </div>
        <div className='w-1/2 ml-5 pl-8 pr-6 overflow-y-auto overflow-hidden lg:h-96 xl:h-lvh'>
        <ArrowDownSquare size={40}/>
        <table class="table-fixed ">
                <thead>
                    <tr>
                    <th class="font-bold p-2 border-b text-left w-1/5">Order_ID</th>
                    <th class="font-bold p-2 border-b text-left w-1/5">Vendor_Name</th>
                    <th class="font-bold p-2 border-b text-Center w-1/5">Brand</th>  
                    <th class="font-bold p-2 border-b text-left w-1/5">Model</th>   
                    <th class="font-bold p-2 border-b text-left w-2/5">Part_Type</th>
                    <th class="font-bold p-2 border-b text-left w-1/5">Units</th>
                    <th class="font-bold p-2 border-b text-left w-1/5">Unit_Price</th>                       
                    </tr>
                </thead>
                <tbody>
                {transactionList.filter(item => item.Resp_VID === userID).map(((value, index) => (
                        <tr key={index}>
                            <td class="p-2 border-b text-center w-1/5">{value.Order_ID}</td>
                            <td class="p-2 border-b text-center w-1/5">{value.Req_VName}</td>
                            <td class="p-2 border-b text-center w-1/5">{value.Brand}
                                  </td>
                            <td class="p-2 border-b text-left w-1/5"> {value.Model}</td>
                            <td class="p-2 border-b text-left w-2/5">{JSON.parse(value.Order).Part_Type}
                                  {<img src={JSON.parse(value.Order).Part_Logo} className='m-1 border-2 border-grey h-10 w-10 rounded'/>}</td>
                            <td class="p-2 border-b text-left w-2/5">{JSON.parse(value.Order).Units}</td>
                            <td class="border-b text-left w-1/5"> {JSON.parse(value.Order).Unit_Price}</td>
                        </tr>
                         )))
                        }
                        </tbody>
                </table>
        </div>
      </div>}
    </div>
  )
}

export default Orders