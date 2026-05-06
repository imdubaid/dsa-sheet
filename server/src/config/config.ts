import '@/config/env';
import '@/config/database';
import '@/config/prototype';
import { connectDB } from '@/config/database';

connectDB('lms');
