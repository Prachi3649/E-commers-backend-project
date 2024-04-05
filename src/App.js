import './App.css';
import Nav  from './components/nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import Signup  from './components/SignUp';
import PrivateComponent from './components/privateComponent';
import Login from './components/Login'
import AddProduct from './components/AddProduct';
import ProductComponents from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element= {<PrivateComponent/>}>
        <Route path='/home' element= {<ProductComponents/>}></Route>
        <Route path='/product' element= {< AddProduct/>}></Route>
        <Route path='/update/:id' element= {<UpdateProduct/>}></Route>
        <Route path='/delete' element= {<h1>this is the delete page</h1>}></Route>
        <Route path='/get' element= {<h1>this is the Get page1</h1>}></Route>
        <Route path='/logout' element= {<h1>this is the Logout page2</h1>}></Route>
        </Route>
        <Route path='/signup' element = {<Signup />} />
        <Route path='/login' element = { <Login />}/>
      </Routes>
      </BrowserRouter>
      <Footer />
      
     
    </div>
  );
}

export default App;
