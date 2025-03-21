import type { LucideIcon } from 'lucide-vue-next';
import { RouteLocation } from 'vue-router';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItemBase {
    title: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export type RouteTo = string | RouteLocation;
export interface NavItemWithTo extends NavItemBase {
    to: RouteTo;
    href?: never;
}

export interface NavItemWithHref extends NavItemBase {
    to?: never;
    href: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    emailVerifiedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export type BreadcrumbItemType = BreadcrumbItem;
