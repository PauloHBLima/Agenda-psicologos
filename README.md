# 🧠 Agenda Psicólogos

Projeto de agendamento de compromissos feito em **Angular 17 com Material Design**, voltado para uso profissional de psicólogos e terapeutas.

---

## 🚀 Tecnologias utilizadas

- ✅ Angular 17+
- ✅ Angular Material
- ✅ SCSS (SASS)
- ✅ Standalone Components
- ✅ Arquitetura modular
- ✅ TypeScript

---

## 🧩 Estrutura de pastas

```bash
src/app/
├── components/        # Componentes reutilizáveis
├── interfaces/        # Tipagens e contratos
├── pages/             # Páginas da aplicação
│   └── agendamentos/
│       ├── agendamentos/
│       ├── calendario/
│       └── compromissos/
├── pipes/             # Pipes personalizados
├── services/          # Comunicação de dados
├── utils/             # Funções auxiliares
├── validators/        # Validadores customizados

✅ Funcionalidades implementadas
 Visualização de compromissos

 Filtro por semana ou mês

 Integração com serviço mock local

 Componentes 100% standalone

 Layout adaptado para psicologia

📅 Funcionalidades futuras
 Formulário com validação reativa para novo agendamento

 Busca por nome do paciente

 Edição de agendamentos

 Responsividade mobile

 Backend com Java Spring Boot

 # Clone o repositório
git clone https://github.com/SeuUsuario/agenda-psicologos.git

# Entre na pasta
cd agenda-psicologos

# Instale as dependências
npm install

# Rode a aplicação
ng serve

# Acesse no navegador
http://localhost:4200

🧠 Explicação técnica
O projeto foi feito com Angular 17 usando Standalone Components

A estrutura em pastas separa responsabilidades de forma limpa e escalável

Os dados são mockados localmente em um AgendamentoService

A tela inicial usa 3 componentes principais:

CalendarioComponent: filtro por semana/mês

CompromissosComponent: lista os agendamentos filtrados

AgendamentosComponent: componente pai que integra os dois acima

👨‍💻 Autor
Feito por Paulo Henrique Barbosa de Lima
Desenvolvedor Front-end focado em Angular e boas práticas de código.

📌 Licença
Este projeto é livre para uso pessoal ou profissional, sem restrição comercial.