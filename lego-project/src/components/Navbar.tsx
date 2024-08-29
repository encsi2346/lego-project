import {useState} from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import ManualLink from "./ManualLink";
import {Link, useLocation} from "react-router-dom";
import { SelectedPage } from "@/types";
import useMediaQuery from "../hooks/useMediaQuery";
import {useNavigate} from "react-router-dom";
import MainButton from "@/components/MainButton";
import {useDispatch, useSelector} from "react-redux";
import {setLogout} from "@/state";

type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
    const isAuth = Boolean(useSelector((state) => state.isAuth));
    const user = useSelector((state) => state.user);

    const handleLogout = async () => {
        try{
            const logoutResponse = await fetch(
                "http://localhost:3001/api/logout",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({}),
                }
            );
            const logout = await logoutResponse.json();
            const logoutStatus = logoutResponse.status;
            if (logoutStatus === 200) {
                dispatch(setLogout());
                console.log('Successfully log out!');
                navigate("/");
            } else {
                console.log('Failed to log out!');
            }
        } catch(error) {
            console.log('Failed to log out!');
        }
    }

    return (
        <nav>
            <div
                className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
            >
                <div className={`${flexBetween} mx-auto w-5/6`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        <Link className="basis-1/6" to={'/'}>
                            <h1 className=" font-montserrat text-2xl font-extrabold">LEGO NPU</h1>
                        </Link>

                        {isAboveMediumScreens ? (
                            <div className={`${flexBetween} w-full`}>
                                <div className={`${flexBetween} gap-8 text-sm`}>
                                    {location.pathname === '/' ? (
                                        <ManualLink
                                            page="Home"
                                            selectedPage={selectedPage}
                                            setSelectedPage={setSelectedPage}
                                        />
                                    ) : (
                                        <Link className="gray-500" to={'/'}>
                                            Home
                                        </Link>
                                    )}
                                    {location.pathname === '/' ? (
                                        <ManualLink
                                            page="NPU"
                                            selectedPage={selectedPage}
                                            setSelectedPage={setSelectedPage}
                                        />
                                    ) : (
                                        <Link className="gray-500" to={'/'}>
                                            NPU
                                        </Link>
                                    )}
                                    {location.pathname === '/' ? (
                                        <ManualLink
                                            page="Creations"
                                            selectedPage={selectedPage}
                                            setSelectedPage={setSelectedPage}
                                        />
                                    ) : (
                                        <Link className="gray-500" to={'/'}>
                                            Creations
                                        </Link>
                                    )}
                                    <Link className="gray-500" to={'/creations/new'}>
                                        Create New
                                    </Link>
                                </div>
                                {isAuth && (
                                    <div className={`${flexBetween} gap-8`}>
                                        <Link className="gray-500" to={'/account'}>{user?.email}</Link>
                                        <MainButton onClick={handleLogout}>
                                            Logout
                                        </MainButton>
                                    </div>
                                )}
                                {!isAuth && (
                                    <div className={`${flexBetween} gap-8`}>
                                        <Link className="gray-500" to={'/login'}>Sign In</Link>
                                        <MainButton onClick={() => navigate(`/register`)}>
                                        Become a Member
                                        </MainButton>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                className="rounded-full bg-secondary-500 p-2"
                                onClick={() => setIsMenuToggled(!isMenuToggled)}
                            >
                                <Bars3Icon className="h-6 w-6 text-white"/>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {!isAboveMediumScreens && isMenuToggled && (
                <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
                    <div className="flex justify-end p-12">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <XMarkIcon className="h-6 w-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="ml-[33%] flex flex-col gap-10 text-2xl">
                        <ManualLink
                            page="Home"
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                        <ManualLink
                            page="NPU"
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                        <ManualLink
                            page="Creations"
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                        <ManualLink
                            page="Create New"
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                        <ManualLink
                            page="Sign In"
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                        <ManualLink
                            page="Sign Up"
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;