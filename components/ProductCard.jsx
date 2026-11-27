"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Heart, ArrowRight } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ produto }) {
  const { ehFavorito, alternarFavorito, carregado } = useFavorites();

  const favorito = ehFavorito(produto.id);
  const [erroImagem, setErroImagem] = useState(false);

  const categorias = {
    computacao: "Computação",
    engenharia: "Engenharia",
    administracao: "Administração",
    papelaria: "Papelaria"
  };

  const preco = produto.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <article className="product-card">
      <div className="product-image">
        {produto.disponibilidade === "pre-venda" && (
          <span className="presale-tag">
            Pré-venda
          </span>
        )}

        <button
          type="button"
          className={`favorite-button ${
            favorito ? "active" : ""
          }`}
          disabled={!carregado}
          onClick={() => alternarFavorito(produto.id)}
          aria-label={
            favorito
              ? "Remover favorito"
              : "Adicionar favorito"
          }
          aria-pressed={favorito}
        >
          <Heart
            size={20}
            fill={favorito ? "currentColor" : "none"}
          />
        </button>

        {erroImagem ? (
          <div className="image-placeholder">
            <BookOpen size={55} strokeWidth={1.2} />
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

      <div className="product-info">
        <span className="product-category">
          {categorias[produto.categoria]}
        </span>

        <h3>{produto.titulo}</h3>

        <p className="product-author">
          {produto.autor || "Material de papelaria"}
        </p>

        <div className="product-formats">
          {produto.formatos.map((formato) => (
            <span key={formato}>
              {formato === "fisico" ? "Físico" : "Digital"}
            </span>
          ))}
        </div>

        <strong className="product-price">
          {preco}
        </strong>

        <Link
          href={`/produto/${produto.id}`}
          className="product-button"
        >
          {produto.disponibilidade === "pre-venda"
            ? "Reservar"
            : "Ver detalhes"}

          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}