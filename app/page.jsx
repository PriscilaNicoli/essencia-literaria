"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";

import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import { buscarProdutos } from "../lib/produtos";

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizarISBN(texto) {
  return normalizar(texto).replace(/[\s-]/g, "");
}

function filtrosVazios() {
  return {
    categorias: [],
    formatos: [],
    autor: "",
    isbn: "",
    preco: 500,
    disponibilidade: []
  };
}

function Catalogo({ parametros }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState(
    parametros.get("busca") || ""
  );

  const [ordenacao, setOrdenacao] = useState("relevantes");

  const [filtros, setFiltros] = useState({
    ...filtrosVazios(),

    categorias: parametros.get("categoria")
      ? [parametros.get("categoria")]
      : parametros.get("tipo") === "livros"
        ? ["computacao", "engenharia", "administracao"]
        : [],

    formatos: parametros.get("formato")
      ? [parametros.get("formato")]
      : [],

    disponibilidade: parametros.get("disponibilidade")
      ? [parametros.get("disponibilidade")]
      : []
  });

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
          setErro("Não foi possível carregar os produtos.");
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

  const produtosFiltrados = produtos.flatMap((produto) => {
    const termo = normalizar(busca);

    const correspondeBusca =
      termo === "" ||
      normalizar(produto.titulo).includes(termo) ||
      normalizar(produto.autor).includes(termo);

    const correspondeCategoria =
      filtros.categorias.length === 0 ||
      filtros.categorias.includes(produto.categoria);

    const correspondeAutor =
      normalizar(produto.autor).includes(
        normalizar(filtros.autor)
      );

    const edicoesFiltradas = produto.edicoes.filter((edicao) => {
      const correspondeBuscaISBN =
        normalizarISBN(termo) !== "" &&
        normalizarISBN(edicao.isbn).includes(
          normalizarISBN(termo)
        );

      const correspondeFormato =
        filtros.formatos.length === 0 ||
        filtros.formatos.includes(edicao.formato);

      const correspondeISBN =
        normalizarISBN(edicao.isbn).includes(
          normalizarISBN(filtros.isbn)
        );

      const correspondePreco =
        edicao.preco <= filtros.preco;

      const correspondeDisponibilidade =
        filtros.disponibilidade.length === 0 ||
        filtros.disponibilidade.includes(
          edicao.disponibilidade
        );

      return (
        (correspondeBusca || correspondeBuscaISBN) &&
        correspondeFormato &&
        correspondeISBN &&
        correspondePreco &&
        correspondeDisponibilidade
      );
    });

    if (
      !correspondeCategoria ||
      !correspondeAutor ||
      edicoesFiltradas.length === 0
    ) {
      return [];
    }

    const principal = edicoesFiltradas[0];

    return [{
      ...produto,
      preco: principal.preco,
      isbn: principal.isbn,
      disponibilidade: principal.disponibilidade
    }];
  });

  if (ordenacao === "menor-preco") {
    produtosFiltrados.sort((a, b) => a.preco - b.preco);
  }

  if (ordenacao === "maior-preco") {
    produtosFiltrados.sort((a, b) => b.preco - a.preco);
  }

  function limparFiltros() {
    setFiltros(filtrosVazios());
    setBusca("");
    setOrdenacao("relevantes");
    window.history.replaceState(null, "", "/#catalogo");
  }

  return (
    <section id="catalogo" className="catalog-section">
      <h2>Catálogo de produtos</h2>

      <p>
        {busca
          ? `Resultados para "${busca}"`
          : "Encontre os melhores materiais para seus estudos."}
      </p>

      <div className="catalog-layout">
        <Sidebar
          filtros={filtros}
          onAplicar={setFiltros}
          onLimpar={limparFiltros}
        />

        <div className="catalog-content">
          <div className="catalog-toolbar">
            <span>
              {carregando
                ? "Carregando produtos..."
                : erro
                  ? "Catálogo indisponível"
                  : `${produtosFiltrados.length} ${
                      produtosFiltrados.length === 1
                        ? "produto encontrado"
                        : "produtos encontrados"
                    }`}
            </span>

            <select
              aria-label="Ordenar produtos"
              value={ordenacao}
              onChange={(event) =>
                setOrdenacao(event.target.value)
              }
            >
              <option value="relevantes">
                Mais relevantes
              </option>

              <option value="menor-preco">
                Menor preço
              </option>

              <option value="maior-preco">
                Maior preço
              </option>
            </select>
          </div>

          {carregando ? (
            <div className="empty-results">
              <h3>Carregando produtos...</h3>
              <p>Aguarde enquanto consultamos o catálogo.</p>
            </div>
          ) : erro ? (
            <div className="empty-results">
              <SearchX size={48} strokeWidth={1.5} />
              <h3>Erro ao carregar o catálogo</h3>
              <p>{erro}</p>
            </div>
          ) : produtosFiltrados.length > 0 ? (
            <div className="product-grid">
              {produtosFiltrados.map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <SearchX size={48} strokeWidth={1.5} />

              <h3>Nenhum produto encontrado</h3>

              <p>
                Tente alterar os termos da pesquisa
                ou limpar os filtros.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CatalogoComParametros() {
  const parametros = useSearchParams();

  return (
    <Catalogo
      key={parametros.toString()}
      parametros={parametros}
    />
  );
}

export default function Home() {
  return (
    <main>
      <Banner />

      <Suspense fallback={<p>Carregando catálogo...</p>}>
        <CatalogoComParametros />
      </Suspense>
    </main>
  );
}