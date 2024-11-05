import React from 'react'

function UserHome() {
    const userId = localStorage.getItem("userId")
  return (
    <>
    <h1>{userId}</h1>
    </>
  )
}

export default UserHome