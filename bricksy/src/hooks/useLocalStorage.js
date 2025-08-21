import { useEffect, useState } from 'react'
export default function useLocalStorage(key, initial){
const read = ()=>{
try{ const v = localStorage.getItem(key); return v? JSON.parse(v): initial }catch{ return initial }
}
const [val, setVal] = useState(read)
useEffect(()=>{ localStorage.setItem(key, JSON.stringify(val)) },[key,val])
return [val, setVal]
}