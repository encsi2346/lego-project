import MainButton from "@/components/MainButton";
import RatingComponent from "@/components/RatingComponent";
import image1 from "@/assets/picture.png";

type Props = {
    owner: string;
    title: string;
    images: string[];
    rating: number;
};

const CreationCard = ({ owner, title, images, rating }: Props) => {
    return (
        <div
            className="bg-gradient-to-b from-[#4c31b4] to-[#2e1065] rounded-3xl p-8 max-w-sm mx-auto text-center text-white card card-compact w-[200px]m-5">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex flex-col items-center">
                <div className="flex items-center">
                    <img src={images.length > 0 ? images[0] : image1} alt={images.length > 0 ? images[0] : image1}
                         className="rounded-[6.46px] w-[150.21px]"/>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-[14px] font-[500] leading-[18.9px] w-[218px]">{owner}</span>
                </div>
                <div className="flex items-center space-x-1 ml-10 mt-4">
                    <RatingComponent rating={rating}/>
                </div>
                <div className="card-actions justify-center mt-6">
                    <MainButton>Read more</MainButton>
                </div>
            </div>
        </div>
    );
};

export default CreationCard;