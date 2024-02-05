'use client'

import { store } from "../lib/firebase"
import { ref , listAll } from 'firebase/storage'

async function GetList () {
    const datasRef = ref(store)
    try{
        const list = await listAll(datasRef)
        return list
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