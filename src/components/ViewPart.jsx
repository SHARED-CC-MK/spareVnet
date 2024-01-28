import React from 'react'

function ViewPart({inventory, model}) {
  return (
    <div className='flex'>
        <div className='pl-8 pr-6 overflow-y-auto overflow-hidden lg:h-96 xl:h-lvh'>
        <p className='bold text-xl '>Inventory: ({model})
        </p>  
         <table class="table-fixed ">
         <thead>
            <tr>
            <th class="font-bold p-2 border-b text-left w-1/5">Part_Type</th>
            <th class="font-bold p-2 border-b text-left w-1/5">Units</th>
            <th class="font-bold p-2 border-b text-left w-1/5">Unit_Price</th>          
            </tr>
        </thead>
            {  
                inventory.map((value, index) => (     
                        <tbody>
                        <tr key={index}>
                            <td class="border-b text-left w-1/5">
                              {<img src={value.Part_Logo} className='m-1 border-2 border-grey h-10 w-10 rounded'/>}
                              {value.Part_Type}</td>
                            <td class="p-2 border-b text-center w-1/5">{value.Units}</td>
                            <td class="p-2 border-b text-left w-1/5">{value.Unit_Price}</td>
                        </tr>
                        </tbody>
                 ))
            }
        </table>
        </div>
    </div>
  )
}

export default ViewPart