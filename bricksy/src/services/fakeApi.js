export const delay = (ms)=> new Promise(r=> setTimeout(r, ms))
export function haversine(a,b){
const R=6371, dLat=(b.lat-a.lat)*Math.PI/180, dLng=(b.lng-a.lng)*Math.PI/180
const lat1=a.lat*Math.PI/180, lat2=b.lat*Math.PI/180
const s = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
return 2*R*Math.asin(Math.sqrt(s))
}