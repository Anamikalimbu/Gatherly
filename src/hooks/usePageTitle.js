import { useEffect } from "react";

function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Gatherly` : "Gatherly | Event Management";
  }, [title]);
}

export default usePageTitle;
