import { motion } from "framer-motion";
import Batman from "@/assets/batmanfigure.png";
import HText from "../components/HText";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {setLogin} from "@/state";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

    const notify = ({text}) => {
        toast(`${text}`);

        toast.success(`${text}`, {
            position: "bottom-right"
        });

        toast.error(`${text}`, {
            position: "bottom-right"
        });
    };

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const loggedInResponse = await fetch(
                "http://localhost:3001/api/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({email,password}),
                }
            );
            const loggedIn = await loggedInResponse.json();
            const loggedStatus = loggedInResponse.status;
            if (loggedStatus === 200) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/");
                notify('You have successfully logged in!');
            } else {
                setLoginFailed(true);
                notify('Wrong password or email address!');
            }
        } catch (e) {
            notify('Oops, something went wrong!');
        }
    }

    return (
        <div className="mt-40 grow flex items-center justify-around">
            <div className="mb-64">
                <section id="signin" className="mx-auto w-5/6 pt-24 pb-32">
                    <motion.div>
                        <div className="mt-10 justify-between gap-8 md:flex">
                            <motion.div
                                className="relative mt-16 basis-2/5 md:mt-0"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true, amount: 0.5}}
                                transition={{delay: 0.2, duration: 0.5}}
                                variants={{
                                    hidden: {opacity: 0, y: 50},
                                    visible: {opacity: 1, y: 0},
                                }}
                            >
                                <div
                                    className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext">
                                    <img
                                        className="w-full"
                                        alt="contact-us-page-graphic"
                                        src={Batman}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                className="mt-10 basis-3/5 md:mt-0"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true, amount: 0.5}}
                                transition={{duration: 0.5}}
                                variants={{
                                    hidden: {opacity: 0, y: 50},
                                    visible: {opacity: 1, y: 0},
                                }}
                            >
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
                                        <span className="text-primary-500 text-4xl text-center mb-4">LOGIN</span>
                                    </HText>
                                </motion.div>

                                <form
                                    className="max-w-md mx-auto"
                                    onSubmit={handleLoginSubmit}
                                >
                                    <input
                                        className={inputStyles}
                                        type="email"
                                        placeholder="EMAIL"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />

                                    <input
                                        className={inputStyles}
                                        type="password"
                                        placeholder="PASSWORD"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />

                                    <button
                                        type="submit"
                                        className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                                    >
                                        SIGN IN
                                    </button>

                                    <div className="text-center py-2 text-gray-500">
                                        Don't have an account yet?{" "}
                                        <Link className="underline text-black" to={'/register'}>Register now</Link>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;