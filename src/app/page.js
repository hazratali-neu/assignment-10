import AdvertisementSection from "@/components/AdvertisementSection";
// import BannerSlider from "@/components/BannerSlider";
import Hero from "@/components/Hero";
import LatestTickets from "@/components/Latesttickets";
import PopularRoutes from "@/components/PopularRoutes";
import WhyChooseUs from "@/components/WhyChooseUs";




export default async function Home() {

  return (
    <div>
      {/* <BannerSlider></BannerSlider> */}
      <Hero></Hero>
      <AdvertisementSection></AdvertisementSection>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
