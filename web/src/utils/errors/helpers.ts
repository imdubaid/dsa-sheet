type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
    return typeof value === 'object' && value !== null;
}

export function extractErrorMessage(data: unknown, key?: string): string | null {
    if (!data) return null;

    if (typeof data === 'string') return data;

    if (Array.isArray(data)) {
        for (const item of data) {
            const msg = extractErrorMessage(item, key);
            if (msg) return msg;
        }
        return null;
    }

    if (isRecord(data)) {
        if (key) {
            if (!(key in data)) return null;
            return extractErrorMessage(data[key], key);
        }

        for (const recordKey of Object.keys(data)) {
            const msg = extractErrorMessage(data[recordKey]);
            if (msg) return msg;
        }
    }

    return null;
}
