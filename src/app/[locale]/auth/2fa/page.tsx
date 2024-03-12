import FormSideTwoFactors from "@/components/Auth/2fa/FormSideTwoFactors";
import ImageSideTwoFactors from "@/components/Auth/2fa/ImageSideTwoFactors";

export default async function TwoFactors() {
  return (
    <main
      className="flex w-full h-full justify-between xl:px-8"
      style={{ backgroundColor: 'white' }}
    >
      <FormSideTwoFactors />
      <ImageSideTwoFactors />
    </main>
  );
}
