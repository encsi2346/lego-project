import {Tooltip} from "@material-tailwind/react";

const inputHeader = (text: string) => {
    return (
        <h2 className="font-sans text-3xl mt-4 py-3 pr-1 font-extralight">{text}</h2>
    );
};
const PreInput = ({header, description}) => {
    return (
        <div className="md:flex items-center">
            {inputHeader(header)}

            <Tooltip content={`${description}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
                </svg>
            </Tooltip>
        </div>
    );
};

export default PreInput;