
import { BsFilePersonFill } from "react-icons/bs";
import {IMember,IBoxImgMember} from './Types'
import {useState,useEffect,useContext  } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import {RegistContext } from './RegistContext'
import './InputImgEdit.css'
import { FaTrashAlt } from "react-icons/fa";

interface IEditInputMember {
    MemberEdit:IMember
    setMemberEdit:React.Dispatch<React.SetStateAction<IMember>>; 
    setHasMemberToUpdt:React.Dispatch<React.SetStateAction<boolean>>;  
    MsgBtnWait:boolean
}
interface IEdtImg{
    show:string;
filename:File | null
}

function InputImgEdit({MemberEdit,setMemberEdit,setHasMemberToUpdt,MsgBtnWait}:IEditInputMember) {
const [ImgEdit, setImgEdit] = useState<IEdtImg>({show:MemberEdit.imagePersonal,filename:null});
const { setBoxImgMember,BoxImgMember } = useContext(RegistContext) as IBoxImgMember

useEffect(() => {
    if (MsgBtnWait && ImgEdit.filename !== null ) {
UploadImgMember(ImgEdit.filename,MemberEdit.cpf) ;
    setHasMemberToUpdt(true)
 }
else if (MsgBtnWait) {
setHasMemberToUpdt(true)    
}
    },[MsgBtnWait])  

async function UploadImgMember(img:any,cpf:number|string) {
const storageRef = ref(storage, `fbimages/(${cpf})`);
const snapshot = await uploadBytes(storageRef,img);
const url = await getDownloadURL(snapshot.ref);
setMemberEdit(prevState => ({...prevState,imagePersonal:`${url}`}));
setBoxImgMember(prevState => [...prevState,`${url}`]);
setHasMemberToUpdt(true) ;
        return url;
}

function ChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
const file = event.target.files?.[0];
if (file ) {
    const reader = new FileReader();
    reader.onload = () => {
setImgEdit((prevState => ({...prevState,show:reader.result as string,filename:file})))
}    
reader.readAsDataURL(file);
}}

function RemoveImg() {
setImgEdit({show:'',filename:null})
setMemberEdit((MemberEdit => ({...MemberEdit,imagePersonal:''})))
console.log(MemberEdit)    
}


    return <div>
<input id='file-input' type="file" accept='image/*' className='IRMlinputFileHidden'  onChange={ChangeImg}/>

<div className='IRMlabelFile'>

<span className="IRMspanDad">
{ImgEdit.show !== '' ? <img src={ImgEdit.show} alt="Imagem para selecionar" width="100%"/>
:<span>Sem foto</span> } 
</span>

<div className="IRMdivBtnFoto">

<label htmlFor='file-input' className="IRMlabelSelectPhoto">
<span className='IRMspan2'>
<BsFilePersonFill className='IRMiconPhoto'/>
        Selecionar foto 
</span>
</label>

<button className="IRMbtnRemovefoto" onClick={RemoveImg}><FaTrashAlt className="IRMiconTrash"/>
Remover foto</button>

</div>

</div>
{/* <button onClick={()=> console.log()}>TESTE</button> */}
    </div>
}

export default InputImgEdit
