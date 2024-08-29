import {Locale, setDefaultOptions} from 'date-fns';
import * as dateFnsLocales from 'date-fns/locale';
import { useEffect, useState } from 'react';
import {useTypeSafeTranslation} from "@/hooks/useTypeSafeTranslation";

const useLocaleLoader = () => {
    const { i18n } = useTypeSafeTranslation();
    const [locale, setLocale] = useState(dateFnsLocales.enGB);

    useEffect(() => {
        const setLocaleNamespace = () => {
            const language = i18n.language.replace('-', '');

            const localeToSet: Locale =
                dateFnsLocales[language as keyof typeof dateFnsLocales] ??
                dateFnsLocales[language.substring(0, 2) as keyof typeof dateFnsLocales];

            if (localeToSet) {
                setLocale(localeToSet);
                setDefaultOptions({
                    locale: localeToSet,
                });
            }
        };

        if (i18n.language && i18n.language !== locale.code) {
            setLocaleNamespace();
        }
    }, [i18n.language, locale.code]);

    return locale;
};

export default useLocaleLoader;
