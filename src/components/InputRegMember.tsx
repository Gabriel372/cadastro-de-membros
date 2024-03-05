// import '../pages/RegisterMember.css'
import { IMember } from './Types';
import './InputRegMember.css'
import { useState,useContext } from 'react';
import {RegistContext } from '../components/RegistContext'
import { IBoxMember } from '../components/Types';

interface IInputRM {
MemberToStorage: IMember;
setMemberToStorage:React.Dispatch<React.SetStateAction<IMember>>
setInputHasValue:React.Dispatch<React.SetStateAction<boolean>>
MsgBtnWait:boolean
setMsgBtnWait:React.Dispatch<React.SetStateAction<boolean>> }
interface IMsg {
  CpfIsRepeated: boolean;
  CpfIsWrong: boolean;
  MemberIsNotComplete:boolean }

function InputRegMember({MemberToStorage,setMemberToStorage,setMsgBtnWait,MsgBtnWait}:IInputRM) {
const { BoxMember } = useContext(RegistContext) as IBoxMember
const [MsgErro,setMsgErro] = useState<IMsg>({CpfIsRepeated:false,CpfIsWrong:false,MemberIsNotComplete:false})
const DateActual=`${(new Date().getDate()).toString().padStart(2,'0')}/${(new Date().getMonth()+1).toString().padStart(2,'0')}/${new Date().getFullYear()}`
const [DayActual,MonthActual,YearActual] = DateActual.split('/');

function ClickRegister(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const { name, cpf, cellphone, address, maritalStatus, dateOfBirth } = MemberToStorage;
  const MemberIsFull = name && cpf && cellphone && address && maritalStatus && dateOfBirth;
  const cpfLength =  (`${cpf}`).length;
const CpfRepeated = BoxMember.find((member)=>member.cpf ===  MemberToStorage.cpf  )

  if (!MemberIsFull) {
  setMsgErro(prevState => ({...prevState,MemberIsNotComplete:true}))
  } else if (cpfLength < 11) {
    setMsgErro(prevState => ({...prevState,CpfIsWrong:true}))
  } 
  else if (CpfRepeated) {
    setMsgErro(prevState => ({...prevState,CpfIsRepeated:true}))
  }
  else if (!MsgBtnWait && cpfLength === 11) {
    setMsgBtnWait(true);
    setMsgErro({CpfIsRepeated:false,CpfIsWrong:false,MemberIsNotComplete:false}) } }

function ChangeInput(e:React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = e.target;
if (name === 'cpf') {
  let cpfDigits = value;
  let CpfWrong = /[.,]/.test(cpfDigits);

  if (CpfWrong || cpfDigits.length > 11) {
  !MsgErro.CpfIsWrong && setMsgErro(prevState => ({...prevState,CpfIsWrong:true}));
  MsgErro.CpfIsWrong && setTimeout(()=> setMsgErro(prevState => ({...prevState,CpfIsWrong:false})),6000);
  } 
else if (MsgErro.CpfIsRepeated || MsgErro.CpfIsWrong){
  setMsgErro(prevState => ({...prevState,CpfIsRepeated:false,CpfIsWrong:false})) }
else {setMemberToStorage(prevState => ({...prevState,cpf:cpfDigits}))  }
}
else { setMemberToStorage(prevState => ({...prevState,[name]:value})) } }

  function BlockPointOrComma(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key==='.' || e.key===',' ){ e.preventDefault()
    setMsgErro(prevState => ({...prevState,CpfIsWrong:true}))  } }

function DisableMsgError() {
  if (MsgErro.MemberIsNotComplete || MsgErro.CpfIsWrong) {
    setMsgErro(prevState => ({...prevState,MemberIsNotComplete:false,CpfIsWrong:false})) }}

return<form onClick={DisableMsgError} onSubmit={ClickRegister} className='RegistMemForm' > 
<input autoFocus type="text" placeholder='Nome completo' onChange={ChangeInput} 
value={MemberToStorage.name} name="name"/>
<input  type="number" placeholder='Nº de cpf' onChange={ChangeInput}
value={MemberToStorage.cpf} onKeyDown={(e)=>BlockPointOrComma(e)} name="cpf"/>

{MsgErro.CpfIsRepeated && <p className='IRMmsgAlert' >Esse nº de cpf ja esta cadastrado,digite outro</p>}
{MsgErro.CpfIsWrong && <p className='IRMmsgAlert' >O cpf deve conter 11 dígitos sem ponto ou vírgula</p> }

<input  type="number"  placeholder='Nº de celular'onChange={ChangeInput} 
value={MemberToStorage.cellphone} name="cellphone"/>
<input  type="text" placeholder='Endereço' onChange={ChangeInput} 
value={MemberToStorage.address} name="address"/>

<label className='RMDadRadio'>Estado civil:
<label>
<input type="radio" value="solteiro" checked={MemberToStorage.maritalStatus === 'solteiro'}
name='maritalStatus'onChange={ChangeInput} />Solteiro</label>
<label>
<input type="radio" value="casado" checked={MemberToStorage.maritalStatus === 'casado'}
name='maritalStatus' onChange={ChangeInput} />Casado
</label>
</label>

<label className='RMInputDate'>Data de nascimento: <input type="date" className='RMInputDateFont'
onChange={ChangeInput } value={MemberToStorage.dateOfBirth} name='dateOfBirth'  max={`${YearActual}-${MonthActual}-${DayActual}`}/>
</label>
{MsgErro.MemberIsNotComplete && <p className='IRMmsgAlert' >Somente a foto pode ficar em branco, preencha os campos</p> }

<button type='submit' className='RMIBtnAcces'>
{MsgBtnWait ? 'Aguarde...':'Cadastrar'} </button>
</form>
}
export default InputRegMember