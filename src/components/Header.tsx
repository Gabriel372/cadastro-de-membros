import './Header.css'
import ClipBoardImg from './images/ClipBoardImg.png'
import { Link } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
import {RegistContext } from './RegistContext'
import { ILoggedIn,MyLinkProps } from "./Types";
import MenuMobile from './MenuMobile'
import { useNavigate } from 'react-router-dom';
// import { Link, animateScroll as scroll } from "react-scroll";
// import MyLinkProps from '..'

// interface MyLinkProps {
//   to: string;
//   smooth: boolean;
//   duration: number;
// }

function Header() {
const [AdmLoged,setAdmLoged] = useState<string | null | {}>(null);
const { IsLoggedIn,setIsLoggedIn } = useContext(RegistContext) as ILoggedIn
const navigate = useNavigate();
const ActualPage = sessionStorage.getItem('ActualPage')?.replace(/\/%22|\/\//g, '') || '/';

useEffect( () => { 
CheckStatusPageForNavigate()
},[IsLoggedIn,ActualPage ])

function CheckStatusPageForNavigate() {
let adm = sessionStorage.getItem('admStorage');
if (adm && ActualPage) { 
  setIsLoggedIn(true);
  setAdmLoged(adm) ; 
  navigate(ActualPage);
    } 
else{navigate('/');  }  }

function SaveActualPage(page:string) {
  sessionStorage.setItem('ActualPage',page)
}

function RemoveAdmEpage() {
sessionStorage.removeItem('ActualPage');  
sessionStorage.removeItem('admStorage');  
setIsLoggedIn(false);
}

    return <header>
<div className='HeaderContainer'>
<img src={ClipBoardImg} height='50px'/>
  
  {IsLoggedIn &&
    <nav className="HDnavDesktop">
 <Link onClick={()=>SaveActualPage('/RegisterMember')} to='/RegisterMember' >Cadastrar membro</Link>
 <Link onClick={()=>SaveActualPage('/ShowMember')} to='/ShowMember'>Membros cadastrados</Link>
 <Link onClick={()=>SaveActualPage('/AccountAdm')} to='/AccountAdm'>Minha Conta</Link>
 <Link  onClick={RemoveAdmEpage} to='/' >Sair</Link>
</nav>}
{IsLoggedIn && <MenuMobile/> }
</div>

{/* <button onClick={()=>{ActualPage && navigate(ActualPage.replace(/"/g, '').replace(/\/\//g, '/')) }}>TESTE</button> */}
    </header>
}

export default Header
