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
function SaveActualPage(page:string) {
sessionStorage.setItem('ActualPage',page)
}

return <div className='MobileContainer' >

<button className='btnMobile' onClick={()=>{setInt(!interrupt)}}  >
{interrupt ? <IoClose />:<FiMenu />}
</button>

<div className={`menuShow ${interrupt ? 'menushowOpen' : ''}`} onClick={()=> setInt(!interrupt)} > 
<ul className={`${interrupt ? 'MobileUl': 'MobileulNone'}`}>

<Link onClick={()=>SaveActualPage('/RegisterMember')} to='/RegisterMember'>Cadastrar membro</Link>
 <Link onClick={()=>SaveActualPage('/ShowMember')}  to='/ShowMember'>Membros cadastrados</Link>
 <Link onClick={()=>SaveActualPage('/AccountAdm')}  to='/AccountAdm'>Minha Conta</Link>
 <Link onClick={RemoveAdmEpage} to='/' >Sair</Link>
</ul> 
</div>

</div>
}

export default MenuMobile
