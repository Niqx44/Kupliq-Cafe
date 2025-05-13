import NavbarMenu from "../components/NavbarMenu";

export default function AuthLayout({ children }) {
  return (
    <div className="bg-white text-black dark:text-white">
      <NavbarMenu />
      {children}
    </div>
  );
}