import PathGrid from "./components/grids/PathGrid";
import { store } from "@/app/lib/firebase"
import { ref , listAll } from 'firebase/storage'

async function datasFetch(){
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
          
export default async function Home() {        

  const paths = await datasFetch()

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-zinc-800 py-4">
        {paths.map((data,i) => (<PathGrid key={i} path={data} />))}
      </div>
    </main>
  );
}
