import { StateSchema } from 'app/providers/StoreProvider';
import { CounterScheme } from '../../types/counterScheme';

export const getCounter = (state: StateSchema): CounterScheme => state.counter;
