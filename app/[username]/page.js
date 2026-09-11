import React from 'react'
import PaymentPage from '../components/PaymentPage';

const Username = async ({ params }) => {
  const { username } = await params;
  console.log(`P ${username}`)
  return (
      <>
      <PaymentPage username = {username}/>
      </>
  )
}

export default Username