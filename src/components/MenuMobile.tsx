import './MenuMobile.css'
import { useState,useContext } from 'react'
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import {RegistContext } from './RegistContext'
import { ILoggedIn } from "./Types";

function MenuMobile() {
const { IsLoggedIn,setIsLoggedIn } = useContext(RegistContext) as ILoggedIn
const [interrupt ,setInt] = useState(false)

function RemoveAdmEpage() {
    sessionStorage.removeItem('ActualPage');  
    sessionStorage.removeItem('admStorage');  
    setIsLoggedIn(false);
    }
 
return <div className='MobileContainer' >

<button className='btnMobile' onClick={()=>{setInt(!interrupt)}}  >
{interrupt ? <IoClose />:<FiMenu />}
</button>

<div className={`menuShow ${interrupt ? 'menushowOpen' : ''}`} onClick={()=> setInt(!interrupt)} > 
<ul className={`${interrupt ? 'MobileUl': 'MobileulNone'}`}>

<Link to='/RegisterMember'>Cadastrar membro</Link>
 {/* <Link to='/RegisterAdm'>Cadastrar administrador</Link>  */}
 <Link to='/ShowMember'>Membros cadastrados</Link>
 <Link to='/AccountAdm'>Minha Conta</Link>
 <Link onClick={RemoveAdmEpage} to='/' >Sair</Link>

</ul> </div>


{/* <ul className={`MobileUl ${interrupt ? 'mobileUlOpen' : ''}`}>

<Link to='/RegisterMember'>Cadastrar membro</Link>
 <Link to='/RegisterAdm'>Cadastrar administrador</Link> 
 <Link to='/ShowMember'>Membros cadastrados</Link>
 <Link to='/AccountAdm'>Minha Conta</Link>
 <Link onClick={()=>{setIsLoggedIn(false) }} to='/' >Sair</Link>

</ul> */}


 {/* {interrupt && ( <div className='menuShow' onClick={()=> setInt(!interrupt)} > 
<ul className={`MobileUl ${interrupt ? 'mobileUlOpen' : ''}`}>

<Link to='/RegisterMember'>Cadastrar membro</Link>
 <Link to='/RegisterAdm'>Cadastrar administrador</Link> 
 <Link to='/ShowMember'>Membros cadastrados</Link>
 <Link to='/AccountAdm'>Minha Conta</Link>
 <Link onClick={()=>{setIsLoggedIn(false) }} to='/' >Sair</Link>

</ul> </div>) } */}

{/* <button className='btnMobile' onClick={()=>{setInt(!interrupt)}}  >
{interrupt ? <IoClose />:<FiMenu />}
</button> */}
</div>

}

export default MenuMobile
