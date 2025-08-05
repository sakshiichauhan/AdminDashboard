import * as React from "react"

const MOBILE_BREAKPOINT = 1024;

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}

// import * as React from "react";

// const MOBILE_BREAKPOINT = 768;

// export function useIsMobile() {
//     const [isMobile, setIsMobile] = React.useState(() => {
//         if (typeof window !== "undefined") {
//             return window.innerWidth < MOBILE_BREAKPOINT;
//         }
//         return false; // Default to false during SSR
//     });

//     React.useEffect(() => {
//         if (typeof window === "undefined") return;

//         const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

//         const onChange = (e: MediaQueryListEvent) => {
//             setIsMobile(e.matches);
//         };

//         // Set initial value
//         setIsMobile(mql.matches);

//         // Add listener
//         mql.addEventListener("change", onChange);

//         return () => {
//             mql.removeEventListener("change", onChange);
//         };
//     }, []);

//     return isMobile;
// }
