import React, { useEffect,useState } from 'react'
import {Outlet,NavLink, useParams} from "react-router-dom"
import { FiChevronRight } from "react-icons/fi";
import { useLocation } from 'react-router-dom'

function Model() {
  const {BrandId} = useParams();
  const [filteredList, setfilteredList] = useState([]);
  const location = useLocation()
  const {modelList,partList} = location.state

  useEffect(() =>  {
  setfilteredList(modelList.filter(item => item.Brand === BrandId).map(item => item.Model))
  }, [BrandId]);
  return (
    <div className='flex  border-t-2 mt-2'>
      <div>
      {/* <hr className='mt-4'
          style={{
          background: "#c9cee9",
          height: "1px",
          }}
        /> */}
      <h1 className='bold text-xl '> {BrandId}</h1>
       <div className='overflow-y-auto overflow-hidden lg:h-96 xl:h-5/6'>   
      {
      filteredList.map((value, index) => (
        <NavLink to={value.replaceAll(" ","_")} state={{brand : BrandId, partList:partList}}>
        <ul class="ml-6 m-2 mr-5 border-b-2 border-indigo-400 bg-indigo-100 rounded pl-4 pt-2">
        <li key={index} class="pb-2 sm:pb-2">
        <div className="flex items-center space-x-4 ">
           <div >
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {value}
              </p>
           </div>
           <div>
              <FiChevronRight/>
           </div>
        </div>
        </li>
        </ul></NavLink>
      ))}
      </div>
      </div>

      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Model

//<NavLink to={value.replaceAll(" ","_")}>
//  <NavLink to={value.replaceAll(" ","_")} state={{modelList : modelList}}>

// it throws error if I don't pass state