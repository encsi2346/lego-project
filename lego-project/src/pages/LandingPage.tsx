import {useEffect, useState} from 'react';
import Home from "@/pages/landingPage/Home";
import NPUDescription from "@/pages/landingPage/NPUDescription";
import Creations from "@/pages/landingPage/Creations";
import {SelectedPage} from "@/types";
import ContactUs from "@/pages/landingPage/ContactUs";

const LandingPage = () => {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
    const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTopOfPage(true);
                setSelectedPage(SelectedPage.Home);
            }
            if (window.scrollY !== 0) setIsTopOfPage(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div>
            <Home setSelectedPage={setSelectedPage}/>
            <NPUDescription setSelectedPage={setSelectedPage}/>
            <Creations setSelectedPage={setSelectedPage}/>
            <ContactUs setSelectedPage={setSelectedPage}/>
        </div>
    );
};

export default LandingPage;