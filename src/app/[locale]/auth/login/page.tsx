import FormSideLogin from "@/components/Auth/Login/FormSideLogin";
import ImageSideLogin from "@/components/Auth/Login/ImageSideLogin";


export default async function Login() {
  return (
    <main
      className="flex w-full h-full justify-between xl:px-8"
      style={{ backgroundColor: 'white' }}
    >
      <FormSideLogin />
      <ImageSideLogin />
    </main>
  );
}
