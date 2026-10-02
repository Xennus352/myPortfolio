import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Bento from "@/components/Bento";
import Projects from "@/components/Projects";
import GitHubHeatmap from "@/components/GitHubHeatmap";
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
      <About />
      <Bento />
      <Projects repos={repos} profile={profile} />
      <GitHubHeatmap />
      <Contact />
      <Footer />
    </main>
  );
}