import { C as Config, a as Command } from '../config.d-NcOIimSJ.mjs';
import 'graphql';
import 'axios';

declare const createClient: (initialConfig: Config) => {
    setConfig: (config: Config) => void;
    updateConfig: (config: Partial<Config>) => void;
    resetConfig: () => void;
    request: <TOutput>(command: Command<any, TOutput>) => Promise<TOutput | undefined>;
};

export { createClient };
