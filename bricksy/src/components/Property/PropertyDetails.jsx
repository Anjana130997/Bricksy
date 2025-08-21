import React from 'react'
import './PropertyDetails.css';
import PropertyGallery from './PropertyGallery.jsx'
import PropertyMap from './PropertyMap.jsx'
import PropertyInquiryForm from './PropertyInquiryForm.jsx'


export default function PropertyDetails({p}){
return (
<div className='container property-details'>
<div className='left'>
<PropertyGallery images={p.images} video={p.video}/>
<section className='card section'>
<h2>Overview</h2>
<div className='facts'>
<div><strong>Price</strong><span>₹ {p.price.toLocaleString()}</span></div>
<div><strong>Type</strong><span>{p.type}</span></div>
<div><strong>Bedrooms</strong><span>{p.bedrooms}</span></div>
<div><strong>Size</strong><span>{p.sqft} sqft</span></div>
<div><strong>Address</strong><span>{p.address}, {p.city}</span></div>
</div>
<p className='desc'>{p.description}</p>
<div className='amenities'>
{p.amenities.map(a=> <span key={a} className='badge'>{a}</span>)}
</div>
</section>
<PropertyMap lat={p.lat} lng={p.lng} title={p.title}/>
</div>
<aside className='right'>
<PropertyInquiryForm property={p} />
</aside>
</div>
)
}