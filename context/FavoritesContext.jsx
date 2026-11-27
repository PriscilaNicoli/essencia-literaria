"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const dados = localStorage.getItem("essencia-favoritos");

      if (dados) {
        const itens = JSON.parse(dados);

        if (Array.isArray(itens)) {
          setFavoritos(itens);
        }
      }
    } catch {
      setFavoritos([]);
    }

    setCarregado(true);
  }, []);

  useEffect(() => {
    if (carregado) {
      localStorage.setItem(
        "essencia-favoritos",
        JSON.stringify(favoritos)
      );
    }
  }, [favoritos, carregado]);

  function alternarFavorito(id) {
    setFavoritos((anterior) =>
      anterior.includes(id)
        ? anterior.filter((item) => item !== id)
        : [...anterior, id]
    );
  }

  function removerFavorito(id) {
    setFavoritos((anterior) =>
      anterior.filter((item) => item !== id)
    );
  }

  function ehFavorito(id) {
    return favoritos.includes(id);
  }

  function limparFavoritos() {
    setFavoritos([]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoritos,
        carregado,
        alternarFavorito,
        removerFavorito,
        ehFavorito,
        limparFavoritos,
        totalFavoritos: favoritos.length
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const contexto = useContext(FavoritesContext);

  if (!contexto) {
    throw new Error(
      "useFavorites deve ser utilizado dentro de FavoritesProvider"
    );
  }

  return contexto;
}