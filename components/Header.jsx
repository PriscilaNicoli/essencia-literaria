"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import usuario from "../data/usuario";

import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  House,
  BookOpen,
  Pencil,
  Monitor,
  CalendarClock
} from "lucide-react";

const menu = [
  {
    nome: "Início",
    href: "/",
    icone: House
  },
  {
    nome: "Livros técnicos",
    href: "/?tipo=livros#catalogo",
    icone: BookOpen,
    parametro: "tipo",
    valor: "livros"
  },
  {
    nome: "Papelaria",
    href: "/?categoria=papelaria#catalogo",
    icone: Pencil,
    parametro: "categoria",
    valor: "papelaria"
  },
  {
    nome: "Digitais",
    href: "/?formato=digital#catalogo",
    icone: Monitor,
    parametro: "formato",
    valor: "digital"
  },
  {
    nome: "Pré-venda",
    href: "/?disponibilidade=pre-venda#catalogo",
    icone: CalendarClock,
    parametro: "disponibilidade",
    valor: "pre-venda"
  }
];

function MenuNavegacao({ ativo }) {
  return (
    <nav className="navigation" aria-label="Menu principal">
      {menu.map((item) => {
        const Icone = item.icone;
        const selecionado = ativo === item.nome;

        return (
          <Link
            key={item.nome}
            href={item.href}
            className={selecionado ? "active" : ""}
            aria-current={selecionado ? "page" : undefined}
          >
            <Icone size={18} strokeWidth={1.8} />
            <span>{item.nome}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let ativo = null;

  if (pathname === "/") {
    const categoria = menu.find(
      (item) =>
        item.parametro &&
        searchParams.get(item.parametro) === item.valor
    );

    ativo = categoria?.nome ||
      (searchParams.toString() === "" ? "Início" : null);
  }

  return <MenuNavegacao ativo={ativo} />;
}

export default function Header() {
  const { totalItens } = useCart();
  const { totalFavoritos } = useFavorites();

  return (
    <header className="header">
      <div className="header-container">
        <Link
          href="/"
          className="logo"
          aria-label="Essência Literária - Início"
        >
          <img
            src="/images/logo.png"
            alt="Essência Literária - Livraria Online"
            className="logo-image"
          />
        </Link>

        <form
          action="/#catalogo"
          method="get"
          className="search-bar"
        >
          <input
            type="search"
            name="busca"
            placeholder="Buscar por título, ISBN ou autor"
            aria-label="Pesquisar produtos"
          />

          <button type="submit" aria-label="Pesquisar">
            <Search size={21} />
          </button>
        </form>

        <div className="header-actions">
          <Link
            href="/favoritos"
            className="favorites-header-link"
            aria-label={`${totalFavoritos} produtos favoritos`}
          >
            <Heart size={23} />

            {totalFavoritos > 0 && (
              <span className="favorites-count">
                {totalFavoritos}
              </span>
            )}
          </Link>

          <Link
            href="/carrinho"
            className="cart-header-link"
            aria-label={`Carrinho com ${totalItens} itens`}
          >
            <ShoppingCart size={23} />

            {totalItens > 0 && (
              <span className="cart-count">
                {totalItens}
              </span>
            )}
          </Link>

          <div
            className="user-profile"
            title={usuario.nome}
          >
            <div className="user-avatar">
              <UserRound size={22} strokeWidth={1.7} />
            </div>

            <div className="user-info">
              <span>
                Olá, {usuario.nome.split(" ")[0].toLowerCase()}
              </span>
              <strong>Minha conta</strong>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<MenuNavegacao ativo={null} />}>
        <Navigation />
      </Suspense>
    </header>
  );
}