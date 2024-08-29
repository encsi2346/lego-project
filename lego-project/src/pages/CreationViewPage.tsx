import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {CreationType} from "@/types";
import image1 from "@/assets/picture.png";
import image2 from "@/assets/picture2.png";
import image3 from "@/assets/picture3.png";
import image4 from "@/assets/picture4.png";
import RatingComponent from "@/components/RatingComponent";

interface Section {
    title: string;
    description: string;
}

interface Image {
    src: string;
    alt: string;
}

const CreationViewPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [creation, setCreation] = useState<CreationType>();
    const [creationImages, setCreationImages] = useState([]);

    const sections: Section[] = [
        { title: 'Title', description: `${creation?.title}`},
        { title: 'Description', description: `${creation?.description}` },
        { title: 'Lego Family', description: `${creation?.legoFamily}` },
        { title: 'Rating', description: `${creation?.rating}` },
        { title: 'Owner', description: `${creation?.owner}` },
    ];

    const images: Image[] = [
        { src: image1, alt: 'image1' },
        { src: image2, alt: 'image2' },
        { src: image3, alt: 'image3' },
        { src: image4, alt: 'image4' },
    ];

    const [selectedSection, setSelectedSection] = useState<Section>(sections[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleSectionClick = (section: Section) => {
        setSelectedSection(section);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/creations/${id}`).then(response => {
            setCreation(response.data);
            setCreationImages(response.data.images);
        });
    }, [id]);

    if (!creation) return '';

    const currentImages = creation.images && creation.images.length > 0 ? creation.images : images.map(image => image.src);
    const currentAlt = creation.images && creation.images.length > 0 ? creation.images[currentImageIndex] : images[currentImageIndex].alt;

    return (
        <div className="h-screen w-full flex">
            <div className="absolute inset-0 bg-yellow-400 clip-diagonal-left">
                <div className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col justify-center items-start p-10 z-10">
                    <ul className="space-y-6 text-left">
                        {sections.map((section) => (
                            <li
                                key={section.title}
                                className={`text-xl font-bold cursor-pointer ${selectedSection.title === section.title ? 'text-red-600' : ''}`}
                                onClick={() => handleSectionClick(section)}
                            >
                                {section.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="absolute inset-0 bg-blue-600 clip-diagonal-right">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex flex-col justify-center items-start p-10 text-white z-10">
                    <div className="ml-auto mr-20">
                        <h1 className="text-4xl font-bold">{selectedSection.description}</h1>
                        {selectedSection.title === 'Title' && (
                            <button className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded"
                                    onClick={() => navigate(`/creations/${id}`)}>
                                Edit
                            </button>
                        )}
                        {selectedSection.title === 'Rating' && (
                            <div className="mt-4">
                                <RatingComponent rating={creation.rating}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="absolute left-1/2 transform -translate-x-1/3 top-1/2 transform -translate-y-1/2 flex items-center z-20">
                <button onClick={handlePrevImage} className="text-white text-4xl mr-4">&#9664;</button>
                <img
                    src={currentImages[currentImageIndex]}
                    alt={currentAlt}
                    className="h-96"
                />
                <button onClick={handleNextImage} className="text-white text-4xl ml-4">&#9654;</button>
            </div>
        </div>
    );
};

export default CreationViewPage;