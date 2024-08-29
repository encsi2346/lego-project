import React, { useEffect, useState, ReactNode } from 'react';

interface CarouselProps {
    children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
        }, 5000);

        return () => clearInterval(interval);
    }, [children]);

    return (
        <div className="relative overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {React.Children.map(children, (child, index) => (
                    <div key={index} className="flex-none w-full p-4">
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
