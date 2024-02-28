import './ModDelMember.css'
import { IMember,IBoxMember,IBoxImgMember } from './Types';
import {useContext,useState} from 'react'
import {RegistContext } from './RegistContext'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from './firebase';
import { ref,deleteObject,getStorage } from 'firebase/storage';

interface IModDelMember {
ModalDelIsOpen:boolean;
setModalDelIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
MemberDel:IMember | undefined
setMemberDel:React.Dispatch<React.SetStateAction<IMember | undefined>>;
}

function ModDelMember({ModalDelIsOpen,setModalDelIsOpen,MemberDel,setMemberDel}:IModDelMember ) {
const { BoxMember,setBoxMember } = useContext(RegistContext) as IBoxMember
const { BoxImgMember,setBoxImgMember } = useContext(RegistContext) as IBoxImgMember
const [MsgBtnWait,setMsgBtnWait] = useState<boolean>(false)

 
async function deleteMemberInFirebase(member:any ) {
    setMsgBtnWait(true)
    try {
        const userDoc = doc(db, "MemberDB", member.id);
        await deleteDoc(userDoc);
        DeleteMemberInBox();
    } catch (error) {
        console.error("Erro ao excluir o membro:", error);
    } }

function DeleteMemberInBox() {
    setBoxMember(BoxMember.filter(member => member.nanoId !== MemberDel?.nanoId));
if (MemberDel?.imagePersonal !== '') {
    DeleteImg()
}
else{setMsgBtnWait(false); setModalDelIsOpen(false) }
    } 

    function DeleteImg() {
    if (MemberDel !== undefined ) {
        const storage = getStorage();
            const desertRef = ref(storage,`${MemberDel.imagePersonal}`);
            deleteObject(desertRef).then(() => {
                setBoxImgMember(BoxImgMember.filter((img) => img !== MemberDel.imagePersonal));
                setMsgBtnWait(false)
                setModalDelIsOpen(false);
            }).catch((error) => {
                console.log('ERRO:',error);
            });     
    }  }

    return <div>
{ModalDelIsOpen && 
        <div  className="MDMContainer" onClick={()=> {setModalDelIsOpen(false) }}>
<div className='MDMsquare' onClick={(e)=> e.stopPropagation()}>
    {/* <p><b>Nome:</b> {MemberDel?.name}</p>
    <p><b>CPF:</b> {MemberDel?.cpf}</p> */}
    <h4>Deseja deletar esse membro ?</h4>

<div >
<button className='MDMbtnNot' onClick={()=> {setModalDelIsOpen(false) }}>Não</button>
<button className='MDMbtnYes' onClick={()=> deleteMemberInFirebase(MemberDel) }>
{MsgBtnWait ? 'Aguarde...':'Sim'}</button>

</div>

</div>

            </div>
}    
    </div>    
}

export default ModDelMember