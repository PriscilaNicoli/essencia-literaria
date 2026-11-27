import "./globals.css";
import "./products.css";
import "./footer.css";
import "./details.css";
import "./cart.css";
import "./favorites.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

export const metadata = {
  title: "Essência Literária",
  description: "Livraria e Papelaria Técnica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <FavoritesProvider>
            <Header />
            {children}
            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}