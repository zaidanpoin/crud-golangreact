import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListMember from './components/ListMember'
import AddMember from './components/AddMember'
import EditMember from './components/EditMember'

const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ListMember />} />
          <Route path='/add-member' element={<AddMember />} />
          <Route path='/edit-member/:id' element={<EditMember />} />
        </Routes>



      </BrowserRouter>

    </div>
  )
}

export default App
