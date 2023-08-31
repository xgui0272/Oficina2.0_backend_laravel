
/**
 * Bibliotecas externas
 */
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

/**
 * Paginas
 */
import Budgets from './pages/Budgets/Budgets';
import CreateBudget from './pages/CreateBudget/CreateBudget';
import Edit from './pages/Edit/Edit';
import Search from './pages/Search/Search';
import SearchDate from './pages/SearchDate/SearchDate';
import Footer from './components/Footer';


/**
 * Components
 */
import { Nav } from './components/Nav';






function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
        <Routes>
          {/*Rotas com suas respectivas paginas*/}
          <Route  path='/searchdate' element={<SearchDate />}/>
          <Route  path='/search' element={<Search />}/>
          <Route  path='/create' element={<CreateBudget />}/>
          <Route  path='/edit/:id' element={<Edit />}/>
          <Route  path='/' element={<Budgets />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
