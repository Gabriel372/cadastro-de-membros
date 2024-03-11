import { createContext, useState,ReactNode,useEffect } from 'react';
import {IBoxImgMember, IMember} from './Types'
import { collection, getDocs } from "firebase/firestore";
import {db} from './firebase';
import { IAdm } from './Types';

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

  return (
    <RegistContext.Provider value={{ BoxMember,BoxAdm,IsLoggedIn,BoxImgMember,setBoxImgMember,setBoxMember,setBoxAdm,setIsLoggedIn}}>
      {children}
    </RegistContext.Provider>
  );
};
