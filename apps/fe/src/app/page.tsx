import Header from "@/components/ui/app/headnavbar";
import Landing from "@/components/ui/app/landing";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col items-center justify-start pt-[100px]">
      <Header />
      <Landing />
    </div>
  );
}
