import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `React App - ${title}`;
    }, [title]);
};

export default useTitle;
