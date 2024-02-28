import './ModEditMember.css'
import { IMember,IBoxMember } from './Types';
import { IoClose } from "react-icons/io5";
import InputEditMember from './InputEditMember'
import { useContext,useEffect,useState } from 'react';
import { doc,updateDoc } from "firebase/firestore";
import { db } from './firebase';
import {RegistContext } from './RegistContext'
import { nanoid } from 'nanoid';
import InputImgEdit from './InputImgEdit';
import DelPrevImgMember from './DelPrevImgMember'
// import {useEffect,useContext} from 'react'

interface IModEditMember {
ModalEditIsOpen:boolean;
setModalEditIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
MemberEdit:IMember
setMemberEdit:React.Dispatch<React.SetStateAction<IMember>>;
}

function ModEditMember({ModalEditIsOpen,setModalEditIsOpen,MemberEdit,setMemberEdit}:IModEditMember ) {
const { BoxMember,setBoxMember } = useContext(RegistContext) as IBoxMember
const [HasMemberToUpdt,setHasMemberToUpdt] = useState<boolean>(false)
const [MsgBtnWait,setMsgBtnWait] = useState<boolean>(false)
const [MsgSuccess,setMsgSuccess] = useState<boolean>(false)

useEffect(() => {
    if (HasMemberToUpdt) {
    UpdtMemberInFirebase() ;     
    setHasMemberToUpdt(false) }
    },[HasMemberToUpdt])   

async function UpdtMemberInFirebase() {
    try {const docRef:any =  MemberEdit
        const Source = doc(db, "MemberDB", docRef.id);
        await updateDoc(Source,docRef);
// setBoxMember((prevBox) => ...prevBox, MemberEdit )
UpdtBoxMember() 
      } catch (erro) {
        console.error('Erro ao atualizar o usuário: ', erro);
      }    
}

function UpdtBoxMember() {
    let NewBox = BoxMember    
    let index = NewBox.findIndex(member => member.id === MemberEdit?.id);
    NewBox[index] = MemberEdit 
    setBoxMember(NewBox);
 setTimeout(()=>{setMsgBtnWait(false);ActivMsgSuccess()},4000);
}

function ActivMsgSuccess() {
setMsgSuccess(true); setTimeout(() => setMsgSuccess(false) ,8000)  }

function CloseModal() {
setMemberEdit({name:'',cpf:'',cellphone:'',address:'',
maritalStatus:'',imagePersonal:'',dateOfBirth:'',nanoId: nanoid(),id:''});    
    setModalEditIsOpen(false)
}

    return <div>
{ModalEditIsOpen && 
        <div className="MDMContainer" onClick={()=>setModalEditIsOpen(false)}>
<div className='MDEMsquare' onClick={(e)=> e.stopPropagation()}>
    <div className='MDEMdivH3Btn'>
    <h3 className='MDEMH3'>Editar membro</h3>
    <button className='MDEMbtnClose' onClick={CloseModal}>
<IoClose />
</button>
    </div>

<div className='MDEMinputTextEImg'>

<div>
    <InputImgEdit MemberEdit={MemberEdit} setMemberEdit={setMemberEdit} setHasMemberToUpdt={setHasMemberToUpdt} MsgBtnWait={MsgBtnWait}/>
    <DelPrevImgMember MemberEdit={MemberEdit} MsgBtnWait={MsgBtnWait} HasMemberToUpdt={HasMemberToUpdt} />
</div>

<InputEditMember MemberEdit={MemberEdit} setMemberEdit={setMemberEdit} MsgBtnWait={MsgBtnWait} setMsgBtnWait={setMsgBtnWait}/>

</div>



 


 {MsgSuccess && <p className='MDEMmsgSuccess'>Editado com sucesso !</p> }
<div>
{/* <button className='MDMbtnYes' onClick={()=> deleteMemberInFirebase(MemberDel) }>sim</button> */}
</div>

</div>

            </div>
}    
    </div>
        
}

export default ModEditMember