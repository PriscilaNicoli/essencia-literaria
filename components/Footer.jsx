import { BookOpen, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <BookOpen size={32} />
            <h3>Livraria Técnica</h3>
          </div>

          <p>
            Conhecimento, tecnologia e materiais
            para sua formação profissional.
          </p>
        </div>

        <div className="footer-column">
          <h4>Institucional</h4>
          <span>Sobre nós</span>
          <span>Política de privacidade</span>
          <span>Termos de uso</span>
        </div>

        <div className="footer-column">
          <h4>Produtos</h4>
          <span>Livros técnicos</span>
          <span>Papelaria</span>
          <span>Edições digitais</span>
          <span>Pré-venda</span>
        </div>

        <div className="footer-column">
          <h4>Atendimento</h4>

          <div className="footer-contact">
            <Mail size={17} />
            <span>Entre em contato</span>
          </div>

          <span>Central de ajuda</span>
          <span>Perguntas frequentes</span>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Livraria Técnica. Todos os direitos reservados.
      </div>
    </footer>
  );
}