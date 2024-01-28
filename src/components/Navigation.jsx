import React from 'react'
import Sidebar, { SidebarItem } from './Sidebar'
import {
    Search,
    Boxes,
    Forward,
    Settings
} from 'lucide-react'

export default function Navigation({user}) {
  return (
    <main>
        <Sidebar user={user}>
            <SidebarItem icon = {<Search size={20}/>} text ='Marketplace' />
            {/* <SidebarItem icon = {<Boxes size={20}/>} text ='Inventory' /> */}
            <SidebarItem icon = {<Forward size={20}/>} text ='Orders'/>
            <SidebarItem icon = {<Settings size={20}/>} text ='Settings' />
        </Sidebar> 
    </main>
  )
}
