import './LoginPage.css'
import { IBoxAdm, ILoggedIn } from "../components/Types";
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {RegistContext } from '../components/RegistContext'
import {IAdm} from '../components/Types'
import { Link } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";

export interface IMsgLog {
LoadBtn:boolean ;
EmailOrPasswrdWrong:boolean ;
 FillTheFields:boolean ;  }

function LoginPage() { 
const [AdmLog,setAdmLog] = useState<IAdm>({name:'',email:'',password:'',id:'',nanoId:''});
const [Msg,setMsg] = useState<IMsgLog>({LoadBtn:false,EmailOrPasswrdWrong:false,FillTheFields:false})
const navigate = useNavigate();
const { setIsLoggedIn, BoxAdm } = useContext(RegistContext) as ILoggedIn & IBoxAdm;

function ClickLog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
setMsg((prevState => ({...prevState,LoadBtn:true})));
const AdmIsOk = BoxAdm.find((adm)=> adm.email === AdmLog.email  && adm.password === AdmLog.password )
setMsg((prevState => ({...prevState,LoadBtn:false})));
if(AdmLog.email === '' || AdmLog.password === ''){
setMsg((prevState => ({...prevState,FillTheFields:true}))) }
else if (!AdmIsOk) {
setMsg((prevState => ({...prevState,EmailOrPasswrdWrong:true})));  }
else{
    setIsLoggedIn(true)
    sessionStorage.setItem('admStorage',JSON.stringify(AdmIsOk));
    sessionStorage.setItem('ActualPage','/RegisterMember') ;
    navigate('/RegisterMember') } }

function ChangeInput(e:React.ChangeEvent<HTMLInputElement>) {
    const AdmLogValue={...AdmLog,[e.target.name]: e.target.value}
    setAdmLog(AdmLogValue) }

function DisableMsg() {
if (Msg.LoadBtn || Msg.EmailOrPasswrdWrong || Msg.FillTheFields) {
setMsg({LoadBtn:false,EmailOrPasswrdWrong:false,FillTheFields:false}) } }

    return <div className='divDadLog'>
<div className='LogContainer'>
<h3>Cadastro de membros</h3>    
<h2>Login </h2>

<div  className='LogdivIconRelat'> 
<span>
<IoPersonSharp />
</span>

<div className='LogSquare'>
{/* <h3>Bem vindo!</h3> */}
<form onSubmit={ClickLog} onClick={DisableMsg}>
<input className='LogInput' autoFocus type="email" name='email'
placeholder='Digite seu email' onChange={ChangeInput} value={AdmLog.email}/>

<input className='LogInput'  type="password" placeholder='Digite sua senha'
onChange={ChangeInput} value={AdmLog.password} name='password'/>
{Msg.EmailOrPasswrdWrong &&  <p className='LogMsgAlert'>Email ou senha incorreto</p>  }
{Msg.FillTheFields &&  <p className='LogMsgAlert'>Preencha os campos</p>  }
<button className='LogBtnAcces' type='submit'>
{Msg.LoadBtn ?'Aguarde...':'Entrar'}
</button>
</form>
<hr className='LogHr'></hr>
<p className='LogP'>ou</p>

<Link className='LogBtnRegist' to='/RegisterAdm'>Cadastre-se</Link>
{/* <button className='LogBtnRegist'>
<Link className='LogBtnRegist' to='/RegisterAdm'>Cadastre-se</Link>
</button> */}
</div>

</div>

</div>
    </div>
}

export default LoginPage
