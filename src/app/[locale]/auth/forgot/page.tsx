import FormSideForgot from "@/components/Auth/Forgot/FormSideForgot";
import ImageSideForgot from "@/components/Auth/Forgot/ImageSideForgot";


export default async function ForgotPassword() {
  return (
    <main
      className="flex w-full h-full justify-between xl:px-8"
      style={{ backgroundColor: 'white' }}
    >
      <FormSideForgot />
      <ImageSideForgot />
    </main>
  );
}
