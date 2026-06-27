import AdvertisementSection from "@/components/AdvertisementSection";
import BannerSlider from "@/components/BannerSlider";
// import LatestTicketsCard from "@/components/LatestTicketsCard";



export default async function Home() {

  return (
    <div>
      <BannerSlider></BannerSlider>
      <AdvertisementSection></AdvertisementSection>
       {/* <LatestTicketsCard></LatestTicketsCard> */}
    </div>
  );
}
