"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

import {
  BookOpen,
  Heart,
  ShoppingCart,
  CalendarClock,
  CheckCircle,
  ArrowLeft,
  Monitor
} from "lucide-react";

export default function ProductDetails({ produto }) {
  const router = useRouter();

  const {
    adicionarProduto,
    carregado
  } = useCart();

  const {
    ehFavorito,
    alternarFavorito,
    carregado: favoritosCarregados
  } = useFavorites();

  const [formato, setFormato] = useState(
    produto.edicoes[0].formato
  );

  const favorito = ehFavorito(produto.id);

  const [erroImagem, setErroImagem] = useState(false);

  const categorias = {
    computacao: "Computação",
    engenharia: "Engenharia",
    administracao: "Administração",
    papelaria: "Papelaria"
  };

  const edicao = produto.edicoes.find(
    (item) => item.formato === formato
  );

  const preVenda = edicao.disponibilidade === "pre-venda";

  const preco = edicao.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  function adicionarAoCarrinho() {
    adicionarProduto(produto, edicao);
    router.push("/carrinho");
  }

  return (
    <section className="details-page">
      <Link href="/#catalogo" className="back-link">
        <ArrowLeft size={18} />
        Voltar ao catálogo
      </Link>

      <div className="breadcrumb">
        <Link href="/">Início</Link>
        <span>/</span>
        <span>{categorias[produto.categoria]}</span>
        <span>/</span>
        <span>{produto.titulo}</span>
      </div>

      <div className="details-container">
        <div className="details-image">
          {preVenda && (
            <span className="presale-tag">
              Pré-venda
            </span>
          )}

          {erroImagem ? (
            <div className="details-placeholder">
              <BookOpen size={85} strokeWidth={1.2} />
              <span>{produto.titulo}</span>
            </div>
          ) : (
            <img
              src={produto.imagem}
              alt={produto.titulo}
              onError={() => setErroImagem(true)}
            />
          )}
        </div>

        <div className="details-info">
          <span className="product-category">
            {categorias[produto.categoria]}
          </span>

          <h1>{produto.titulo}</h1>

          <p className="details-author">
            {produto.autor || "Material de papelaria"}
          </p>

          <div className="details-editions">
            <h3>Selecione o formato</h3>

            <div className="edition-options">
              {produto.edicoes.map((item) => (
                <button
                  key={item.formato}
                  type="button"
                  className={`edition-button ${
                    formato === item.formato ? "selected" : ""
                  }`}
                  aria-pressed={formato === item.formato}
                  onClick={() => setFormato(item.formato)}
                >
                  {item.formato === "fisico" ? (
                    <BookOpen size={20} />
                  ) : (
                    <Monitor size={20} />
                  )}

                  {item.formato === "fisico"
                    ? "Físico"
                    : "Digital"}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`details-availability ${
              preVenda ? "presale" : ""
            }`}
          >
            {preVenda ? (
              <CalendarClock size={18} />
            ) : (
              <CheckCircle size={18} />
            )}

            {preVenda
              ? "Disponível para pré-venda"
              : formato === "digital"
                ? "Disponível em formato digital"
                : "Disponível em estoque"}
          </div>

          <strong className="details-price">
            {preco}
          </strong>

          {preVenda && (
            <p className="presale-message">
              Reserve esta edição antecipadamente.
              A disponibilização ocorrerá após o lançamento.
            </p>
          )}

          <div className="details-actions">
            <button
              type="button"
              className="details-buy-button"
              disabled={!carregado}
              onClick={adicionarAoCarrinho}
            >
              {preVenda ? (
                <CalendarClock size={20} />
              ) : (
                <ShoppingCart size={20} />
              )}

              {preVenda
                ? "Reservar pré-venda"
                : "Adicionar ao carrinho"}
            </button>

            <button
              type="button"
              className={`details-favorite-button ${
                favorito ? "selected" : ""
              }`}
              disabled={!favoritosCarregados}
              aria-pressed={favorito}
              onClick={() => alternarFavorito(produto.id)}
            >
              <Heart
                size={20}
                fill={favorito ? "currentColor" : "none"}
              />

              {favorito
                ? "Remover dos favoritos"
                : "Adicionar aos favoritos"}
            </button>
          </div>
        </div>
      </div>

      <div className="details-description">
        <h2>Descrição do produto</h2>
        <p>{produto.descricao}</p>
      </div>

      <div className="details-specifications">
        <h2>Informações técnicas</h2>

        <table>
          <tbody>
            <tr>
              <th>Produto</th>
              <td>{produto.titulo}</td>
            </tr>

            {produto.autor && (
              <tr>
                <th>Autor</th>
                <td>{produto.autor}</td>
              </tr>
            )}

            <tr>
              <th>Categoria</th>
              <td>{categorias[produto.categoria]}</td>
            </tr>

            <tr>
              <th>Formato</th>
              <td>
                {formato === "fisico" ? "Físico" : "Digital"}
              </td>
            </tr>

            {produto.categoria !== "papelaria" && (
              <tr>
                <th>ISBN</th>
                <td>{edicao.isbn || "A cadastrar"}</td>
              </tr>
            )}

            <tr>
              <th>Disponibilidade</th>
              <td>
                {preVenda
                  ? "Pré-venda"
                  : "Disponível"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}