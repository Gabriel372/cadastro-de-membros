import './RegisterAdm.css'
import { IAdm,ILoggedIn } from "../components/Types";
import { useState,useContext,useEffect } from 'react';
import {nanoid} from "nanoid";
import {  addDoc, collection } from "firebase/firestore"; 
import {db} from '../components/firebase';
import {IBoxAdm} from '../components/Types'
import {RegistContext } from '../components/RegistContext'
import { IoArrowBackSharp } from "react-icons/io5";
import { Link,useNavigate } from 'react-router-dom';
import FormAdmRegist from '../components/FormAdmRegist'

export interface IMsgAdm {
Success:boolean ;
LoadBtn:boolean ;
FillTheFields:boolean ;
EmailRepeated:boolean ;
}

function RegisterAdm() {
const [AdmToStorage, setAdmToStorage] = useState<IAdm>({
name: '',email: '',password: '',id:'',nanoId: nanoid()});
const {setBoxAdm , BoxAdm, setIsLoggedIn } = useContext(RegistContext) as IBoxAdm & ILoggedIn;
const [Msg,setMsg] = useState<IMsgAdm>({Success:false,LoadBtn:false,FillTheFields:false,EmailRepeated:false})
const navigate = useNavigate();

useEffect(() => {
if (Msg.LoadBtn) {
PostAdmInFirebase()  }
else if (AdmToStorage.id !== '') {
InsertAdmInBox() 
}
  }, [Msg,AdmToStorage]) 

async function PostAdmInFirebase() {
try { const docRef = await addDoc(collection(db,"AdmDB"),AdmToStorage);
setAdmToStorage((prevState => ({...prevState,id:docRef.id})));
setMsg(prevState => ({...prevState,LoadBtn:false}));
}
  catch (e) {
    console.error("Error adding document: ", e);
  setMsg(prevState => ({...prevState,LoadBtn:false}))
  }
  }

function InsertAdmInBox() {
setBoxAdm(prevState => [...prevState,AdmToStorage]);  
    setAdmToStorage({name: '',email: '',password: '',id:'',nanoId: nanoid()});
    setMsg(prevState => ({...prevState,Success:true}))
    setTimeout(() => {setMsg(prevState => ({...prevState,Success:false})); AdmLogin()} ,2500) ;    
}

function AdmLogin() {
  setIsLoggedIn(true)
  sessionStorage.setItem('admStorage',JSON.stringify(AdmToStorage));
  sessionStorage.setItem('ActualPage','/RegisterMember') ;
  navigate('/RegisterMember') ;  
}

    return <div className='RADMdivDad'>
<div className='RADMcontainer'>

<div className='RADMdivhH2icon'>
 <Link to='/'>
 <IoArrowBackSharp />
 </Link>
<h2>Cadastre-se como administrador </h2>
</div>

<div className='RADMsquare'>

<FormAdmRegist AdmToStorage={AdmToStorage} setAdmToStorage={setAdmToStorage} 
setMsg={setMsg} Msg={Msg} />

{Msg.Success && <p className='RADMmsgSuccess'>Cadastrado com sucesso !</p> }
</div>
</div>
    </div>
}

export default RegisterAdm
