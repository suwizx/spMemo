import { store } from "../lib/firebase"
import { ref , listAll } from 'firebase/storage'

async function GetList () {
    const datasRef = ref(store)
    try{
        let folder = []
        const list = await listAll(datasRef)
        const prefixes = list.prefixes
        prefixes.forEach((data) => {console.log(data._location.path_);})
    }catch(err){
        return err
    }

}

export default async function Page(){
    return(
        <>
        {JSON.stringify(await GetList())}
        </>
    )
}