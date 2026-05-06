import Container, { ContainerProps } from '@mui/material/Container';
import React, { PropsWithChildren } from 'react';

type PageContainerProps = ContainerProps &
    PropsWithChildren & {
        disablePadding?: boolean;
    };

function PageContainer(props: PageContainerProps) {
    const { maxWidth = 'xl', sx, disablePadding = false, ...rest } = props;

    return (
        <Container
            maxWidth={maxWidth || 'lg'}
            sx={{
                position: 'relative',
                mx: 'auto',
                height: '100%',
                pt: disablePadding ? 0 : 16,
                pb: disablePadding ? 0 : 10,
                ...sx,
            }}
            {...rest}>
            {props.children}
        </Container>
    );
}

export default PageContainer;
