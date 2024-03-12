import FormSideChange from "@/components/Auth/ChangePassword/FormSideChange";
import ImageSideChange from "@/components/Auth/ChangePassword/ImageSideChange";

export default async function ChangePassword() {
  return (
    <main
      className="flex w-full h-full justify-between xl:px-8"
      style={{ backgroundColor: 'white' }}
    >
      <FormSideChange />
      <ImageSideChange />
    </main>
  );
}
