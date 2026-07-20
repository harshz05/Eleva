import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutEleva from "@/components/home/AboutEleva";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/Footer";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <AboutEleva />
      <Features />
      <Statistics />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}