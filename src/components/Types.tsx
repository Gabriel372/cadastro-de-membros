import {nanoid} from "nanoid";

export class IAdm {
    name:string ;
    email:string ;
    password:string ;
    id:string
    nanoId:string;
    constructor(name:string='',email:string='',password:string='',id:string=''){
    this.name=name  
    this.email=email
    this.password=password
    this.id=id
    this.nanoId=nanoid()
    }
    }

    export class IMember {
        constructor(
            public name: string = '',
            public cpf: number | string ='',
            public cellphone: number | string ='',
            public address: string = '',
            public maritalStatus: string = '',
            public imagePersonal: string = '',
            public formatImg:string = '',
            public dateOfBirth:string='',
            public nanoId: string = nanoid(),
            public id: string = '',
        ) {}
    }

    export type IBoxMember = {
        BoxMember:Array<IMember>;
        setBoxMember:React.Dispatch<React.SetStateAction<Array<IMember>>>; 
    }
    export type IBoxAdm = {
        BoxAdm:Array<IAdm>;
        setBoxAdm:React.Dispatch<React.SetStateAction<Array<IAdm>>>; 
    }
    export type IBoxImgMember = {
        BoxImgMember:Array<string>;
        setBoxImgMember:React.Dispatch<React.SetStateAction<Array<string>>>; 
     match():RegExpMatchArray;
      regex:any
    }
   export type MyLinkProps = {
        to: string;
        smooth: boolean;
        duration: number;
}
export type IRegistImg = {
    show:string;
    filename:Blob | null
    formatIsLandscape:boolean | undefined
    hasFormatImgToCheck:boolean
    fileIsLoading:boolean
}
export type ILoggedIn = {
IsLoggedIn:boolean;
setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>; 
}
export type IEdtImg = {
    show:string;
filename:Blob | null
formatImg:string
hasFormatImgToCheck:boolean
fileIsLoading:boolean
}
export type IEditInputMember = {
    MemberEdit:IMember
    setMemberEdit:React.Dispatch<React.SetStateAction<IMember>>; 
    setHasMemberToUpdt:React.Dispatch<React.SetStateAction<boolean>>;  
MsgBtnWait:boolean
}