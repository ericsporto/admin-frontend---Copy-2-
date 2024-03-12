import FormSideRegister from "@/components/Auth/Register/FormSideRegister";
import ImageSideRegister from "@/components/Auth/Register/ImageSideRegister";


export default async function Register() {

  return (
    <main
      className="flex w-full h-full justify-between xl:px-8"
      style={{ backgroundColor: 'white' }}
    >
      <FormSideRegister />
      <ImageSideRegister />
    </main>
  );
}
