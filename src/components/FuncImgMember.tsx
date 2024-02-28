import { ref, uploadBytes, getDownloadURL,listAll } from "firebase/storage";
import { storage } from "./firebase";


export async function UploadImgMember(img:File,cpf:number|string) {
    const storageRef = ref(storage,`fbimages/(${cpf})`);
    const snapshot = await uploadBytes(storageRef, img); 
    const url = await getDownloadURL(snapshot.ref);
    return url;   
}

export function ReturnImgForCpf(cpf:string | number,Box:Array<string>) {

const regex = /\((\d+)\)/;

const imgUrl =  Box.find((img)=> {
    const cpfWhitoutParenthes = img.match(regex);
    if (cpfWhitoutParenthes && cpfWhitoutParenthes[1] === cpf ) {
      //  console.log(cpfWhitoutParenthes)
return true
      } 
      else {
        console.log("Nenhum número encontrado entre parênteses na URL");
      }

    } 
 )
return imgUrl
}




// export async function DownloadImgMember() {
// const { setBoxImgMember } = useContext(RegistContext) as IBoxImgMember
// try { const storageRef = ref(storage,`fbimages/`);
// const imageList = await listAll(storageRef);
// const urlPromises = imageList.items.map(item => getDownloadURL(item));
// const urls = await Promise.all(urlPromises);
// setBoxImgMember(urls)
// }
// catch (error) {
//     console.error('Erro geral ao obter URLs das imagens:', error);
//   }
//     }
export function Hello() {
    console.log('HELOOOOOOOOOO')
}
