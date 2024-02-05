import { store } from "@/app/lib/firebase" 
import { ref , listAll , getStorage , getDownloadURL } from "firebase/storage"

async function getPhotoFromPath(path){
    const photoRef = ref(store,path)
    let photoArr = []
    const photoList = await listAll(photoRef)
    const photosItems = await photoList.items
    await photosItems.forEach((data) => {
        path = data._location.path_
        photoArr.push(path)
    })
    return photoArr;
}

async function GetURL(path){
    let picArr = []
    const photosArr = await getPhotoFromPath(path)
    const promiseArr = photosArr.map((data) => {
        return getDownloadURL(ref(store, data)).then((url) => {
            picArr.push({url,Imgpath:data});
        });
    });
    await Promise.all(promiseArr);
    return picArr
}

export default async function Page({ params }){
    const { path } = params
    const imgURL = await GetURL(path)
    return(
        <div className="max-w-xl p-4 mx-auto">
            {imgURL.map((data,i) => (
                <div className="bg-zinc-900 border border-zinc-800 py-4 rounded-xl my-4">
                    <img className="aspect-square object-cover  my-4" src={data.url} alt="test" />
                    <p className="p-4">{data.Imgpath.split(`${path}/`)[1]}</p>
                </div>
            ))}
        </div>
        
    )
}