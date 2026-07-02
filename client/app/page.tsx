import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/Footer";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";


export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <Hero />

      <Features />

      <Statistics />

      <Testimonials />

      <Footer />

    </main>
  );
}