import React, { useEffect,useState } from 'react'
import axios from 'axios';
import BrandLogo from './BrandLogo';
import { Outlet,NavLink } from 'react-router-dom';

export default function Brand() {
  // State to store the list of image URLs
  // const brandList = []; didn't work as its not accessible inside hook :)
  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [partList, setPartList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Function to fetch data using Axios
    const fetchBrandList = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint providing the image URLs
        const response = await axios.get('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec?reqAsset=Brand');

        // Assuming the response data is an array of image URLs
        setBrandList(response.data.data.slice(1,));
      //  console.log(brandList);
       setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image list:', error);
      }
    };

    const fetchModelList = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint providing the image URLs
        const response = await axios.get('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec?reqAsset=Model');
        // Assuming the response data is an array of image URLs
        setModelList(response.data.data.slice(1,));
        // console.log(modelList);
      } catch (error) {
        console.error('Error fetching image list:', error);
      }
    };

    const fetchPartList = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint providing the image URLs
        const response = await axios.get('https://script.google.com/macros/s/AKfycby1EVnylYrimmUmbuQ5iV8LDWO1YnKqErNV5qUB3Cm75vTRPrWG0obg-g3ZQe9inXe6Pg/exec?reqAsset=Part');
        // Assuming the response data is an array of image URLs
        setPartList(response.data.data.slice(1,));
        // console.log(modelList);
      } catch (error) {
        console.error('Error fetching image list:', error);
      }
    };

    // Call the fetchImageList function
    fetchBrandList();
    fetchModelList();
    fetchPartList();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

return (
    
    <div>
      {isLoading ? <p>Loading...</p> : <>
      <div className='flex flex-wrap'>
        {brandList.map((item, index) => (
          <div key={index}>
            <NavLink to={item.Brand} state={{modelList : modelList, partList:partList}}><BrandLogo brandItem={item}/></NavLink>
          </div>
        ))}
      </div>
      <div>
        <Outlet/>
      </div></>}
    </div>
  );
}

//     
// np flex wrap
//       <div className='flex overflow-x-auto max-w-3xl'>