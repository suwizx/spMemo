import PhotosHeader from "@/app/components/PhotosHeader";
import { getPersonData } from "@/app/action/person";

export default async function RootLayout({ children , params}) {

  const personData = await getPersonData(params.path)
  const { name , link } = personData

  return (
    <>
      <PhotosHeader name={name} link={link} />
      {children}
    </>
  );
}
