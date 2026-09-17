<h1 align="center">ISCuTa</h1>

<p align="center">
  <img src="https://img.shields.io/badge/programa_de_inovação-recife_resolve-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/status-em_desenvolvimento-orange?style=for-the-badge" />
</p>

<blockquote>
A prevenção começa na informação — aplicação viesada a Acessibilidade, Segurança e ao Acolhimento.
</blockquote>

---

<h2>📝 Sobre o Projeto</h2>

IScuTa é uma healthtech que engaja eventos e impulsiona o combate a desinformação entre jovens de 14 a 25 anos sobre IST's (infecções sexualmente transmissíveis) com uma jornada de prevenção gamificada e privada. Ensinando sobre PrEP e PEP via vídeos e quizzes, possui um chatbot confidencial, geolocalização para postos de saúde e agenda de exames. 

Este projeto está sendo desenvolvido de forma colaborativa dentro do ecossistema do programa de inovação territorial Recife Resolve. Nosso objetivo primordial é entregar uma solução robusta, escalável e com impacto real na sociedade que forneça uma acessibilidade maior, uma plataforma segura e acolhedora para com os usuários 

---

<h2>Stack Tecnológica</h2>

Este projeto utiliza a arquitetura Monorepo organizado em arquitetura em camadas e abaixo estão listadas os recursos tecnológicas:

<table>
  <tr>
    <th>Camadas</th>
    <th>Tecnologias</th>
  </tr>
  <tr>
    <td>Backend</td>
    <td>Java 21. + Spring Boot</td>
  </tr>
  <tr>
    <td>Frontend</td>
    <td>React</td>
  </tr>
  <tr>
    <td>Banco de Dados</td>
    <td>PostgreSQL</td>
  </tr>
     <tr>
    <td>ORM</td>
    <td>Hibernate + JPA</td>
  </tr>
   <tr>
    <td>Infra</td>
    <td> Docker & Docker Compose</td>
  </tr>
</table>

<blockquote>
  💡Nota do Desenvolvedor: As tecnologias ainda podem ser alteradas ou novas podem ser adicionadas posteriormente
</blockquote>

---

<h2>Participantes</h2>

Conheça as pessoas por trás do desenvolvimento desta ferramenta:

<table>
  <tr>
    <th>Avatar</th>
    <th>Membros</th>
    <th>Github</th>
  </tr>
   <tr>
    <td><img src="https://github.com/hideapisizy.png" width="50"></td>
    <td>Luizy Drielly da Silva Moura</td>
    <td><a href="https://github.com/hideapisizy">hideapisizy</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/cecilialopess.png" width="50"></td>
    <td>Cecília Victoria Lopes dos Santos</td>
    <td><a href="https://github.com/Cecilialopess">Cecilialopess</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/DayvidCristiano.png" width="50"></td>
    <td>Dayvid Cristiano Viana da Silva</td>
    <td><a href="https://github.com/Dayvidcristiano">Dayvidcristiano</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/josuec006.png" width="50"></td>
    <td>Josué Costa da Silva</td>
    <td><a href="https://github.com/JosueC006">JosueC006</a></td>
  </tr>
  <tr>
    <td><img src="https://github.com/D4n1el20.png" width="50"></td>
    <td>Daniel Silva Costa </td>
    <td><a href="https://github.com/D4n1el20">D4n1el20</a></td>
  </tr>
</table>

---

<h2>Primeiros Passos (Instalação e Configuração)</h2>

1. **Clone o repositório:**
```bash
git clone [https://github.com/cecilialopess/IScuTa.git]([https://github.com/cecilialopess/IScuTa.git](https://github.com/cecilialopess/IScuTa.git)
cd IScuTa
```

2. **Inicie a infraestrutura do Database:**
```bash
docker-compose up -d
```

3. **Execute a aplicação (local dev is default):**
```bash
./mvnw spring-boot:run
```
