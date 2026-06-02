/**
 * Central export file for all hooks
 * Simplifies imports: import { useNavigation, useScrollSpy, useFiltering } from '@/lib/hooks'
 */

export { useNavigation } from './useNavigation';
export type { NavItem } from './useNavigation';

export { useScrollSpy, isNavItemActive } from './useScrollSpy';

export { useFiltering } from './useFiltering';
export type { UseFilteringResult } from './useFiltering';
