import { useState } from 'react'
import './sendReports.style.css'

export default function SendReports() {
  const [email, setEmail] = useState('')
  return (
    <form className='sendReportWrapper'>
      <p>Send Report to</p>
      <select
        name='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      >
        <option value=''>Select Recipient</option>
        <option value='prip'>Principal Of SaIT</option>
        <option value='cse'>HOD of CSE Branch</option>
        <option value='is'>HOD of IS Branch</option>
        <option value='me'>HOD of ME Branch</option>
        <option value='ece'>HOD of ECE Branch</option>
        <option value='civil'>HOD of CIVIL Branch</option>
      </select>
      <button type='submit'>Send</button>
    </form>
  )
}
