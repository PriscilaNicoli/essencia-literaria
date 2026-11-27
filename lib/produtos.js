import { supabase } from "./supabase";

export async function buscarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select(`
      id,
      titulo,
      autor,
      descricao,
      imagem,
      categorias (
        slug
      ),
      edicoes (
        id,
        formato,
        isbn,
        preco,
        disponibilidade,
        estoque,
        data_lancamento
      )
    `)
    .eq("ativo", true)
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data
    .filter((produto) => produto.edicoes.length > 0)
    .map((produto) => {
      const edicoes = produto.edicoes
        .map((edicao) => ({
          ...edicao,
          preco: Number(edicao.preco)
        }))
        .sort((a, b) => {
          if (a.formato === b.formato) return 0;
          return a.formato === "fisico" ? -1 : 1;
        });

      const principal = edicoes[0];

      return {
        id: produto.id,
        titulo: produto.titulo,
        autor: produto.autor,
        descricao: produto.descricao,
        imagem: produto.imagem,
        categoria: produto.categorias?.slug || "",
        formatos: edicoes.map((edicao) => edicao.formato),
        isbn: principal.isbn,
        preco: principal.preco,
        disponibilidade: principal.disponibilidade,
        edicoes
      };
    });
}

export async function buscarProdutoPorId(id) {
  const produtos = await buscarProdutos();

  return produtos.find(
    (produto) => String(produto.id) === String(id)
  ) || null;
}