import HeroSlider from "../components/Hero/HeroSlider";
import StorySection from "../components/story/StorySection";
import ProductsSection from "../components/Products/ProductsSection";
import BranchesSection from "../components/Branches/BranchesSection";
export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <ProductsSection />
       <StorySection />
       <BranchesSection />
    </div>
  );
}
