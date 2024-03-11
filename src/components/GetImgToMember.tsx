import {IBoxImgMember, IBoxMember, IMember} from './Types'
import { useEffect,useContext } from 'react';
import {RegistContext } from '../components/RegistContext'
 
function GetImgToMember() {
    const { BoxImgMember } = useContext(RegistContext) as IBoxImgMember
    const { setBoxMember,BoxMember } = useContext(RegistContext) as IBoxMember

useEffect( () => { 
    if (BoxMember.length > 0 && BoxImgMember.length > 0 ) {
      PutImgInEachMember();
  }
  }, BoxMember)    

  function PutImgInEachMember() {
        const NewBoxMember:IMember[] = BoxMember.map( (member:IMember) => {
    const ImgFinded = BoxImgMember.find((img:any ) => {
          const urlCpf:string = img.match(/\(([^)]+)\)/) ? img.match(/\(([^)]+)\)/)[1] : '' ;
          return member.cpf === urlCpf ;
        })
            if (ImgFinded) {
                member.imagePersonal=`${ImgFinded}` ;
            }
      return member
     } )
    setBoxMember(NewBoxMember)
    }


return <></>
}

export default GetImgToMember




