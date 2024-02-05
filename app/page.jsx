import PathGrid from "./components/grids/PathGrid";
import axios from "axios";

async function datasFetch(){
  try{
    const paths = await axios.get("http://localhost:3000/api/files/paths")
    return paths.data
  }
  catch(err){
    console.log(err);
    return err
  }
}
          
export default async function Home() {        

  const data = await datasFetch()
  const paths = data.paths

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {paths.map((data,i) => (<PathGrid key={i} path={data} />))}
      </div>
    </main>
  );
}
