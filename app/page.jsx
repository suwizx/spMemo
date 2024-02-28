
import PathGrid from "./components/grids/PathGrid";
import { store } from "@/app/lib/firebase"
import { ref , listAll } from 'firebase/storage'
import { unstable_noStore as noStore } from 'next/cache';
import { DivMotion } from "./components/DivMotion";

async function datasFetch(){
  noStore()
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
  noStore()      

  const paths = await datasFetch()

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <DivMotion variants={container}
        initial="hidden"
        animate="visible" 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-zinc-800 py-4">
        {paths.map((data,i) => (
          <DivMotion key={i} variants={item} >
            <PathGrid 
            path={data} 
           />
          </DivMotion>
        ))}
      </DivMotion>
    </main>
  );
}
