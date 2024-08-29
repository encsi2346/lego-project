import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import HText from "@/components/HText";
import CreationCard from "@/components/CreationCard";
import {CreationType} from "@/types";
import { useTranslation } from "react-i18next";
import {FormControl, IconButton, MenuItem, Select, SelectChangeEvent, useTheme} from "@mui/material";
import {setMode} from "@/state";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [creations, setCreations] = useState<CreationType[]>([]);
    const user = useSelector((state) => state.user);
    const [t, i18n] = useTranslation();

    const theme = useTheme();

    const [languageValue, setLanguageValue] = useState(null);

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguageValue(event.target.value as string);
    }

    useEffect(() => {
        if (languageValue === null) {
            const language = localStorage.getItem('language');
            if (language) {
                setLanguageValue(language);
            }
        }
    }, []);

    //TODO
    /*useEffect(() => {
        if (languageValue === null) return;
        localStorage.setItem('language', languageValue);
        i18n.changeLanguage(languageValue)
            .then(() => {
                console.log('Language changed');
            })
            .catch((error) => {
                console.log(error);
            });
    }, [languageValue]);*/

    useEffect(() => {
        axios.get('/user-creations')
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
        <div className="grid justify-center min-h-screen gap-20 md:mt-60 ml-12">
            <div className="text-center mb-30">
                <HText>
                    {user.email}
                </HText>
            </div>

            <div>
                <div className="block ml-5">
                    <div className="flex justify-start items-start">
                        <HText> {t('TEXT.SELECT_MODE')}</HText>
                        <IconButton onClick={() => dispatch(setMode())} data-testid='mode-selector'>
                            {theme.palette.mode === "dark" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                                </svg>

                            )}
                        </IconButton>
                    </div>

                    <div className="flex justify-start items-start min-w-[120px]">
                        <HText>{t('TEXT.SELECT_LANGUAGE')}</HText>
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                data-testid='select-language-input'
                                value={languageValue}
                                onChange={handleChangeLanguage}
                                sx={{color: '#000000', border: 'none', backgroundColor: '#ffffff'}}
                            >
                                <MenuItem value={'hu'}>Hu</MenuItem>
                                <MenuItem value={'en'}>En</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default ProfilePage;