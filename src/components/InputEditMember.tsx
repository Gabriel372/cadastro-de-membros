import './InputEditMember.css'
import {IMember} from './Types'
import { useState } from 'react';
import MsgCpfWrong from './MsgCpfWrong'

interface IEditInputMember {
  MemberEdit:IMember
  setMemberEdit:React.Dispatch<React.SetStateAction<IMember>>;
  MsgBtnWait:boolean;
  setMsgBtnWait:React.Dispatch<React.SetStateAction<boolean>>; }

function InputEditMember({MemberEdit,setMemberEdit,MsgBtnWait,setMsgBtnWait }:IEditInputMember ) {
const [MsgAlert,setMsgAlert] = useState(false)
const DateActual=`${(new Date().getDate()).toString().padStart(2,'0')}/${(new Date().getMonth()+1).toString().padStart(2,'0')}/${new Date().getFullYear()}`
const [DayActual,MonthActual,YearActual] = DateActual.split('/');

function ClickEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cpfLength =  (`${MemberEdit.cpf}`).length;
    const { name, cpf, cellphone, address, maritalStatus, dateOfBirth } = MemberEdit;
    const MemberIsFull = name && cpf && cellphone && address && maritalStatus && dateOfBirth;

if (!MemberIsFull) {
alert('Somente a foto pode ficar em branco, preencha os campos'); }

else if (cpfLength < 11) {
setMsgAlert(true)  
}
 else if (!MsgBtnWait && cpfLength === 11) {
    setMsgAlert(false);
  setMsgBtnWait(true); } }  

function ChangeInput(e:React.ChangeEvent<HTMLInputElement>) {  
const { name, value } = e.target;
if (name === 'cpf') {
  let cpfDigits = value;
  let CpfWrong = /[.,]/.test(cpfDigits);
if (CpfWrong || cpfDigits.length > 11) {
setMsgAlert(true) } 
else {setMemberEdit(prevState => ({...prevState,cpf:cpfDigits}))  } }
else {setMemberEdit(prevState => ({...prevState,[name]:value})) }
} 

function BlockPointOrComma(e: React.KeyboardEvent<HTMLInputElement>) {
  if(e.key==='.' || e.key===',' ){
  e.preventDefault() ;
setMsgAlert(true) ; } }

return <>
<form onSubmit={ClickEdit} className='IEMform'> 
{/* <input type="file" className={style.inputUpload}/> */}
<label>Nome completo: <input autoFocus type="text" placeholder='Nome completo' onChange={ChangeInput} 
value={MemberEdit?.name} name="name"/>    
</label>

<label>Nº do cpf: <input   type="number" placeholder='Nº de cpf' onChange={ChangeInput}
value={MemberEdit?.cpf} onKeyDown={(e)=> BlockPointOrComma(e) } name="cpf" />    
</label>

 <MsgCpfWrong MsgAlert={MsgAlert} setMsgAlert={setMsgAlert} MsgBtnWait={MsgBtnWait} setMsgBtnWait={setMsgBtnWait}/>

<label>Nº do celular: <input  type="number"  placeholder='Nº de celular'onChange={ChangeInput} 
value={MemberEdit?.cellphone} name="cellphone"/>
</label>

<label>Endereço: <input  type="text" placeholder='Endereço' onChange={ChangeInput} 
value={MemberEdit?.address} name="address"/></label>

<div className='IEMdadRadio'>Estado civil:
<label><input 
          type="radio"
          value="solteiro"
          checked={MemberEdit?.maritalStatus === 'solteiro'}
          name='maritalStatus'
          onChange={ChangeInput} />
        Solteiro
      </label>
      <label>
        <input
          type="radio"
          value="casado"
          checked={MemberEdit?.maritalStatus === 'casado'}
          name='maritalStatus'
          onChange={ChangeInput} />
        Casado
      </label>
</div>

<div>
<label className='IEMinputDate'>Data de nascimento: 
<input type="date" className='RMInputDateFont' onChange={ChangeInput } 
value={MemberEdit?.dateOfBirth} name='dateOfBirth' max={`${YearActual}-${MonthActual}-${DayActual}`}/>
</label>
</div>

<button type='submit' className='IEMbtnUpdt'>
{MsgBtnWait ? 'Aguarde...':'Atualizar'} </button>
</form>
</>

}

export default InputEditMember
