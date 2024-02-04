import { collection, getDocs } from "firebase/firestore"; 
import { db } from "./lib/firebase";

async function datasFetch(){
  try{
    let datas = []
    const query = await getDocs(collection(db,"feeds"))
    await query.forEach((data) => {
      datas.push({id:data.id , data:data.data()})
    })
    return await datas
  }
  catch(err){
    return err
  }
}
          
export default async function Home() {        

  return (
    <main>
      {JSON.stringify(await datasFetch())}
    </main>
  );
}
