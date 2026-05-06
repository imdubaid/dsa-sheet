import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

interface ImageProps extends BoxProps {
    name?: string;
    src?: string;
    sx?: React.CSSProperties;
    [key: string]: unknown;
}

function Image(props: ImageProps) {
    const { name, src, sx, ...rest } = props;

    const getSrc = () => {
        if (name) return `/images/${name}`;

        return src;
    };

    return <Box component='img' src={getSrc()} alt='image' draggable='false' sx={{ maxWidth: '100%', ...sx }} {...rest} />;
}

export default Image;
