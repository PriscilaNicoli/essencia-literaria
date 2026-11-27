"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function Sidebar({
  filtros,
  onAplicar,
  onLimpar
}) {
  const [selecionados, setSelecionados] = useState(filtros);

  function alterarCheckbox(campo, valor) {
    setSelecionados((anterior) => {
      const valores = anterior[campo];

      return {
        ...anterior,
        [campo]: valores.includes(valor)
          ? valores.filter((item) => item !== valor)
          : [...valores, valor]
      };
    });
  }

  function alterarCampo(campo, valor) {
    setSelecionados((anterior) => ({
      ...anterior,
      [campo]: valor
    }));
  }

  function aplicarFiltros(event) {
    event.preventDefault();
    onAplicar(selecionados);
  }

  function limparFiltros() {
    const vazios = {
      categorias: [],
      formatos: [],
      autor: "",
      isbn: "",
      preco: 500,
      disponibilidade: []
    };

    setSelecionados(vazios);
    onLimpar();
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <SlidersHorizontal size={20} />
        <h3>Filtros</h3>
      </div>

      <form onSubmit={aplicarFiltros}>
        <div className="filter-group">
          <h4>Categorias</h4>

          {[
            ["computacao", "Computação"],
            ["engenharia", "Engenharia"],
            ["administracao", "Administração"],
            ["papelaria", "Papelaria"]
          ].map(([valor, nome]) => (
            <label key={valor}>
              <input
                type="checkbox"
                checked={selecionados.categorias.includes(valor)}
                onChange={() =>
                  alterarCheckbox("categorias", valor)
                }
              />
              {nome}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Formato</h4>

          {[
            ["fisico", "Físico"],
            ["digital", "Digital"]
          ].map(([valor, nome]) => (
            <label key={valor}>
              <input
                type="checkbox"
                checked={selecionados.formatos.includes(valor)}
                onChange={() =>
                  alterarCheckbox("formatos", valor)
                }
              />
              {nome}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Autor</h4>

          <input
            type="search"
            className="filter-input"
            placeholder="Buscar autor"
            aria-label="Buscar autor"
            value={selecionados.autor}
            onChange={(event) =>
              alterarCampo("autor", event.target.value)
            }
          />
        </div>

        <div className="filter-group">
          <h4>ISBN</h4>

          <input
            type="search"
            className="filter-input"
            placeholder="Digite o ISBN"
            aria-label="Buscar ISBN"
            value={selecionados.isbn}
            onChange={(event) =>
              alterarCampo("isbn", event.target.value)
            }
          />
        </div>

        <div className="filter-group">
          <h4>Faixa de preço</h4>

          <input
            type="range"
            min="0"
            max="500"
            value={selecionados.preco}
            aria-label="Preço máximo"
            onChange={(event) =>
              alterarCampo("preco", Number(event.target.value))
            }
          />

          <div className="price-range">
            <span>R$ 0</span>
            <span>R$ {selecionados.preco}</span>
          </div>
        </div>

        <div className="filter-group">
          <h4>Disponibilidade</h4>

          {[
            ["estoque", "Em estoque"],
            ["pre-venda", "Pré-venda"]
          ].map(([valor, nome]) => (
            <label key={valor}>
              <input
                type="checkbox"
                checked={selecionados.disponibilidade.includes(valor)}
                onChange={() =>
                  alterarCheckbox("disponibilidade", valor)
                }
              />
              {nome}
            </label>
          ))}
        </div>

        <button type="submit" className="filter-button">
          Aplicar filtros
        </button>

        <button
          type="button"
          className="clear-filters"
          onClick={limparFiltros}
        >
          Limpar filtros
        </button>
      </form>
    </aside>
  );
}