import { useContext } from 'react';
// import { IMember } from './Types';
import {RegistContext } from './RegistContext'
import {IBoxMember} from './Types'
import { collection,getDocs } from "firebase/firestore"; 
import {db} from './firebase';

export async function GetMemberToBox() {
    const { setBoxMember } = useContext(RegistContext) as IBoxMember
    const querySnapshot = await getDocs(collection(db, "MemberDB"));
    const membersArray:any = [];
    querySnapshot.forEach((doc) => {
        membersArray.push(doc.data());
    });
    setBoxMember(membersArray);
}

export function MemberFirebase() {
    const { setBoxMember } = useContext(RegistContext) as IBoxMember

}
export default MemberFirebase

