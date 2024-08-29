// color design tokens export
export const colorTokens = {
    primary: {
        0: "#FFFFFF",
        1: "#EEEEEE",
        2: "#D9D9D9",
        3: "#E3E3E3",
        4: "#A3A3A3",
        5: "#DD1C13",
        6: "rgba(221, 28, 19, 0.48)",

    },
    secondary: {
        0: "#c5c5c5",
        1: "#ffffff",
        2: "#DEDEDE",
        3: "#a4a4a4",
        4: "#1c1c1c",
        5: "#a40500",
        6: "#000000",
    },
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "light"
                ? {
                    component: {
                        darkMax: colorTokens.primary[6],
                        dark: colorTokens.primary[5],
                        darkMin: colorTokens.primary[4],
                        medium: colorTokens.primary[3],
                        lightMax: colorTokens.primary[2],
                        light: colorTokens.primary[1],
                        lightMin:colorTokens.primary[0],
                    },
                }
                : {
                    component: {
                        darkMax: colorTokens.secondary[6],
                        dark: colorTokens.secondary[5],
                        darkMin: colorTokens.secondary[4],
                        medium: colorTokens.secondary[3],
                        lightMax: colorTokens.secondary[2],
                        light: colorTokens.secondary[1],
                        lightMin:colorTokens.secondary[0],
                    },
                }),
        },
        typography: {
            fontFamily: ["Koulen", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
        },
    };
};