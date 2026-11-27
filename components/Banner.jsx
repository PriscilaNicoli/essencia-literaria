import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <span className="banner-label">
          LIVRARIA & PAPELARIA TÉCNICA
        </span>

        <h1>Conhecimento que transforma o futuro.</h1>

        <p>
          Encontre livros técnicos, edições digitais e
          materiais para sua formação.
        </p>

        <a href="#catalogo" className="banner-button">
          Explorar catálogo
          <ArrowRight size={18} />
        </a>
      </div>

      <div className="banner-books" aria-hidden="true">
        <div className="banner-book book-one">
          CIÊNCIA
        </div>

        <div className="banner-book book-two">
          TECNOLOGIA
        </div>

        <div className="banner-book book-three">
          DESIGN
        </div>

        <div className="banner-book book-four">
          PROGRAMAÇÃO
        </div>
      </div>
    </section>
  );
}