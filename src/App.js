import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Filtered from './pages/Filtered';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './employees/AddEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import ViewEmployee from './employees/ViewEmployee';
import Spouses from './spouses/Spouses';
import AddSpouse from './spouses/AddSpouse';
import UpdateSpouse from './spouses/UpdateSpouse';
import ViewSpouse from './spouses/ViewSpouse';
import Addresses from './addresses/Addresses';
import AddAddress from './addresses/AddAddress';
import UpdateAddress from './addresses/UpdateAddress';
import ViewAddress from './addresses/ViewAddress';
import Projects from './projects/Projects';
import AddProject from './projects/AddProject';
import UpdateProject from './projects/UpdateProject';
import ViewProject from './projects/ViewProject';
import EmployeeProjects from './employeesProjects/EmployeeProjects';
import AddEmployeeProject from './employeesProjects/AddEmployeeProject';
import UpdateEmployeeProject from './employeesProjects/UpdateEmployeeProject';
import ViewEmployeeProject from './employeesProjects/ViewEmployeeProject';

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
          <Route exact path='/spouses' element={<Spouses />} />
          <Route exact path='/add-spouse' element={<AddSpouse />} />
          <Route exact path='/update-spouse/:id' element={<UpdateSpouse />} />
          <Route exact path='/view-spouse/:id' element={<ViewSpouse />} />
          <Route exact path='/addresses' element={<Addresses />} />
          <Route exact path='/add-address' element={<AddAddress />} />
          <Route exact path='/update-address/:id' element={<UpdateAddress />} />
          <Route exact path='/view-address/:id' element={<ViewAddress />} />
          <Route exact path='/projects' element={<Projects />} />
          <Route exact path='/add-project' element={<AddProject />} />
          <Route exact path='/update-project/:id' element={<UpdateProject />} />
          <Route exact path='/view-project/:id' element={<ViewProject />} />
          <Route exact path='/employees-projects' element={<EmployeeProjects />} />
          <Route exact path='/add-employee-project' element={<AddEmployeeProject />} />
          <Route exact path='/update-employee-project/:id' element={<UpdateEmployeeProject />} />
          <Route exact path='/view-employee-project/:id' element={<ViewEmployeeProject />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
