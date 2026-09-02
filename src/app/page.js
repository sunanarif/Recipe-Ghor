import AboutPage from "@/Component/UI/AboutPage";
import Banner from "@/Component/UI/Banner";
import FAQ from "@/Component/UI/FAQ";
import FeatureSection from "@/Component/UI/FeatureSection";
import MostLike from "@/Component/UI/MostLike";
import Navbar from "@/Component/UI/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <MostLike></MostLike>
      <AboutPage></AboutPage>
      <FAQ></FAQ>
    </div>

  );
}