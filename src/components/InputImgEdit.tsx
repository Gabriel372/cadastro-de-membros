
import { BsFilePersonFill } from "react-icons/bs";
import {IBoxImgMember,IEdtImg,IEditInputMember} from './Types'
import {useState,useEffect,useContext  } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import {RegistContext } from './RegistContext'
import './InputImgEdit.css'
import { FaTrashAlt } from "react-icons/fa";
import {CheckFormatImgIsLandScape} from './FuncImgMember'
import heic2any from 'heic2any';
// import heic2jpeg from 'heic2any';


function InputImgEdit({MemberEdit,setMemberEdit,setHasMemberToUpdt,MsgBtnWait}:IEditInputMember) {
const [ImgEdit, setImgEdit] = useState<IEdtImg>({show:MemberEdit.imagePersonal,filename:null,formatImg:'',hasFormatImgToCheck:false});
const { setBoxImgMember,BoxImgMember } = useContext(RegistContext) as IBoxImgMember
const [FormatImgMemberWasCheck, setFormatImgMemberWasCheck] = useState<boolean>(false)

useEffect(() => {
    if (MsgBtnWait && ImgEdit.filename !== null ) {
UploadImgMember(ImgEdit.filename,MemberEdit.cpf) ;
setHasMemberToUpdt(true) ; }
else if (MsgBtnWait) { setHasMemberToUpdt(true) ; }
else if (ImgEdit.hasFormatImgToCheck) { CheckNewFormatImg() ;}
else if (!FormatImgMemberWasCheck) { GiveFormatImgMemberEditToImgEdit() ;}
    },[MsgBtnWait,ImgEdit,MemberEdit])  

function GiveFormatImgMemberEditToImgEdit() {
MemberEdit.formatImg === '' && setImgEdit(prevState => ({...prevState,formatImg:''})) ;
MemberEdit.formatImg === 'landscape' && setImgEdit(prevState => ({...prevState,formatImg:'landscape'})) ;
MemberEdit.formatImg === 'portrait' && setImgEdit(prevState => ({...prevState,formatImg:'portrait'})) ;
setFormatImgMemberWasCheck(true)  ; }

function CheckNewFormatImg() {
CheckFormatImgIsLandScape(ImgEdit.show).then((data)=>{ 
 if (data) {
setImgEdit(prevState => ({...prevState,formatImg:'landscape',hasFormatImgToCheck:false})) ;
 setMemberEdit(prevState => ({...prevState,formatImg:'landscape'})) ;}
 else {
setImgEdit(prevState => ({...prevState,formatImg:'portrait',hasFormatImgToCheck:false})) ;
setMemberEdit(prevState => ({...prevState,formatImg:'portrait'})) ;}  }) }

async function UploadImgMember(img:any,cpf:number|string) {
const storageRef = ref(storage, `fbimages/(${cpf})`);
const snapshot = await uploadBytes(storageRef,img);
const url = await getDownloadURL(snapshot.ref);
setMemberEdit(prevState => ({...prevState,imagePersonal:`${url}`}));
setBoxImgMember(prevState => [...prevState,`${url}`]);
setHasMemberToUpdt(true) ;
        return url;
}

function RemoveImg() {
setImgEdit({show:'',filename:null,formatImg:'',hasFormatImgToCheck:false})
setMemberEdit((MemberEdit => ({...MemberEdit,imagePersonal:''})))
}

async function ChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
const file = event.target.files?.[0];
if (file ) {
 if (file.type === 'image/heic') {
heic2any({blob:file,toType:"image/jpeg",}).then((jpegBlob: any) => {
const reader = new FileReader();
reader.onload = () => {
setImgEdit(prevState => ({...prevState,show:reader.result as string,filename:jpegBlob,hasFormatImgToCheck:true}));
 }        
 reader.readAsDataURL(jpegBlob);}).catch((e: Error) => console.error(e));
 }else {const reader = new FileReader();
reader.onload = () => {
setImgEdit(prevState => ({...prevState,show:reader.result as string,filename:file,hasFormatImgToCheck:true}));
}
reader.readAsDataURL(file) ;}}}

//     const reader = new FileReader();
//     reader.onload = async () => {
//     let result = reader.result;
//     if (file.type === 'image/heic') {
//     const heicBlob = new Blob([new Uint8Array(result as ArrayBuffer)]);
//     const jpegBlob:any = await heic2any({ blob: heicBlob, toType: "image/jpeg", quality: 0.8 });           
//      result = URL.createObjectURL(jpegBlob);
//     }
//     setImgEdit((prevState => ({...prevState,show:reader.result as string,filename:file,hasFormatImgToCheck:true})))
//     }   
//     reader.readAsDataURL(file);
//     }
// }

// async function ChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
// const file = event.target.files?.[0];
// if (file ) {
// const reader = new FileReader();
// reader.onload = async () => {
// let result = reader.result;
// if (file.type === 'image/heic') {
// const heicBlob = new Blob([new Uint8Array(result as ArrayBuffer)]);
// const jpegBlob:any = await heic2any({ blob: heicBlob, toType: "image/jpeg", quality: 0.8 });           
//  result = URL.createObjectURL(jpegBlob);
// }
// setImgEdit((prevState => ({...prevState,show:reader.result as string,filename:file,hasFormatImgToCheck:true})))
// }   
// reader.readAsDataURL(file);
// }}


// async function ChangeImg(event: React.ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = async () => {
//             let result = reader.result;
//             if (file.type === 'image/heic') {
//                 const heicBlob = new Blob([new Uint8Array(result as ArrayBuffer)]);
//                 const jpegBlob:any = await heic2jpeg({ blob: heicBlob, toType: "image/jpeg", quality: 0.8 });
//                 result = URL.createObjectURL(jpegBlob);
//             }
//             setImgUpload((prevState => ({...prevState, show: result as string, filename: file, hasFormatImgToCheck: true})));
//         }
//         reader.readAsArrayBuffer(file);
//     } }

    return <div>
<input id='file-input' type="file" accept="image/*,.heic,.heif" className='IRMlinputFileHidden' onChange={(event)=>ChangeImg(event)}/>
<div className='IRMlabelFile'>
<span className="IRMspanDad">
{ImgEdit.show !== '' ? <img src={ImgEdit.show} alt="Foto" 
className={`${ImgEdit.formatImg === 'landscape' ?'IIElandscapeImg':'IIEportraitImg'}`}/>
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