-- Remove os exemplos que o DataSeeder já inseriu no banco
DELETE FROM video;
DELETE FROM aviso WHERE titulo LIKE '%(exemplo)%';

-- ===== CARTILHAS =====
-- Rodar de novo ATUALIZA a cartilha com o mesmo slug (não duplica)
INSERT INTO cartilha (titulo, slug, resumo, conteudo, categoria, publicado)
VALUES (
  'O que é PrEP?',
  'o-que-e-prep',
  'Resumo curto que aparece na listagem.',
  $md$
## O que é PrEP?

Cole aqui o texto revisado, em markdown.

- Item de lista
- *Negrito* funciona
  $md$,
  'prevencao',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  titulo    = EXCLUDED.titulo,
  resumo    = EXCLUDED.resumo,
  conteudo  = EXCLUDED.conteudo,
  categoria = EXCLUDED.categoria,
  publicado = EXCLUDED.publicado;

-- (copie o bloco acima para cada nova cartilha, mudando o slug)

-- ===== VÍDEOS =====
-- Os vídeos são apagados no início do script e reinseridos a cada execução
INSERT INTO video (titulo, descricao, url_embed, categoria, publicado) VALUES
('PrEP em 1 minuto', 'Descrição curta', 'https://www.youtube-nocookie.com/embed/ID_REAL_DO_VIDEO', 'prevencao', true),
('Segundo vídeo',    'Descrição curta', 'https://www.youtube-nocookie.com/embed/OUTRO_ID',        'prevencao', true);
