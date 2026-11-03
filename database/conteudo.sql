-- Remove os exemplos que o DataSeeder já inseriu no banco
DELETE FROM video;
--DELETE FROM aviso WHERE titulo LIKE '%(exemplo)%';

-- ===== CARTILHAS =====
-- Rodar de novo ATUALIZA a cartilha com o mesmo slug (não duplica)

INSERT INTO cartilha (titulo, slug, resumo, conteudo, categoria, publicado)
VALUES (
  'Camisinha: proteção que faz diferença',
  'camisinha-e-prevencao',
  'Descubra como utilizar preservativos corretamente e por que eles continuam sendo importantes na prevenção das ISTs.',
  $md$
## Por que usar camisinha?

A camisinha é uma das formas mais conhecidas e acessíveis de prevenção contra as Infecções Sexualmente Transmissíveis (ISTs).

Além de ajudar a prevenir infecções como HIV, sífilis, gonorreia e clamídia, os preservativos também ajudam a evitar uma gravidez não planejada.

E o melhor: existem opções para diferentes necessidades!

## Quais são os tipos de preservativo?

**Preservativo externo (camisinha masculina)**

É colocado no pênis antes do contato sexual. Deve ser utilizado durante toda a relação.

**Preservativo interno (camisinha feminina)**

É inserido na vagina antes da relação sexual e também funciona como uma barreira de proteção.

Ambos são importantes aliados na prevenção!

## Como usar corretamente?

Alguns cuidados fazem toda a diferença:

1. Confira a validade e se a embalagem está intacta.
2. Abra a embalagem com cuidado, sem utilizar dentes ou objetos cortantes.
3. Coloque o preservativo antes de qualquer contato sexual genital.
4. Utilize um preservativo novo em cada relação.
5. Após a relação, retire-o com cuidado e descarte no lixo.

**Atenção:** nunca utilize dois preservativos externos juntos ou combine um externo com um interno. O atrito pode aumentar o risco de rompimento.

## E se a camisinha estourar ou escapar?

Primeiro, não entre em pânico!

Se houve uma possível exposição ao HIV, procure imediatamente um serviço de saúde para avaliar a necessidade de PEP.

A PEP é uma medicação de emergência que deve ser iniciada o mais rápido possível, em até **72 horas** após a exposição.

Também é importante avaliar a necessidade de testes para outras ISTs e de contracepção de emergência, quando houver possibilidade de gravidez.

## Algumas dicas extras

- Utilize lubrificantes à base de água ou silicone com preservativos de látex.
- Não reutilize preservativos.
- Guarde as camisinhas em locais protegidos do calor e de atritos.
- Não dependa apenas da outra pessoa: participar da prevenção também é cuidar de si.

## Lembre-se!

Usar camisinha não significa desconfiar de alguém. Significa ter responsabilidade com a própria saúde e com a saúde de quem está com você.

**Prevenção é cuidado, respeito e responsabilidade compartilhada!**
  $md$,
  'prevencao',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  resumo = EXCLUDED.resumo,
  conteudo = EXCLUDED.conteudo,
  categoria = EXCLUDED.categoria,
  publicado = EXCLUDED.publicado;

------------------------------------------------------------------------------------------------------------------

INSERT INTO cartilha (titulo, slug, resumo, conteudo, categoria, publicado)
VALUES (
  'PrEP e PEP: conheça essas formas de prevenção',
  'prep-e-pep',
  'Saiba como funcionam a PrEP e a PEP, duas estratégias importantes para prevenir a infecção pelo HIV.',
  $md$
## Você já ouviu falar em PrEP e PEP?

Além da camisinha, existem outras estratégias que ajudam a prevenir o HIV.

Duas delas são a **PrEP** e a **PEP**. Apesar dos nomes parecidos, elas funcionam em momentos diferentes.

Vamos entender?

## O que é PrEP?

PrEP significa Profilaxia Pré-Exposição.

É uma estratégia que utiliza medicamentos antes de uma possível exposição ao HIV, preparando o organismo para reduzir o risco de infecção.

Existem modalidades de uso diário e sob demanda, mas a indicação depende de uma avaliação profissional.

**Quem pode utilizar?**

Pessoas que desejam ampliar sua proteção contra o HIV e que, após avaliação, tenham indicação para utilizar o método.

A PrEP é disponibilizada gratuitamente pelo SUS.

## E o que é PEP?

PEP significa Profilaxia Pós-Exposição.

Diferentemente da PrEP, ela é utilizada depois de uma possível exposição ao HIV.

Algumas situações que podem exigir avaliação para PEP são:

- Relação sexual sem preservativo.
- Rompimento ou escape da camisinha.
- Situações de violência sexual.

**Existe um prazo importante!**

A PEP deve ser iniciada o mais rápido possível, preferencialmente nas primeiras horas, e no máximo em até **72 horas após a exposição**.

O tratamento dura 28 dias e precisa ser acompanhado por profissionais de saúde.

Se você passou por uma situação de risco, não espere aparecerem sintomas. Procure atendimento imediatamente!

## Qual é a diferença entre elas?

| PrEP | PEP |
|---|---|
| Antes da exposição | Depois da exposição |
| Prevenção planejada | Prevenção de emergência |
| Uso conforme orientação profissional | Início em até 72 horas |
| Acompanhamento de saúde | Tratamento por 28 dias |

## Importante: elas protegem contra todas as ISTs?

Não!

PrEP e PEP são estratégias voltadas principalmente à prevenção do HIV. Elas não substituem a camisinha e não protegem contra todas as outras ISTs.

Por isso, combinar diferentes formas de prevenção é uma ótima escolha.

## Onde conseguir?

Você pode procurar uma Unidade Básica de Saúde (UBS), um Centro de Testagem e Aconselhamento (CTA) ou outro serviço de saúde que ofereça esses métodos.

O atendimento e o acesso pelo SUS são gratuitos.

**Conhecer as opções de prevenção permite que você faça escolhas mais conscientes sobre sua saúde!**
  $md$,
  'prevencao',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  resumo = EXCLUDED.resumo,
  conteudo = EXCLUDED.conteudo,
  categoria = EXCLUDED.categoria,
  publicado = EXCLUDED.publicado;

------------------------------------------------------------------------------------------------------------------

INSERT INTO cartilha (titulo, slug, resumo, conteudo, categoria, publicado)
VALUES (
  'Testagem: conhecer é se cuidar',
  'testagem-e-prevencao',
  'Entenda por que fazer testes para ISTs é importante, mesmo quando não existem sintomas.',
  $md$
## Por que fazer testes para ISTs?

Você sabia que é possível ter uma Infecção Sexualmente Transmissível sem apresentar nenhum sintoma?

Por isso, fazer testes é uma das melhores formas de cuidar da sua saúde.

A testagem permite identificar infecções, iniciar o tratamento adequado e evitar novas transmissões.

## Quando devo fazer um teste?

Não existe uma única resposta para todo mundo. A frequência depende do histórico de saúde, das práticas sexuais e das possíveis exposições.

É importante procurar testagem quando:

- Você teve uma relação sexual sem preservativo.
- A camisinha rompeu ou escapou.
- Percebeu algum sintoma diferente.
- Teve contato com alguém diagnosticado com uma IST.
- Deseja acompanhar sua saúde sexual preventivamente.

Mesmo sem sintomas, você pode conversar com um profissional sobre quais exames são indicados.

## Como funcionam os testes?

Existem diferentes formas de identificar ISTs:

- **Testes rápidos:** podem detectar infecções como HIV e sífilis, além das hepatites B e C, conforme o teste disponível.
- **Exames de sangue:** ajudam a identificar diferentes infecções.
- **Exames de urina ou coleta de secreções:** podem identificar infecções como gonorreia e clamídia.

O tipo de exame depende da infecção investigada e da avaliação profissional.

## Onde posso fazer?

No Brasil, o SUS oferece testagem gratuita para diversas ISTs.

Você pode procurar:

- Unidade Básica de Saúde (UBS).
- Centro de Testagem e Aconselhamento (CTA).
- Serviços especializados em ISTs.

O atendimento é sigiloso e você pode buscar orientação sem medo de julgamentos.

## E se o resultado for positivo?

Respire! Um resultado positivo não significa que sua vida acabou.

Muitas ISTs possuem tratamento e algumas têm cura. Outras, como o HIV e o herpes, possuem tratamentos que permitem controlar a infecção e melhorar a qualidade de vida.

O mais importante é:

1. Seguir as orientações dos profissionais.
2. Iniciar o tratamento indicado.
3. Informar suas parcerias sexuais quando houver orientação para isso.
4. Evitar relações sexuais desprotegidas até receber as orientações adequadas.

## Não espere sentir alguma coisa!

Fazer testes não é motivo de vergonha e não significa que você fez algo errado.

**Conhecer sua situação é uma atitude de responsabilidade com você e com as outras pessoas.**
  $md$,
  'prevencao',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  resumo = EXCLUDED.resumo,
  conteudo = EXCLUDED.conteudo,
  categoria = EXCLUDED.categoria,
  publicado = EXCLUDED.publicado;

-- (copie o bloco acima para cada nova cartilha, mudando o slug)

-- ===== VÍDEOS =====
-- Os vídeos são apagados no início do script e reinseridos a cada execução
INSERT INTO video (titulo, descricao, url_embed, categoria, publicado) VALUES
('PrEP em 1 minuto', 'Descrição curta', 'https://www.youtube-nocookie.com/embed/ID_REAL_DO_VIDEO', 'prevencao', true),
('Segundo vídeo',    'Descrição curta', 'https://www.youtube-nocookie.com/embed/OUTRO_ID',        'prevencao', true);
