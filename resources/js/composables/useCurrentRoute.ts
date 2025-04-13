import { NavItemWithTo } from "@/types";
import { useRoute } from "vue-router";

export const isActiveRoute = (item: NavItemWithTo) => {
    const route = useRoute();

    if (typeof item.to === 'string') {
        return route.path === item.to;
    }

    const match = item.to.path ? 'path' : 'name';

    return route[match] === item.to[match];
};
