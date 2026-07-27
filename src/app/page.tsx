import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Arsenal } from "@/components/Arsenal";
import CleaningTrashAdvanced from "@/components/CleaningTrashAdvanced";
import { QuestMap } from "@/components/QuestMap";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Arsenal />
        <CleaningTrashAdvanced />
        <QuestMap />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
