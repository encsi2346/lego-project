import { motion } from "framer-motion";
import Genie from "@/assets/genie.png";
import HText from "../components/HText";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

    const registerUser = async (e: any) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/register', {
                name,
                email,
                password,
            });
            const registerStatus = data.status;
            if(registerStatus === 200) {
                navigate("/login");
            }
        } catch (e) {
            alert('Registration failed. Please try again later');
        }
    }
    return (
        <div className="mt-40 grow flex items-center justify-around">
            <div className="mb-64">
                <section id="signup" className="mx-auto w-5/6 pt-24 pb-32">
                    <motion.div>
                        <motion.div
                            className="md:w-3/5"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.5}}
                            transition={{duration: 0.5}}
                            variants={{
                                hidden: {opacity: 0, x: -50},
                                visible: {opacity: 1, x: 0},
                            }}
                        >
                            <HText>
                                <span className="text-primary-500">JOIN NOW</span> TO CREATE SOMETHING AMAZING
                            </HText>
                        </motion.div>

                        <div className="mt-10 justify-between gap-8 md:flex">
                            <motion.div
                                className="mt-10 basis-3/5 md:mt-0"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <form
                                    onSubmit={registerUser}
                                    className="max-w-md mx-auto"
                                >
                                    <input
                                        className={inputStyles}
                                        type="text"
                                        placeholder="NAME"
                                        value={name}
                                        onChange={ev => setName(ev.target.value)}
                                    />

                                    <input
                                        className={inputStyles}
                                        type="email"
                                        placeholder="EMAIL"
                                        value={email}
                                        onChange={ev => setEmail(ev.target.value)}
                                    />

                                    <input
                                        className={inputStyles}
                                        type="password"
                                        placeholder="PASSWORD"
                                        value={password}
                                        onChange={ev => setPassword(ev.target.value)}
                                    />

                                    <button
                                        type="submit"
                                        className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                                    >
                                        SIGN UP
                                    </button>

                                    <div className="text-center py-2 text-gray-500">
                                        Already a member?{" "}
                                        <Link className="underline text-black" to={'/login'}>Login</Link>
                                    </div>
                                </form>
                            </motion.div>

                            <motion.div
                                className="relative mt-16 basis-2/5 md:mt-0"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <div className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext">
                                    <img
                                        className="w-full"
                                        alt="contact-us-page-graphic"
                                        src={Genie}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default RegisterPage;