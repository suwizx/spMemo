import { store } from "@/app/lib/firebase"
import { ref , listAll } from 'firebase/storage'

async function GetList () {
    const datasRef = ref(store)
    try{
        let folder = []
        const list = await listAll(datasRef)
        const prefixes = list.prefixes
        prefixes.forEach((data) => {folder.push(data._location.path_);})
        return folder
    }catch(err){
        return err
    }
}

export async function GET(){

    const data = await GetList()
    return Response.json({paths:data})
}