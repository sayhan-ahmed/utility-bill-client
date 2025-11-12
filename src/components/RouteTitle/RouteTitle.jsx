import { useEffect } from "react";
import { useLocation } from "react-router";

function RouteTitle({ title, children }) {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} – BillEase`;
  }, [title, location]);

  return <>{children}</>;
}

export default RouteTitle;
