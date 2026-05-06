import { JwtPayload } from 'jwt-decode';
import { difficulty } from './constants';

export type SessionUser = JwtPayload & {
    id: string;
    email: string;
    name: string;
};

export interface ErrorHandler {
    canHandle(error: unknown): boolean;
    handle(error: unknown): string | null;
}

type Links = {
    leetcode: string;
    gfg: string;
    tuf: string;
    youtube: string;
};

export type Problem = {
    _id: string;
    name: string;
    topic: string;
    topicIndex: number;
    problemNumber: number;
    title: string;
    slug: string;
    difficulty: (typeof difficulty)[number];
    links: Links;
    status: string;
};

export type Sheet = {
    _id: string;
    topicIndex: number;
    problems: Problem[];
};
