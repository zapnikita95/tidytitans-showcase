import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Kinetic } from "@/components/Kinetic";
import { Manifesto } from "@/components/Manifesto";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import CleanSaga from "@/components/CleanSaga";
import { Arsenal } from "@/components/Arsenal";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Kinetic />
        <Manifesto />
        <Problem />
        <HowItWorks />
        <CleanSaga />
        <Arsenal />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
