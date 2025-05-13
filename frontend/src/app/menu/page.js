import CardProduct from "../components/CardProduct";
export const metadata = {
  title: "Menu - Kupliq Cafe",
  description: "Daftar menu makanan dan minuman Kupliq Cafe",
};

export default function MenuPage() {
  return (
    <main className="bg-white min-h-screen">

      <CardProduct />
    </main>
  );
}
