import './AccountAdm.css'
import {useState} from 'react'
import { FaTrashAlt } from "react-icons/fa";
import ModDelAdm from '../components/ModDelAdm'

function AccountAdm() {
    const storageItem = sessionStorage.getItem('admStorage');
    const admStorage = storageItem ? JSON.parse(storageItem) : null;
const [ModalDelIsOpen,setModalDelIsOpen] = useState<boolean>(false)

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
