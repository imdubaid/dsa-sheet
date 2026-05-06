type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === 'object' && value !== null;
}

export function extractErrorMessage(data: unknown): string | null {
    if (!data) return null;

    if (typeof data === 'string') return data;

    if (Array.isArray(data)) {
        for (const item of data) {
            const msg = extractErrorMessage(item);
            if (msg) return msg;
        }
        return null;
    }

    if (isRecord(data)) {
        for (const key of Object.keys(data)) {
            const msg = extractErrorMessage(data[key]);
            if (msg) return msg;
        }
    }

    return null;
}
