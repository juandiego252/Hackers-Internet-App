import React from 'react'

interface Props {
    id: string;
    backgroundColor: string;
    iconName: string;
    label: string;
    screen: string;
}


export const MenuItem = ({id,backgroundColor,iconName,label,screen}:Props) => {
    return (
        <div>MenuItem</div>
    )
}
