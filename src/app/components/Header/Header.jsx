import MainNavbar from "./MainNavbar";
import UpperNavbar from "./UpperNavbar";
import NewsTicker from "./NewsTicker";
import "@/styles/header.scss";

export default function Header() {
  return (
    <header className="header">
      <UpperNavbar />
      <NewsTicker />
      <MainNavbar />
    </header>
  );
}
