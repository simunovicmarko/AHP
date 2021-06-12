import React, { FunctionComponent } from 'react'
import { Parameter } from '../Classes/Parameter'

interface Props {
    params: Parameter[];
}

export const ParameterTable:FunctionComponent<Props> = ({params}) => {

    const drawParamters = () => {
        params.map((el:Parameter)=>{
            
        })
    }

    return (
        <div>
            
        </div>
    )
}
