import { Outlet } from "react-router-dom";
import { GoBackArrow } from "./GoBackArrow";
import { Footer } from "@/views/sharedComponents/Footer";

/**
 * A reusable page layout component.
 *
 * Renders an optional header with a back button, the current route content,
 * and an optional footer. The main content automatically adds bottom padding
 * when the footer is displayed to prevent it from overlapping the page content.
 *
 * @param props.showHeader Whether to display the header with the back button. Defaults to `true`.
 * @param props.showFooter Whether to display the footer. Defaults to `true`.
 * @returns The page layout containing the current route content.
 */
export const ViewLayout = ({
  showHeader = true,
  showFooter = true,
}: {
  showHeader?: boolean;
  showFooter?: boolean;
}) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {showHeader && (
        <header className="flex items-center gap-2 h-14 px-2 shrink-0">
          <GoBackArrow />
        </header>
      )}

      <main
        className={`flex-1 flex flex-col px-4 ${showFooter ? "pb-19" : ""}`}
      >
        <Outlet />
      </main>

      {showFooter && <Footer />}
    </div>
  );
};
