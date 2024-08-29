import HText from "../../components/HText";
import { CreationType, SelectedPage } from "@/types";
import { motion } from "framer-motion";
import CreationCard from "../../components/CreationCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 },
    },
};

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

const Creations = ({ setSelectedPage }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [creations, setCreations] = useState<CreationType[]>([]);

    useEffect(() => {
        axios.get('/creations')
            .then(({ data }) => {
                setCreations(data);
            })
            .catch(error => {
                console.log('Error fetching creations', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <section id="creations" className="bg-primary-100 mx-auto pt-24 pb-32 px-40">
            <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Creations)}>
                <motion.div
                    className="md:my-5 md:w-3/5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 },
                    }}
                >
                    <HText>DISCOVER OTHER'S CREATIONS</HText>
                </motion.div>

                <motion.div
                    className="mt-5 items-center justify-between gap-8 md:flex"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={container}
                >
                    <div className="flex flex-wrap justify-between gap-8 p-1 m-10">
                        {isLoading ? (
                            Array(4).fill(0).map((_, index) => (
                                <div/>
                            ))
                        ) : (
                            creations.length > 0 && creations.map((creation) => (
                                <Link
                                    key={creation._id}
                                    to={'/creations/' + creation._id}
                                    className="flex cursor-pointer p-4 rounded-2xl"
                                >
                                    <CreationCard
                                        owner={creation.owner}
                                        title={creation.title}
                                        images={creation.images}
                                        description={creation.description}
                                        rating={creation.rating}
                                        legoFamily={creation.legoFamily}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Creations;
