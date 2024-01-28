import React from 'react'

export default function BrandLogo({brandItem}) {

    let { Brand, Image } = brandItem;

    if(Image == ''){
        Image='https://cdn.iconscout.com/icon/premium/png-256-thumb/no-image-1765819-1505608.png'
    }

    return (
        <div className='m-5 border-2 border-grey rounded h-10 w-10'>
        <img src={Image} alt={`${Brand}`} className='rounded'/>
        <h3 className='text-sm text-center'>{Brand}</h3>
        </div>
    );


    // return (
    //     <div style={styles.Container}>
    //     <h3 style={styles.Title}>{Brand}</h3>
    //     <img src={Image} alt={`${Brand}`} style={styles.Logo} />
    //     </div>
    // );
};

// ------------------This does work but requires lot of effort------------------------------
// moving to tailwind css
const styles = {
    Title:{
        'font-size':14
    },
    Logo:{
        'height':60, 
        'width': 60, 
        'borderRadius':5
    },
    Container:{
        'borderRadius':5,
        'border-width':10,
        'border-color':'#000000',
        'border':'solid',
        'height':80,
        'width':60,
        'padding':5,
        'margin':10
    }       
}