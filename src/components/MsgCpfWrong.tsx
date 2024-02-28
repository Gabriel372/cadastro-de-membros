import {useEffect,useState } from 'react';
import './InputEditMember.css'

interface IMsgCpfWrong {
    MsgAlert:boolean;
    setMsgAlert:React.Dispatch<React.SetStateAction<boolean>>; 
    MsgBtnWait:boolean
    setMsgBtnWait:React.Dispatch<React.SetStateAction<boolean>>; 
  }

function MsgCpfWrong({MsgAlert,setMsgAlert,MsgBtnWait,setMsgBtnWait}:IMsgCpfWrong) {
const [MsgAlertIsShow,setMsgAlertIsShow] = useState(false)

useEffect( () => { 

if (MsgAlert && !MsgAlertIsShow) {
ActiveMsgAlert()  } 
else if (MsgBtnWait) {
setMsgAlertIsShow(false)  }
}, [MsgAlert,MsgAlertIsShow,MsgBtnWait ])

function ActiveMsgAlert() {
setMsgAlert(false);    
setMsgAlertIsShow(true) ;
setTimeout(()=> setMsgAlertIsShow(false)  ,8000 )  } 
    
return  <div>
{MsgAlertIsShow && <p className='IEMmsgAlert' >O cpf deve conter 11 dígitos sem ponto ou vírgula</p> }
</div>  
}

export default MsgCpfWrong
