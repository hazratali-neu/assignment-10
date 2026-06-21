import BannerSlider from "@/components/BannerSlider";
import LatestTicketsCard from "@/components/LatestTicketsCard";
import { getFetchData } from "@/lib/api/data";


export default async function Home() {
  const tickets=await getFetchData();
  return (
    <div>
      <BannerSlider></BannerSlider>
       <LatestTicketsCard tickets={tickets}></LatestTicketsCard>
    </div>
  );
}
