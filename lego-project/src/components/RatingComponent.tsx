import { FaStar } from "react-icons/fa";

interface Props {
    rating: number,
}

const RatingComponent = ({ rating }: Props) => {
    const totalStars = 5;

    return (
        <div className="flex items-center space-x-2">
            {[...Array(totalStars)].map((_, index) => (
                <FaStar
                    key={index}
                    className={`text-[26px] ${index < Math.round(rating) ? 'text-[#FFC132]' : 'text-[#b9ddff]'}`}
                />
            ))}
        </div>
    );
};

export default RatingComponent;