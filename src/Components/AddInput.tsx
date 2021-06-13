import React, { ChangeEvent, FunctionComponent } from "react";
import { Button } from "./Button";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    ClearAlternativesClick: any;
    // ClearAlternativesClick: React.MouseEventHandler<HTMLButtonElement>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const AddInput: FunctionComponent<Props> = ({
    onClick,
    inputValue,
    setInputValue,
    ClearAlternativesClick,
}) => {
    // const handleClick = () => {};

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="bg-gray-400 flex justify-between px-4 py-2 ">
            <input
                className="bg-white px-4 py-2 m-2 rounded-lg w-1/3"
                value={inputValue}
                onChange={handleChange}
            />
            {/* <input type="button" onClick={onClick} className="" value="Dodaj alternativo"/> */}
            <Button onClick={onClick} text="Dodaj alternativo" className="m-2 w-1/3" />
            <Button
                onClick={ClearAlternativesClick}
                text="Počisti alternative"
                className="ml-4 m-2 justify-self-end w-1/3"
            />
        </div>
    );
};
