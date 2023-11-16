import Loadable from './components/Loadable.tsx';
import { lazy } from 'react';

export const HomePage = Loadable(lazy(async () => await import('./pages/Home')))
