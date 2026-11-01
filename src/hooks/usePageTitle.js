import { useEffect } from "react";
import resume from "../data/resume.json";

const SITE_TITLE = `${resume.basics.name} | ${resume.basics.headline}`;

const usePageTitle = (page) => {
  useEffect(() => {
    document.title = page ? `${page} | ${resume.basics.name}` : SITE_TITLE;
  }, [page]);
};

export default usePageTitle;
