"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const dados = localStorage.getItem("essencia-carrinho");

      if (dados) {
        const itens = JSON.parse(dados);

        if (Array.isArray(itens)) {
          setCarrinho(itens);
        }
      }
    } catch {
      setCarrinho([]);
    }

    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) {
      localStorage.setItem(
        "essencia-carrinho",
        JSON.stringify(carrinho)
      );
    }
  }, [carrinho, carregado]);

  function adicionarProduto(produto, edicao) {
    const chave = `${produto.id}-${edicao.formato}`;

    setCarrinho((anterior) => {
      const existente = anterior.find(
        (item) => item.chave === chave
      );

      if (existente) {
        if (edicao.formato === "digital") {
          return anterior;
        }

        return anterior.map((item) =>
          item.chave === chave
            ? {
                ...item,
                quantidade: item.quantidade + 1
              }
            : item
        );
      }

      return [
        ...anterior,
        {
          chave,
          id: produto.id,
          titulo: produto.titulo,
          autor: produto.autor,
          imagem: produto.imagem,
          formato: edicao.formato,
          preco: edicao.preco,
          disponibilidade: edicao.disponibilidade,
          quantidade: 1
        }
      ];
    });
  }

  function removerProduto(chave) {
    setCarrinho((anterior) =>
      anterior.filter((item) => item.chave !== chave)
    );
  }

  function alterarQuantidade(chave, quantidade) {
    if (!Number.isInteger(quantidade) || quantidade < 1) {
      return;
    }

    setCarrinho((anterior) =>
      anterior.map((item) =>
        item.chave === chave
          ? {
              ...item,
              quantidade:
                item.formato === "digital" ? 1 : quantidade
            }
          : item
      )
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = carrinho.reduce(
    (total, item) =>
      total + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        carregado,
        adicionarProduto,
        removerProduto,
        alterarQuantidade,
        limparCarrinho,
        totalItens,
        valorTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart deve ser utilizado dentro de CartProvider"
    );
  }

  return contexto;
}