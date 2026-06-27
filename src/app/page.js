import AdvertisementSection from "@/components/AdvertisementSection";
import BannerSlider from "@/components/BannerSlider";
import LatestTickets from "@/components/Latesttickets";
import PopularRoutes from "@/components/PopularRoutes";




export default async function Home() {

  return (
    <div>
      <BannerSlider></BannerSlider>
      <AdvertisementSection></AdvertisementSection>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
    </div>
  );
}
