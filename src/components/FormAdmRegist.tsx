import { IAdm } from "../components/Types";
import { IMsgAdm } from "../pages/RegisterAdm"
import {RegistContext } from '../components/RegistContext'
import {IBoxAdm} from '../components/Types'
import { useState,useContext,useEffect } from 'react';
import '../pages/RegisterAdm.css'

interface IAdmToStorage {
AdmToStorage:IAdm
setAdmToStorage:React.Dispatch<React.SetStateAction<IAdm>>
Msg:IMsgAdm
setMsg:React.Dispatch<React.SetStateAction<IMsgAdm>>  
}

function FormAdmRegist({AdmToStorage,setAdmToStorage,Msg,setMsg}:IAdmToStorage) {
const {setBoxAdm , BoxAdm } = useContext(RegistContext) as IBoxAdm;

async function ClickNewAdm (e: React.FormEvent<HTMLFormElement>) {  
 e.preventDefault();
const {email,id,name,nanoId,password} = AdmToStorage
const AdmIsComplete = email && name && password
 const EmailAdmIsRepeated = BoxAdm.find((adm)=>adm.email ===  AdmToStorage.email )

 if (EmailAdmIsRepeated) {
setMsg(prevState => ({...prevState,EmailRepeated:true}))    
}

else if (!AdmIsComplete){
setMsg(prevState => ({...prevState,FillTheFields:true}))    
}
else {
setMsg(prevState => ({...prevState,LoadBtn:true}))
}

} 

function ChangeInput(e:React.ChangeEvent<HTMLInputElement>) {
const CreateAdm={...AdmToStorage,[e.target.name]: e.target.value}
setAdmToStorage(CreateAdm)
}

function DisableMsg() {
const HasMsgActive = Msg.FillTheFields || Msg.LoadBtn || Msg.Success || Msg.EmailRepeated
if (HasMsgActive) {
setMsg({Success:false,LoadBtn:false,FillTheFields:false,EmailRepeated:false})
}    }

return <form onSubmit={ClickNewAdm} onClick={DisableMsg}>
<input className='RADMinput' autoFocus type="text" placeholder='Digite o nome completo' 
onChange={ChangeInput} value={AdmToStorage.name} name="name"/>
<input className='RADMinput'  type="email" placeholder='Digite o email' 
onChange={ChangeInput} value={AdmToStorage.email} name="email"/>
{Msg.EmailRepeated && <p className="RMmsgAlert">Email ja está cadastrado, digite outro</p>}
<input className='RADMinput'  type="password" placeholder='Digite a senha' 
onChange={ChangeInput} value={AdmToStorage.password} name="password" />

{Msg.FillTheFields && <p className="RMmsgAlert">Preencha os campos</p>}
<button type="submit" className='RADMbtnAcces'>
{Msg.LoadBtn?'Aguarde...':'Cadastrar'}
</button>
</form>   
} 

export default FormAdmRegist
