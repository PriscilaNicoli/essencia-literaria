const produtos = [
  {
    id: 1,
    titulo: "Engenharia de Software",
    autor: "Roger Pressman e Bruce Maxim",
    isbn: "",
    categoria: "computacao",
    formatos: ["fisico", "digital"],
    preco: 189.90,
    disponibilidade: "estoque",
    imagem: "/images/engenharia-software.jpg",
    descricao: "Aborda os principais conceitos, métodos e práticas da engenharia de software.",
    edicoes: [
      {
        formato: "fisico",
        preco: 189.90,
        isbn: "",
        disponibilidade: "estoque"
      },
      {
        formato: "digital",
        preco: 119.90,
        isbn: "",
        disponibilidade: "estoque"
      }
    ]
  },
  {
    id: 2,
    titulo: "Código Limpo",
    autor: "Robert C. Martin",
    isbn: "",
    categoria: "computacao",
    formatos: ["fisico"],
    preco: 129.90,
    disponibilidade: "estoque",
    imagem: "/images/codigo-limpo.jpg",
    descricao: "Apresenta práticas para escrever códigos mais organizados, legíveis e fáceis de manter.",
    edicoes: [
      {
        formato: "fisico",
        preco: 129.90,
        isbn: "",
        disponibilidade: "estoque"
      }
    ]
  },
  {
    id: 3,
    titulo: "Inteligência Artificial",
    autor: "Stuart Russell e Peter Norvig",
    isbn: "",
    categoria: "computacao",
    formatos: ["fisico", "digital"],
    preco: 249.90,
    disponibilidade: "pre-venda",
    imagem: "/images/inteligencia-artificial.jpg",
    descricao: "Apresenta fundamentos da inteligência artificial, incluindo agentes inteligentes, algoritmos de busca, aprendizado de máquina e representação do conhecimento.",
    edicoes: [
      {
        formato: "fisico",
        preco: 249.90,
        isbn: "",
        disponibilidade: "pre-venda"
      },
      {
        formato: "digital",
        preco: 179.90,
        isbn: "",
        disponibilidade: "pre-venda"
      }
    ]
  },
  {
    id: 4,
    titulo: "Redes de Computadores",
    autor: "Andrew Tanenbaum",
    isbn: "",
    categoria: "computacao",
    formatos: ["fisico", "digital"],
    preco: 159.90,
    disponibilidade: "estoque",
    imagem: "/images/redes-computadores.jpg",
    descricao: "Apresenta conceitos de comunicação de dados, protocolos, arquiteturas de redes e funcionamento da internet.",
    edicoes: [
      {
        formato: "fisico",
        preco: 159.90,
        isbn: "",
        disponibilidade: "estoque"
      },
      {
        formato: "digital",
        preco: 99.90,
        isbn: "",
        disponibilidade: "estoque"
      }
    ]
  },
  {
    id: 5,
    titulo: "Fundamentos de Física",
    autor: "David Halliday e Robert Resnick",
    isbn: "",
    categoria: "engenharia",
    formatos: ["fisico"],
    preco: 199.90,
    disponibilidade: "estoque",
    imagem: "/images/fundamentos-fisica.jpg",
    descricao: "Material de apoio ao estudo dos conceitos fundamentais da física, destinado principalmente a estudantes universitários.",
    edicoes: [
      {
        formato: "fisico",
        preco: 199.90,
        isbn: "",
        disponibilidade: "estoque"
      }
    ]
  },
  {
    id: 6,
    titulo: "Caderno Universitário",
    autor: null,
    isbn: null,
    categoria: "papelaria",
    formatos: ["fisico"],
    preco: 29.90,
    disponibilidade: "estoque",
    imagem: "/images/caderno.jpg",
    descricao: "Caderno destinado à organização de anotações, atividades acadêmicas e materiais de estudo.",
    edicoes: [
      {
        formato: "fisico",
        preco: 29.90,
        isbn: null,
        disponibilidade: "estoque"
      }
    ]
  },
  {
    id: 7,
    titulo: "Kit de Canetas Técnicas",
    autor: null,
    isbn: null,
    categoria: "papelaria",
    formatos: ["fisico"],
    preco: 49.90,
    disponibilidade: "estoque",
    imagem: "/images/canetas.jpg",
    descricao: "Conjunto de canetas para desenhos técnicos, projetos, anotações e atividades acadêmicas.",
    edicoes: [
      {
        formato: "fisico",
        preco: 49.90,
        isbn: null,
        disponibilidade: "estoque"
      }
    ]
  },
  {
    id: 8,
    titulo: "Introdução à Administração",
    autor: "Idalberto Chiavenato",
    isbn: "",
    categoria: "administracao",
    formatos: ["fisico", "digital"],
    preco: 119.90,
    disponibilidade: "estoque",
    imagem: "/images/administracao.jpg",
    descricao: "Apresenta conceitos fundamentais da administração, organização empresarial, planejamento e gestão.",
    edicoes: [
      {
        formato: "fisico",
        preco: 119.90,
        isbn: "",
        disponibilidade: "estoque"
      },
      {
        formato: "digital",
        preco: 79.90,
        isbn: "",
        disponibilidade: "estoque"
      }
    ]
  }
];

export default produtos;