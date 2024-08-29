import { Outlet } from 'react-router-dom';
import {Box} from "@mui/material";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useEffect, useState} from "react";
import {SelectedPage} from "@/types";

const Layout = () => {
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
        <div className="app bg-gray-20">
            <Box display="flex">
                <Navbar
                    isTopOfPage={isTopOfPage}
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
                <Box px={2} pt={2} mt={-2} ml={8} width="100%" height="100%">
                    <Outlet />
                </Box>
            </Box>
            <Footer/>
        </div>
    );
};

export default Layout;