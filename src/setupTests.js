import "@testing-library/jest-dom";

// jsdom doesn't implement scrolling; ScrollToTop calls it on every route change.
window.scrollTo = () => {};
