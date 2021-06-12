import React, { FunctionComponent } from "react";

interface Props {
    className?: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const RemoveTreeNode: FunctionComponent<Props> = ({
    className,
    onClick,
}) => {
    return (
        <div
            className="bg-gray-400 p-0 pb-1 w-5 h-5 flex justify-center items-center text-white opacity-0 hover:opacity-100 cursor-pointer font-bold"
            onClick={onClick}>
            -
        </div>
    );
};
