import { Outlet } from "react-router-dom";
import { GoBackArrow } from "./GoBackArrow";
import { Footer } from "@/views/sharedComponents/Footer";

export const ViewLayout = ({
  showHeader = true,
  showFooter = true,
}: {
  showHeader?: boolean;
  showFooter?: boolean;
}) => {
  return (
    <div className="relative min-h-screen">
      {showHeader && (
        <header className="flex items-center gap-2 h-14 px-2">
          <GoBackArrow />
        </header>
      )}

      <main className={showFooter ? "px-4 pb-24" : "px-4"}>
        <Outlet />
      </main>

      {showFooter && <Footer />}
    </div>
  );
};
