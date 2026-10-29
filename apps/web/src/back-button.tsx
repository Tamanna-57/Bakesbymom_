import { canGoBack, navigate, parentPath } from './router';

/** Pages that start a visit and have nothing to go back to: the home page and the Instagram bio page. */
const NO_BACK = new Set(['/', '/links']);

export const hasBackButton = (path: string) => !NO_BACK.has(path);

/**
 * A "Back" pill in the bottom-left corner, opposite the Ask Mom launcher. It returns to the previous page of
 * the site; a visitor who landed here from outside (a shared link, Instagram) goes one level up instead.
 */
export function BackButton({ path }: { path: string }) {
  const goBack = () => {
    if (canGoBack()) window.history.back();
    else navigate(parentPath(path), { replace: true });
  };

  return (
    <button type="button" className="site-back" onClick={goBack}>
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <path
          d="M16 10H4.5M9.5 4.5 4 10l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </button>
  );
}
