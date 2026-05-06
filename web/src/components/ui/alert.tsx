import React, { useMemo } from 'react';
import { Alert as MuiAlert, AlertColor, AlertProps as MuiAlertProps } from '@mui/material';

type AlertResult = {
    severity: AlertColor;
    value: string;
};

type AlertProps = MuiAlertProps & {
    alerts: Partial<Record<AlertColor, string>>;
};

const getSeverity = (alerts: AlertProps['alerts']): AlertResult => {
    const entry = (Object.keys(alerts) as AlertColor[]).map(key => [key, alerts[key]] as const).find(([, value]) => Boolean(value));

    if (!entry) {
        return { severity: 'error', value: '' };
    }

    const [severity, value] = entry;
    return { severity, value: value! };
};

function Alert({ alerts, ...props }: AlertProps) {
    const { severity, value } = useMemo(() => getSeverity(alerts), [alerts]);

    // Don't render if there's no value to display
    if (!value) {
        return null;
    }

    return (
        <MuiAlert severity={severity} {...props} suppressHydrationWarning>
            {value}
        </MuiAlert>
    );
}

export default Alert;
