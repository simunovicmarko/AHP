import React, { FunctionComponent } from "react";

interface Props {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: FunctionComponent<Props> = ({ text, onClick }) => {
    return (
        <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded justify-self-end"
            onClick={onClick}>
            {text}
        </button>
    );
};
