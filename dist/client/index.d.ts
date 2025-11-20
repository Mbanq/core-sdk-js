import { C as Config, a as Command } from '../config.d-io5V_aK4.js';
import 'graphql';
import 'axios';

declare const createClient: (initialConfig: Config) => {
    setConfig: (config: Config) => void;
    updateConfig: (config: Partial<Config>) => void;
    resetConfig: () => void;
    request: <TInput, TOutput>(command: Command<TInput, TOutput>) => Promise<TOutput | undefined>;
    tenant: (tenantId: string) => {
        request: <TInput, TOutput>(command: Command<TInput, TOutput>) => Promise<TOutput | undefined>;
    };
};

export { createClient };
