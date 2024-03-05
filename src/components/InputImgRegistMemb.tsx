import { BsFilePersonFill } from "react-icons/bs";
import {useState,useRef,useEffect  } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { IMember } from '../components/Types';
import { FaTrashAlt } from "react-icons/fa";
import './InputRegMember.css'
import {CheckFormatImgIsLandScape} from './FuncImgMember'
import { IRegistImg } from "../components/Types"
//import heic2any from 'heic2any';
import heic2jpeg from 'heic2any';


interface IRegistMemb{
MsgBtnWait:boolean
setMemberToStorage:React.Dispatch<React.SetStateAction<IMember>>
MemberToStorage:IMember
setInputHasValue:React.Dispatch<React.SetStateAction<boolean>>
}

function InputImgRegistMemb({MsgBtnWait,setMemberToStorage,MemberToStorage,setInputHasValue}:IRegistMemb) {
const [ImgUpload, setImgUpload] = useState<IRegistImg>({show:'',filename:null,formatIsLandscape:undefined,hasFormatImgToCheck:false});
const inputFileRef = useRef<HTMLInputElement>(null);

useEffect(() => {
if (MsgBtnWait && ImgUpload.filename !== null) {
UploadImgMember(ImgUpload.filename,MemberToStorage.cpf)    
}
else if(MsgBtnWait && ImgUpload.filename === null) { setInputHasValue(true)}
else if(ImgUpload.show !== '' && ImgUpload.hasFormatImgToCheck){
CheckFormatImgIsLandScape(ImgUpload.show).then((data)=>{
data ? setMemberToStorage(prevState => ({...prevState,formatImg:'landscape'})) :
setMemberToStorage(prevState => ({...prevState,formatImg:'portrait'})) ;
setImgUpload(prevState => ({...prevState,formatIsLandscape:data,hasFormatImgToCheck:false}));
})
}
}, [MsgBtnWait,ImgUpload]) 

async function UploadImgMember(img:any,cpf:number|string) {
    const storageRef = ref(storage, `fbimages/(${cpf})`);
    const snapshot = await uploadBytes(storageRef,img); 
    const url = await getDownloadURL(snapshot.ref);
    setMemberToStorage(prevState => ({...prevState,imagePersonal:`${url}`}));
    setInputHasValue(true)   ;
    ClearInputFile();
    return url;
}

function ClearInputFile() {
 if (inputFileRef.current) {
 inputFileRef.current.value = '';
 }
 setImgUpload({show:'',filename:null,formatIsLandscape:undefined,hasFormatImgToCheck:false});
//  setMemberToStorage(prevState => ({...prevState,formatImg:''})) ;
}
function RemoveImg() {
setImgUpload({show:'',filename:null,formatIsLandscape:undefined,hasFormatImgToCheck:false}) ;
setMemberToStorage(prevState => ({...prevState,formatImg:''}))  }


async function ChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
            let result = reader.result;
            if (file.type === 'image/heic') {
                const heicBlob = new Blob([new Uint8Array(result as ArrayBuffer)]);
                const jpegBlob:any = await heic2jpeg({ blob: heicBlob, toType: "image/jpeg", quality: 0.8 });
                result = URL.createObjectURL(jpegBlob);
            }
            setImgUpload((prevState => ({...prevState, show: result as string, filename: file, hasFormatImgToCheck: true})));
        }
        reader.readAsArrayBuffer(file);
    } }
 
// function ChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file ) {
//         const reader = new FileReader();
//         reader.onload = () => {
//     setImgUpload((prevState => ({...prevState,show:reader.result as string,filename:file,hasFormatImgToCheck:true})))
//     }    
//     reader.readAsDataURL(file);
// }}
return <div>
<input id='file-input' type="file" accept='image/*' className='IRMlinputFileHidden' onChange={ChangeImg} ref={inputFileRef}/>

<div className='IRMlabelFile' >

<div className={`${ImgUpload.show  === '' ? 'IRMdivToTextSpan':''}`}>

{ImgUpload.show !== '' ?
 <img src={ImgUpload.show} alt="Imagem para selecionar" className={`${ImgUpload.show !== '' && ImgUpload.formatIsLandscape ?'IRMlandscapeImg':'IRMportraitImg'}`}/> : 
<span>Sem foto</span>}    
</div>

<div className="IRMdivBtnFile">

<span>
<label htmlFor='file-input' className="IRMlabelSpan2">
<BsFilePersonFill className='IRMiconPhoto'/>
Selecionar foto 
</label>
</span>

<button onClick={RemoveImg}>
<FaTrashAlt className='IRMiconTrash'/>Remover foto</button>
</div>

</div>
    </div>
}

export default InputImgRegistMemb
