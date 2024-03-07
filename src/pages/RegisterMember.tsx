import './RegisterMember.css'
import { IMember,IBoxMember } from '../components/Types';
import { nanoid } from 'nanoid';
import { useContext,useEffect,useState } from 'react';
import { RegistContext } from '../components/RegistContext';
import {  addDoc, collection } from "firebase/firestore"; 
import {db} from '../components/firebase';
import InputRegMember from '../components/InputRegMember'
import InputImgRegistMemb from '../components/InputImgRegistMemb'

function RegisterMember() {
const [MemberToStorage, setMemberToStorage] = useState<IMember>(
{name:'',cpf:'',cellphone:'',address:'',maritalStatus:'',imagePersonal:'',
formatImg:'',dateOfBirth:'',nanoId: nanoid(),id:''});
const { setBoxMember,BoxMember } = useContext(RegistContext) as IBoxMember
const [MsgSuccess,setMsgSuccess] = useState<boolean>(false)
const [MsgBtnWait,setMsgBtnWait] = useState<boolean>(false)
const [InputHasValue,setInputHasValue] = useState<boolean>(false)

useEffect(() => {
if (InputHasValue) {
  PostMemberInFirebase();
   }
if (MemberToStorage.id !== '') {
  setBoxMember(prevBoxMember => [...prevBoxMember, MemberToStorage]);
  setMemberToStorage((
{name:'',cpf:'',cellphone:'',address:'',maritalStatus:'',imagePersonal:'',
formatImg:'',dateOfBirth:'',nanoId: nanoid(),id:''}));
}   
}, [InputHasValue,BoxMember,MemberToStorage]) 

 async function PostMemberInFirebase() {
try{
const docRef = await addDoc(collection(db,"MemberDB"),MemberToStorage);
setMemberToStorage((prevState => ({...prevState,id:docRef.id}))) ;
setMsgBtnWait(false); 
setMsgSuccess(true); setTimeout(() => {setMsgSuccess(false)} ,8000) ;
setInputHasValue(false); 
}
catch (e) {
console.error("Error adding document: ", e);
setMsgBtnWait(false) } }

return <div className='RMbgGray'>
<div className="RMContainer">
<h2>Cadastrar Membro</h2>
<div className="RMSquare">

<InputImgRegistMemb MsgBtnWait={MsgBtnWait} setMemberToStorage={setMemberToStorage} 
setInputHasValue={setInputHasValue} MemberToStorage={MemberToStorage}/>

<InputRegMember MemberToStorage={MemberToStorage} setMemberToStorage={setMemberToStorage} 
setInputHasValue={setInputHasValue} setMsgBtnWait={setMsgBtnWait} MsgBtnWait={MsgBtnWait}/>
 {MsgSuccess && <p className='msgSuccess'>Cadastrado com sucesso !</p> }
</div>

    </div>
    </div> 
}

export default RegisterMember
