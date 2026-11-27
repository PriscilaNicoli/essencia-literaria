"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  BookOpen,
  CalendarClock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { finalizarPedido } from "../../lib/pedidos";

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export default function CarrinhoPage() {
  const {
    carrinho,
    carregado,
    removerProduto,
    alterarQuantidade,
    limparCarrinho,
    totalItens,
    valorTotal
  } = useCart();

  const [finalizando, setFinalizando] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [erro, setErro] = useState("");
  const enviando = useRef(false);

  useEffect(() => {
    if (carrinho.length > 0 && !finalizando) {
      setPedido(null);
    }
  }, [carrinho.length, finalizando]);

  const possuiPreVenda = carrinho.some(
    (item) => item.disponibilidade === "pre-venda"
  );

  async function confirmarPedido() {
    if (enviando.current || carrinho.length === 0) {
      return;
    }

    enviando.current = true;
    setFinalizando(true);
    setErro("");
    setPedido(null);

    try {
      const pedidoId = await finalizarPedido(carrinho);

      limparCarrinho();

      setPedido({
        id: pedidoId
      });
    } catch (error) {
      setErro(
        error.message || "Não foi possível finalizar o pedido."
      );
    } finally {
      enviando.current = false;
      setFinalizando(false);
    }
  }

  return (
    <main>
      <section className="cart-page">
        <Link
          href="/#catalogo"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Continuar comprando
        </Link>

        <h1>Meu carrinho</h1>

        {!carregado ? (
          <p>Carregando carrinho...</p>
        ) : pedido && carrinho.length === 0 ? (
          <div className="cart-empty">
            <CheckCircle
              size={65}
              strokeWidth={1.3}
              color="#16a34a"
            />

            <h2>Pedido realizado com sucesso!</h2>

            <p>
              Seu pedido foi registrado em nosso sistema.
            </p>

            <p>
              Número do pedido: <strong>#{pedido.id}</strong>
            </p>

            <p>
              Esta compra é demonstrativa.
              Nenhum pagamento foi realizado.
            </p>

            <Link
              href="/#catalogo"
              className="cart-primary"
            >
              Continuar comprando
            </Link>
          </div>
        ) : carrinho.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={65} strokeWidth={1.3} />

            <h2>Seu carrinho está vazio</h2>

            <p>
              Explore nosso catálogo e encontre seus produtos.
            </p>

            <Link href="/#catalogo" className="cart-primary">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-products">
              {carrinho.map((item) => (
                <article
                  className="cart-item"
                  key={item.chave}
                >
                  <div className="cart-item-image">
                    <BookOpen size={40} />
                  </div>

                  <div className="cart-item-info">
                    <Link href={`/produto/${item.id}`}>
                      <h3>{item.titulo}</h3>
                    </Link>

                    <p>{item.autor}</p>

                    <span className="cart-format">
                      {item.formato === "fisico"
                        ? "Físico"
                        : "Digital"}
                    </span>

                    {item.disponibilidade === "pre-venda" && (
                      <span className="cart-presale">
                        <CalendarClock size={15} />
                        Pré-venda
                      </span>
                    )}

                    <strong>{moeda(item.preco)}</strong>
                  </div>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      disabled={
                        finalizando ||
                        item.quantidade === 1 ||
                        item.formato === "digital"
                      }
                      onClick={() =>
                        alterarQuantidade(
                          item.chave,
                          item.quantidade - 1
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantidade}</span>

                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      disabled={
                        finalizando ||
                        item.formato === "digital" ||
                        item.quantidade >= 20
                      }
                      onClick={() =>
                        alterarQuantidade(
                          item.chave,
                          item.quantidade + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <strong className="cart-subtotal">
                    {moeda(item.preco * item.quantidade)}
                  </strong>

                  <button
                    type="button"
                    className="cart-remove"
                    aria-label={`Remover ${item.titulo}`}
                    disabled={finalizando}
                    onClick={() =>
                      removerProduto(item.chave)
                    }
                  >
                    <Trash2 size={20} />
                  </button>
                </article>
              ))}

              <button
                type="button"
                className="cart-clear"
                disabled={finalizando}
                onClick={limparCarrinho}
              >
                <Trash2 size={16} />
                Limpar carrinho
              </button>
            </div>

            <aside className="cart-summary">
              <h2>Resumo do pedido</h2>

              <div className="cart-summary-row">
                <span>Quantidade de itens</span>
                <span>{totalItens}</span>
              </div>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{moeda(valorTotal)}</span>
              </div>

              <div className="cart-summary-row">
                <span>Frete</span>
                <span>Não calculado</span>
              </div>

              <div className="cart-total">
                <span>Total estimado</span>
                <strong>{moeda(valorTotal)}</strong>
              </div>

              {possuiPreVenda && (
                <p className="cart-summary-note">
                  Seu pedido contém produtos em pré-venda.
                  Essas edições serão disponibilizadas
                  após o lançamento.
                </p>
              )}

              {erro && (
                <div
                  role="alert"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#b91c1c",
                    fontSize: "13px",
                    marginBottom: "15px"
                  }}
                >
                  <AlertCircle size={20} />
                  <span>{erro}</span>
                </div>
              )}

              <button
                type="button"
                className="cart-primary"
                disabled={finalizando}
                onClick={confirmarPedido}
              >
                {finalizando
                  ? "Finalizando pedido..."
                  : "Finalizar pedido"}
              </button>

              <p className="cart-summary-note">
                Compra demonstrativa, sem cobrança real.
                Os preços serão validados no banco de dados.
              </p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}