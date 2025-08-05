import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
    const location = useLocation();
    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="flex items-center justify-center w-full mt-50">
            <div className="flex flex-col justify-center items-center text-center p-8 w-full">
                <h1 className="text-9xl font-bold text-gray-800 mb-6">🚧</h1>
                <p className="text-2xl text-gray-600 mb-8">Page Under Development</p>
                <p className="text-gray-500 mb-8 w-full max-w-2xl">
                    We're working hard to bring you this feature. Please check back soon!
                </p>
                <a 
                    href="/" 
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 w-full max-w-xs"
                >
                    Return to Home
                </a>
            </div>
        </div>
    );
};
