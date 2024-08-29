// eslint-disable-next-line import/named
import { StringMap, TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

import type translations from '../../public/locales/hu/translation.json';
import { Paths } from '@/utils/util-types';

export type TranslationKeys = Paths<typeof translations>;

export const useTypeSafeTranslation = () => {
    const { t, i18n } = useTranslation();

    return {
        t: (s: TranslationKeys, options?: string | TOptions<StringMap> | undefined) => t(s, options),
        i18n,
    };
};
