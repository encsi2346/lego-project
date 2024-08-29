import useMediaQuery from "../../hooks/useMediaQuery";
import {SelectedPage} from "@/types";
import Ninjago from "@/assets/ninjago.png";
import Batman from "@/assets/batman.png";
import JurassicWorld from "@/assets/jurassicworld.png";
import Movie from "@/assets/movie.png";
import Technic from "@/assets/technic.png";
import StarWars from "@/assets/starwars.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";
import MainButton from "@/components/MainButton";
import Carousel from "@/components/Carousel";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

interface Image {
    src: string;
    alt: string;
}

const Home = ({ setSelectedPage }: Props) => {
    const navigate = useNavigate();
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

    const images: Image[] = [
        { src: JurassicWorld, alt: 'JurssicWorld' },
        { src: StarWars, alt: 'StarWars' },
        { src: Batman, alt: 'Batman' },
        { src: Movie, alt: 'Movie' },
        { src: Technic, alt: 'Technic' },
    ];

    return (
        <section id="home" className="md:h-full md:pb-0 gap-16 bg-gray-20 py-60">
            <motion.div
                className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
                onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
            >
                <div className="z-10 mt-32 md:basis-3/5">
                    <motion.div
                        className="md:-mt-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <div className="relative">
                            <div
                                className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext">
                                <h1 className="basis-3/5 font-montserrat text-8xl font-extrabold">LEGO NPU</h1>
                            </div>
                        </div>

                        <p className="font-sans mt-8 text-lg font-light">
                            Unleash your creativity with LEGO NPU—where every piece has endless possibilities!
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-8 flex items-center gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <MainButton onClick={() => navigate(`/register`)}>
                            Join Now
                        </MainButton>
                        <AnchorLink
                            className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
                            onClick={() => setSelectedPage(SelectedPage.NPU)}
                            href={`#${SelectedPage.NPU}`}
                        >
                            <p>Learn More</p>
                        </AnchorLink>
                    </motion.div>
                </div>

                <div
                    className="flex basis-3/5 justify-center md:z-10 md:ml-40 md:mt-16 md:justify-items-end">
                    <img alt="home-pageGraphic" src={Ninjago} />
                </div>
            </motion.div>

            {isAboveMediumScreens && (
                <div className="h-[150px] w-full bg-primary-100 py-10 mt-40">
                    <div className="mx-auto w-5/6 flex items-center justify-center">
                        <div className="w-full flex justify-center">
                            {images.length > 0 && (
                                <Carousel>
                                    {images.map((i) => (
                                        <img width="170" alt={i.alt} src={i.src}/>
                                    ))}
                                </Carousel>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Home;