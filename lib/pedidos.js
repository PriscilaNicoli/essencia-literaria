import { supabase } from "./supabase";

export async function finalizarPedido(carrinho) {
  const itens = carrinho.map((item) => ({
    id: item.id,
    formato: item.formato,
    quantidade: item.quantidade
  }));

  const { data, error } = await supabase.rpc(
    "finalizar_pedido",
    {
      p_itens: itens
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}