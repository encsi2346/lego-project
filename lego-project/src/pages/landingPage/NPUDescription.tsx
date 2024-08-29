import { SelectedPage } from "@/types";
import { motion } from "framer-motion";
import HText from "../../components/HText";
import Build from "@/assets/build.png";
import {useNavigate} from "react-router-dom";
import MainButton from "@/components/MainButton";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

const NPUDescription = ({ setSelectedPage }: Props) => {
    const navigate = useNavigate();

    return (
        <section id="npu" className="mx-auto min-h-full w-5/6 py-20 my-20">
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.NPU)}
            >
                <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
                    <img
                        className="w-2/5"
                        alt="creations-page-graphic"
                        src={Build}
                    />

                    <div>
                        <div className="relative">
                            <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    variants={{
                                        hidden: { opacity: 0, x: 50 },
                                        visible: { opacity: 1, x: 0 },
                                    }}
                                >
                                    <HText>
                                        <span className="text-primary-500">Nice</span>
                                        {" "}Part Usage
                                    </HText>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            variants={{
                                hidden: { opacity: 0, x: 50 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >
                            <p className="my-5">
                                LEGO NPU (Nice Part Usage) refers to the creative and often unexpected use of LEGO elements
                                in ways that differ from their original or intended purpose. In the world of LEGO building,
                                NPU is a term of admiration, highlighting the ingenuity of builders who find novel ways
                                to incorporate standard LEGO parts into their models.
                            </p>
                            <p className="mb-5">
                                For example, a part designed as a car bumper might be used as an architectural detail in a building
                                or a minifigure accessory might be repurposed as a machine component in a larger model.
                                NPU showcases the versatility of LEGO pieces and the creativity of the builder in seeing
                                beyond the obvious functions of each part.
                            </p>
                        </motion.div>

                        <div className="relative mt-16">
                            <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                                <MainButton onClick={() => navigate(`/creations/new`)}>
                                    Create Now
                                </MainButton>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default NPUDescription;