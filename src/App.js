import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Filtered from './pages/Filtered';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './employees/AddEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import ViewEmployee from './employees/ViewEmployee';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/add-employee' element={<AddEmployee />} />
          <Route exact path='/update-employee/:id' element={<UpdateEmployee />} />
          <Route exact path='/view-employee/:id' element={<ViewEmployee />} />
          <Route exact path='/filter-employee-age/:age' element={<Filtered />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
