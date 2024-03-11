import './ModDelAdm.css'
import {RegistContext } from '../components/RegistContext'
import {useContext,useState} from 'react'
import { IBoxAdm } from '../components/Types';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../components/firebase';
import { useNavigate } from 'react-router-dom'

interface IModDelAdm {
    ModalDelIsOpen:boolean;
    setModalDelIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    }
    
function ModDelAdm({ModalDelIsOpen,setModalDelIsOpen}:IModDelAdm) {
const storageItem = sessionStorage.getItem('admStorage');
const admStorage = storageItem ? JSON.parse(storageItem) : null;
const { BoxAdm,setBoxAdm } = useContext(RegistContext) as IBoxAdm
const navigate = useNavigate();
const [MsgLoadBtn,setMsgLoadBtn] = useState<boolean>(false)

async function ClickDelAdmInFirebase() {
setMsgLoadBtn(true);
const AdmDel:any = BoxAdm.find((adm)=> adm.nanoId === admStorage.nanoId)
try {
    const userDoc = doc(db, "AdmDB",AdmDel.id);
    await deleteDoc(userDoc);
    DeleteAdmInBox();
} catch (error) {
    console.error("Erro ao excluir o membro:", error);
} }

function DeleteAdmInBox() {
    const BoxFiltred = BoxAdm.filter((adm)=> adm.nanoId !== admStorage.nanoId)
    setBoxAdm(BoxFiltred);
    setMsgLoadBtn(false);
    navigate('/') ;
    }
    
    return <div>
{ModalDelIsOpen && 
        <div className="MDADMContainer" onClick={()=> {setModalDelIsOpen(false) }}>
<div className='MDADMsquare' onClick={(e)=> e.stopPropagation()}>
    <h4>Deseja deletar essa conta ?</h4>

<div>
<button className='MDADMbtnNot' onClick={()=> {setModalDelIsOpen(false) }}>não</button>
<button className='MDADMbtnYes' onClick={ClickDelAdmInFirebase}>{MsgLoadBtn ?'Aguarde...':'sim'}
</button>

</div>

</div>
            </div>
}    
    </div>    
}

export default ModDelAdm

