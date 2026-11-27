"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";

import ProductCard from "../../components/ProductCard";
import { buscarProdutos } from "../../lib/produtos";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritosPage() {
  const {
    favoritos,
    carregado,
    limparFavoritos
  } = useFavorites();

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await buscarProdutos();

        if (ativo) {
          setProdutos(dados);
        }
      } catch (error) {
        console.error(error);

        if (ativo) {
          setErro("Não foi possível carregar os favoritos.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, []);

  const produtosFavoritos = produtos.filter((produto) =>
    favoritos.includes(produto.id)
  );

  return (
    <main>
      <section className="favorites-page">
        <Link href="/#catalogo" className="back-link">
          <ArrowLeft size={18} />
          Voltar ao catálogo
        </Link>

        <div className="favorites-heading">
          <div>
            <h1>Meus favoritos</h1>

            <p>
              {!carregado || carregando
                ? "Carregando favoritos..."
                : erro
                  ? "Favoritos indisponíveis"
                  : `${produtosFavoritos.length} produto(s) favorito(s)`}
            </p>
          </div>

          {produtosFavoritos.length > 0 && (
            <button
              type="button"
              className="favorites-clear"
              onClick={limparFavoritos}
            >
              <Trash2 size={17} />
              Limpar favoritos
            </button>
          )}
        </div>

        {!carregado || carregando ? (
          <p>Carregando favoritos...</p>
        ) : erro ? (
          <div className="favorites-empty">
            <Heart size={65} strokeWidth={1.3} />

            <h2>Erro ao carregar favoritos</h2>

            <p>{erro}</p>

            <button
              type="button"
              className="favorites-primary"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        ) : produtosFavoritos.length === 0 ? (
          <div className="favorites-empty">
            <Heart size={65} strokeWidth={1.3} />

            <h2>Nenhum produto favorito</h2>

            <p>
              Salve seus produtos preferidos para encontrá-los
              facilmente depois.
            </p>

            <Link
              href="/#catalogo"
              className="favorites-primary"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {produtosFavoritos.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}