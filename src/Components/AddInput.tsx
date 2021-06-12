import React, { ChangeEvent, FunctionComponent } from "react";
import { Button } from "./Button";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const AddInput: FunctionComponent<Props> = ({
    onClick,
    inputValue,
    setInputValue,
}) => {
    // const handleClick = () => {};

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="bg-gray-400">
            <input
                className="bg-white px-4 py-2 m-2 rounded-lg"
                value={inputValue}
                onChange={handleChange}
            />
            {/* <input type="button" onClick={onClick} className="" value="Dodaj alternativo"/> */}
        	<Button onClick={onClick} text="Dodaj alternativo"/>
        </div>
    );
};
