import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { Navbar } from "@/components/navbar";

export default function ResetPasswordPage() {
  return (
    <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover min-h-screen overflow-hidden">
      <div className="w-full h-screen font-satoshi">
        <Navbar/>
        <Suspense fallback={
          <div className="flex justify-center w-full p-10 h-[700px]">
            <div className="flex flex-col gap-4 w-[550px] h-[450px] justify-center items-center text-slate-100 rounded-3xl backdrop-blur-xs bg-slate-950/50 border-2 border-slate-500">
              <p className="text-xl">Loading Form...</p>
            </div>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}