import { BsFilePersonFill } from "react-icons/bs";
import {useState,useRef,useEffect  } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { IMember } from '../components/Types';
import '../components/InputRegMember.css'
import { FaTrashAlt } from "react-icons/fa";
import './InputRegMember.css'

interface IRegistImg{
    show:string;
filename:File | null
}
interface IRegistMemb{
MsgBtnWait:boolean
setMemberToStorage:React.Dispatch<React.SetStateAction<IMember>>
MemberToStorage:IMember
setInputHasValue:React.Dispatch<React.SetStateAction<boolean>>
}

function InputImgRegistMemb({MsgBtnWait,setMemberToStorage,MemberToStorage,setInputHasValue}:IRegistMemb) {
const [ImgUpload, setImgUpload] = useState<IRegistImg>({show:'',filename:null});
const inputFileRef = useRef<HTMLInputElement>(null);

useEffect(() => {
if (MsgBtnWait && ImgUpload.filename !== null) {
UploadImgMember(ImgUpload.filename,MemberToStorage.cpf)    
}
else if(MsgBtnWait && ImgUpload.filename === null) { setInputHasValue(true)}
}, [MsgBtnWait]) 

async function UploadImgMember(img:any,cpf:number|string) {
    const storageRef = ref(storage, `fbimages/(${cpf})`);
    const snapshot = await uploadBytes(storageRef,img); 
    const url = await getDownloadURL(snapshot.ref);
    setMemberToStorage(prevState => ({...prevState,imagePersonal:`${url}`}));
    setInputHasValue(true)   ;
    ClearInputFile();
    return url;
    }
    
function ChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file ) {
        const reader = new FileReader();
        reader.onload = () => {
    setImgUpload((prevState => ({...prevState,show:reader.result as string,filename:file})))
    }    
    reader.readAsDataURL(file);
}}

function ClearInputFile() {
 if (inputFileRef.current) {
 inputFileRef.current.value = '';
 }
 setImgUpload({show:'',filename:null});
}

return <div>

<input id='file-input' type="file" accept='image/*' className='IRMlinputFileHidden' onChange={ChangeImg} ref={inputFileRef}/>

<div className='IRMlabelFile' >

<div className={ImgUpload.show  === '' ? 'IRMdivToTextSpan' : ''}>
{ImgUpload.show !== '' ?
<img src={ImgUpload.show} alt="Imagem para selecionar" width="100%"/> :
<span>Sem foto</span>}    
</div>




<div className="IRMdivBtnFile">

<span>
<label htmlFor='file-input' className="IRMlabelSpan2">
<BsFilePersonFill className='IRMiconPhoto'/>
Selecionar foto 
</label>
</span>

<button onClick={()=> setImgUpload((prevState => ({...prevState,show:'',filename:null})))}>
<FaTrashAlt className='IRMiconTrash'/>Remover foto</button>
</div>

</div>
    </div>
}

export default InputImgRegistMemb
