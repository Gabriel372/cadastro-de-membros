import { createContext, useState,ReactNode,useEffect } from 'react';
import {IBoxImgMember, IMember} from './Types'
import { collection, getDocs } from "firebase/firestore";
import {db} from './firebase';
import { IAdm } from './Types';
import { ref, getDownloadURL,listAll } from "firebase/storage";
import { storage } from "./firebase";

interface  Props {
  children:ReactNode
   }
export const RegistContext = createContext({});

export function RegistContextProvider({children}:Props) {  
  const [BoxAdm,setBoxAdm] = useState<Array<IAdm>>([]);
  const [BoxMember,setBoxMember] = useState<Array<IMember>>([]);

  const [BoxImgMember,setBoxImgMember] = useState<Array<IBoxImgMember>>([]);
  const [IsLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect( () => { 
    GetAdmToBox() ;
    // DownloadImgMember() ;
  },[])

  async function GetAdmToBox() {
    const querySnapshot = await getDocs(collection(db, "AdmDB"));
    const data:any = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })  );
  setBoxAdm(data);
  GetMemberToBox()
  }
  async function GetMemberToBox() {
    const querySnapshot = await getDocs(collection(db, "MemberDB"));
    const data:any = querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}) );
  setBoxMember(data)
  }
//  async  function DownloadImgMember() {
// try { const storageRef = ref(storage,`fbimages/`);
// const imageList = await listAll(storageRef);
// const urlPromises = imageList.items.map(item => getDownloadURL(item));
// const urls:any = await Promise.all(urlPromises);
// setBoxImgMember(urls) 
// GetMemberToBox()
// }
// catch (error) {console.error('Erro geral ao obter URLs das imagens:', error);
// }  }
  return (
    <RegistContext.Provider value={{ BoxMember,BoxAdm,IsLoggedIn,BoxImgMember,setBoxImgMember,setBoxMember,setBoxAdm,setIsLoggedIn}}>
      {children}
    </RegistContext.Provider>
  );
};
