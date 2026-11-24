# Profile

Site pessoal estático (HTML + CSS + JS, sem build).

## Ver localmente

```sh
python -m http.server 8000
# abra http://localhost:8000
```

## Arquivos

- `index.html`: início (nome, frase, sobre, convicções, o que procuro, contato)
- `trabalho.html`: experiências e projetos paralelos
- `style.css`: cores (variáveis em `:root`), tipografia e layout
- `main.js`: tema claro/escuro, relógio e animação do nome

## Adicionando conteúdo

- Trechos com fundo roxo usam a classe `ph` e são placeholders. Escreva o texto real e remova o `<span class="ph">`.
- Procure por `TODO` nos HTML para achar o que falta.
- Nova experiência: copie um bloco `<li class="job">` em `trabalho.html` (mais recente primeiro).
- Cor de destaque: `--accent` em `style.css` (`#4b3bff` no claro, `#8c7dff` no escuro).
