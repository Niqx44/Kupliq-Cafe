import NavbarMenuAdmin from "../components/NavbarMenuAdmin";

export default function AuthLayout({ children }) {
  return (
    <div className="bg-white text-black dark:text-white">
      <NavbarMenuAdmin />
      {children}
    </div>
  );
}