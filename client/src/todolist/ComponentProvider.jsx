import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

const context = createContext()

export function ComponentProvider({children}) {
    const [component,setComponent] = useState("")
  return (
    <context.Provider value={{component,setComponent}}>
        {children}
    </context.Provider>
  )
}

export default context