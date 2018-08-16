import React, { ReactChild } from 'react';

interface Props {
    children: ReactChild;
}

const DefaultTemplate: React.SFC<Props> = ({ children }: Props) => {
    return <div className="DefaultTemplate">{children}</div>;
};

export default DefaultTemplate;
