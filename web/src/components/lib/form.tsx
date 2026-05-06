import { Stack, StackProps } from '@mui/material';
import React, { FC, ReactNode, FormEvent } from 'react';

interface FormProps extends StackProps {
    children: ReactNode;
    onSubmit?: () => void;
}

const Form: FC<FormProps> = props => {
    const { children, onSubmit, ...rest } = props;

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSubmit) onSubmit();
    };

    return (
        <Stack component='form' onSubmit={submit} {...rest}>
            {children}
        </Stack>
    );
};

export default Form;
