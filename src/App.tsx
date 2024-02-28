import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterMember from './pages/RegisterMember'
import Header from './components/Header';
import RegisterAdm from './pages/RegisterAdm'
import { RegistContextProvider } from './components/RegistContext';
import ShowMember from './pages/ShowMember'
import AccountAdm from './pages/AccountAdm'
// import { MyLinkProps } from './components/Types';
// import { Link, animateScroll as scroll } from "react-scroll";


function App() {
//to={to} smooth={smooth} duration={duration}

  return (
    <RegistContextProvider>

  <BrowserRouter>
<div className="App">
<Header />
<Routes>
<Route  path='/' element={<LoginPage/>}/>
<Route  path='/RegisterMember' element={<RegisterMember/>}/>
<Route  path='/RegisterAdm' element={<RegisterAdm/>}/>
<Route  path="/ShowMember" element={<ShowMember/>}/>
<Route  path='/AccountAdm' element={<AccountAdm/>}/>
</Routes>
</div>  
</BrowserRouter>
</RegistContextProvider>


  );
}

export default App;
