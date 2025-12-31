import { normal, special } from './types';
import { neuroPlan } from '../../shared/scripts';

export function exerciseList() {
    return neuroPlan(normal, special);
}