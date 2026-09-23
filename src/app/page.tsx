import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Bento from "@/components/Bento";
import Projects from "@/components/Projects";
import ThreeDShowcase from "@/components/ThreeDShowcase";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { getProfile, getRepos } from "@/lib/github";

export const revalidate = 300;

export default async function Home() {
  const [repos, profile] = await Promise.all([getRepos(), getProfile()]);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TechMarquee />
      <Bento />
      <Projects repos={repos} profile={profile} />
      <ThreeDShowcase />
      <Contact />
      <Footer />
    </main>
  );
}