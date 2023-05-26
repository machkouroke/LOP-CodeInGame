export {};

declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.
     */
    interface RoutesType {
        name: string;
        layout: string;
        component: () => JSX.Element;
        icon: JSX.Element | string;
        path: string;
        secondary?: boolean;
    }

    interface Competition {
        name: string;
        author: string;
        bidders: string[];
        image: any,
        timeLeft: string;
        postDate?: Date;
    }
}
