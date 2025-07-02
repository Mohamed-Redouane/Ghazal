import Footer from "@/components/Footer";
import SocialSection from "@/components/SocialSection";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import MenuSection from "@/components/MenuSection";
import ScrollAnimations from "@/components/ScrollAnimations";
export default function Home() {
   return (
    <div className="min-h-screen">
      <ScrollAnimations />
      <Navigation/>
      <HeroSection/>
      <MenuSection/>
      <AboutSection/>
      <GallerySection/>
      <ContactSection/>
      <SocialSection/>
      <Footer/>
    </div>
  );
}
