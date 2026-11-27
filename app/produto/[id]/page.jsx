import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "../../../components/ProductDetails";
import { buscarProdutoPorId } from "../../../lib/produtos";

async function ProdutoConteudo({ params }) {
  const { id } = await params;

  const produto = await buscarProdutoPorId(id);

  if (!produto) {
    notFound();
  }

  return <ProductDetails produto={produto} />;
}

export default function ProdutoPage({ params }) {
  return (
    <main>
      <Suspense fallback={<p>Carregando produto...</p>}>
        <ProdutoConteudo params={params} />
      </Suspense>
    </main>
  );
}