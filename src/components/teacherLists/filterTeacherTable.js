import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export default function FilterTeacherTable({ filter, setFilter }) {
  const [value, setValue] = useState(filter)

  const handleChange = useAsyncDebounce((e) => {
    setFilter(e)
  }, 500)
  return (
    <form>
      <input
        type="text"
        placeholder="Search Globally"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          handleChange(e.target.value)
        }}
      />
    </form>
  )
}
