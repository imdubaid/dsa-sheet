import { IUser } from '@/schema/user';
import { TransformType } from '@/types/types';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const requestHandler = (fn: AsyncHandler): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const signToken = (user: IUser) =>
    jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET!, { expiresIn: '30d' });

const SPACES_REGEX = /\s+/g;
const WORD_BOUNDARY_REGEX = /\b\w/g;
const SPECIAL_CHARS_REGEX = /[&\/\\#,+()$~%.'":*?<>{}]/g;

export const textTransform = (text: string, transform: TransformType, preserveChar: boolean = false): string => {
    if (!text || text.length === 0) return '';

    const firstChar = text[0];
    const rest = text.slice(1);

    const processedText = !preserveChar
        ? text.replace(SPECIAL_CHARS_REGEX, ' ') // Replace special chars with space
        : text;

    switch (transform) {
        case 'capitalize':
            return firstChar.toUpperCase() + rest.toLowerCase();

        case 'titlecase':
            return text.replace(WORD_BOUNDARY_REGEX, c => c.toUpperCase());

        case 'camelcase': {
            if (preserveChar) {
                return firstChar.toLowerCase() + rest;
            }
            // Convert to proper camelCase by removing special chars
            const camelized = processedText
                .toLowerCase()
                .trim()
                .replace(/\s+([a-z])/g, (_, char) => char.toUpperCase())
                .replace(/\s+/g, '');
            return camelized;
        }

        case 'pascalcase': {
            if (preserveChar) {
                return firstChar.toUpperCase() + rest;
            }

            // Convert to proper PascalCase by removing special chars
            const pascalized = processedText
                .toLowerCase()
                .trim()
                .replace(/\s+([a-z])/g, (_, char) => char.toUpperCase())
                .replace(/\s+/g, '');
            return pascalized.charAt(0).toUpperCase() + pascalized.slice(1);
        }

        case 'snakecase': {
            const textToProcess = processedText.trim().toLowerCase();
            if (preserveChar) return textToProcess.replace(SPACES_REGEX, '_');

            return textToProcess.replace(SPECIAL_CHARS_REGEX, '_').replace(SPACES_REGEX, '_');
        }

        case 'kebabcase': {
            const textToProcess = processedText.trim().toLowerCase();
            if (preserveChar) return textToProcess.replace(SPACES_REGEX, '-');

            return textToProcess.replace(SPECIAL_CHARS_REGEX, '-').replace(SPACES_REGEX, '-');
        }

        default:
            return text;
    }
};
