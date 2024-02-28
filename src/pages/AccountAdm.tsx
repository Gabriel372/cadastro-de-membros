import './AccountAdm.css'
import {useContext,useState} from 'react'
import {RegistContext } from '../components/RegistContext'
import { IMember,IBoxMember, IBoxAdm } from '../components/Types';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../components/firebase';
import { FaTrashAlt } from "react-icons/fa";
import ModDelAdm from '../components/ModDelAdm'


function AccountAdm() {
    const storageItem = sessionStorage.getItem('admStorage');
    const admStorage = storageItem ? JSON.parse(storageItem) : null;
    const { BoxAdm,setBoxAdm } = useContext(RegistContext) as IBoxAdm
const [ModalDelIsOpen,setModalDelIsOpen] = useState<boolean>(false)

       //    sessionStorage.setItem('admStorage',JSON.stringify(AdmLog));
//const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))

//FAZER DELETE DE ADM

// function DeleteAdmInBox() {
//     const BoxFiltred = BoxAdm.filter((adm)=> adm.nanoId !== admStorage.nanoId)
//     setBoxAdm(BoxFiltred)
//     // setModalDelIsOpen(false)
//     }


    return <div>
    <div className='ACADMcontainer'>

<h2 className='ACADMh2'>Minha conta</h2>
<div className='ACADMsquareDad'>

<div className='ACADMsquareSon'>
<h4>Administrador</h4>
<p>Nome: {admStorage.name}</p>
<p>Email:{admStorage.email}</p>
<button onClick={()=>setModalDelIsOpen(true)} className='ACADMbtnAcces'><FaTrashAlt /> Deletar</button>

</div>



</div>
    </div>

    <ModDelAdm ModalDelIsOpen={ModalDelIsOpen} setModalDelIsOpen={setModalDelIsOpen}/>

    </div>

}

export default AccountAdm
