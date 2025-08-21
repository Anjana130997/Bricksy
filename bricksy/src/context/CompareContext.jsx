import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'


const CompareContext = createContext()
export const useCompare = ()=> useContext(CompareContext)


export function CompareProvider({children}){
const [compareIds, setCompareIds] = useLocalStorage('compare', [])
const inCompare = id => compareIds.includes(id)
const toggleCompare = id => setCompareIds(prev => prev.includes(id)? prev.filter(x=>x!==id) : prev.length>=4 ? prev : [...prev, id])
const clearCompare = ()=> setCompareIds([])
return (
<CompareContext.Provider value={{compareIds, inCompare, toggleCompare, clearCompare}}>
{children}
</CompareContext.Provider>
)
}