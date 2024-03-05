import './ShowMember.css'
import { useState,useContext,useEffect } from 'react';
import {RegistContext } from '../components/RegistContext'
import { IBoxMember } from '../components/Types';
import ModDelMember from '../components/ModDelMember'
import {IMember} from '../components/Types'
import ModEditMember from '../components/ModEditMember'
import { nanoid } from 'nanoid';
import { FaTrashAlt,FaPencilAlt } from "react-icons/fa";

function ShowMember() {
    const { BoxMember,setBoxMember } = useContext(RegistContext) as IBoxMember
const [ModalDelIsOpen,setModalDelIsOpen] = useState<boolean>(false)
const [MemberDel,setMemberDel] = useState<IMember>()
const [ModalEditIsOpen,setModalEditIsOpen] = useState<boolean>(false)
const [MemberEdit,setMemberEdit] = useState<IMember>(   {name:'',cpf:'',cellphone:'',address:'',
maritalStatus:'',imagePersonal:'',formatImg:'',dateOfBirth:'',nanoId: nanoid(),id:''})
const [MsgBoxEmpty,setMsgBoxEmpty] = useState<string>('')

useEffect( () => { 
  if (BoxMember.length === 0) {
  setTimeout(()=>setMsgBoxEmpty('Sem membros cadastrados no momento'),2000) }
  },  BoxMember)

    function ConvertDate(value:string) { const [year, month, day] = value.split('-');
    const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

return <div className='bgGray'>

<div className='SMContainer'>
<h2>Membros cadastrados</h2>

{BoxMember.length > 0 ?
<ul className='SMul'>
{BoxMember.map((member)=>(
<li key={member.nanoId} className='SMli'>

<div className={member.imagePersonal ? 'SMdivImg' : 'SMdivSpan'}>
{member.imagePersonal ?
<img src={member.imagePersonal} alt="Foto" className={`${member.formatImg === 'landscape' ? 'SMlandscapeImg':'SMportraitImg'}`}/>:
<span>Sem foto</span> }
</div>

<div className='SMdivp'>
<p ><b>Nome:</b> {member.name}</p>
<p ><b>Nº do cpf:</b> {member.cpf}</p>
<p ><b>Nº do celular:</b> {member.cellphone}</p>
<p ><b>Endereço:</b> {member.address}</p>
<p ><b>Estado civil:</b> {member.maritalStatus}</p>
<p ><b>Data de nascimento:</b> {ConvertDate(member.dateOfBirth)}</p>
</div>

<div className='SMdivBtn'>
<button onClick={()=> {setMemberDel(member);setModalDelIsOpen(true) }} 
className='SMbtnDelete' ><FaTrashAlt /> Deletar</button>
<button onClick={()=> {setMemberEdit(member);setModalEditIsOpen(true) }}
className='SMbtnEdit' ><FaPencilAlt /> Editar</button>
</div>

</li>

))
}
</ul>
: <p className='SMmsgBoxempty'>{MsgBoxEmpty}</p>}

</div>

<ModDelMember ModalDelIsOpen={ModalDelIsOpen} setModalDelIsOpen={setModalDelIsOpen}
MemberDel={MemberDel} setMemberDel={setMemberDel} />

{ModalEditIsOpen && <ModEditMember  ModalEditIsOpen={ModalEditIsOpen} setModalEditIsOpen={setModalEditIsOpen}
MemberEdit={MemberEdit} setMemberEdit={setMemberEdit} />}

{/* <button onClick={()=> console.log(BoxMember)  }>TESTE</button> */}

</div>

}

export default ShowMember
