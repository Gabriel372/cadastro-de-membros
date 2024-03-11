import { IMember,IBoxImgMember } from "./Types"
import { useContext,useEffect,useState } from 'react';
import { ref,deleteObject,getStorage } from 'firebase/storage';
import {RegistContext } from './RegistContext'

interface IDelPrevImg {
    MemberEdit:IMember
    MsgBtnWait:boolean
    HasMemberToUpdt:boolean
}

function DelPrevImgMember({MemberEdit,MsgBtnWait,HasMemberToUpdt}:IDelPrevImg) {
const [PrevMembData,setPrevMembData] = useState<IMember | undefined>(MemberEdit)
const { BoxImgMember,setBoxImgMember } = useContext(RegistContext) as IBoxImgMember

const CpfIsNew = PrevMembData?.cpf !== MemberEdit.cpf
const ImgIsNew = PrevMembData?.imagePersonal !== MemberEdit.imagePersonal ;
const ImgActualEmptyEimgPrevHas = MemberEdit.imagePersonal === '' && PrevMembData?.imagePersonal !== ''

useEffect(() => {
    if (HasMemberToUpdt && ImgIsNew ) {
        CheckToDeleteImg();
    }
    },[HasMemberToUpdt])  


function CheckToDeleteImg() {
if (CpfIsNew && ImgIsNew && PrevMembData?.imagePersonal !== '' || ImgActualEmptyEimgPrevHas) {
DeleteImg();
}    
}

function DeleteImg() {
        const storage = getStorage();
            const desertRef = ref(storage,`fbimages/(${PrevMembData?.cpf})`);
            deleteObject(desertRef).then(() => {
                setBoxImgMember(BoxImgMember.filter((img) => img !== PrevMembData?.imagePersonal));
                setPrevMembData(undefined);
            }).catch((error) => {
                console.log('ERRO:',error);
            });    } 


return <div>
</div>    
}

export default DelPrevImgMember
