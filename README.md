# 🧠 Agenda Psicólogos

Sistema de agendamentos desenvolvido em **Angular 17 com Angular Material**, focado no gerenciamento de compromissos para psicólogos, terapeutas e profissionais da saúde mental. A aplicação oferece funcionalidades para controle de datas, clientes, pagamentos e muito mais.

---

## 🚀 Tecnologias utilizadas

- ✅ Angular 17+
- ✅ Angular Material
- ✅ SCSS (SASS)
- ✅ TypeScript
- ✅ Standalone Components
- ✅ Arquitetura Modular

---

## 📁 Estrutura de Pastas (`src/app/`)

```bash
src/app/
├── components/                        # Componentes reutilizáveis
├── interfaces/                        # Tipagens (DTOs do backend em Java)
├── pages/                             # Páginas principais da aplicação
│   └── agendamentos/
│       ├── agendamentos/             # Componente pai da seção
│       ├── listar-agendamentos/     # Listagem com paginação e ações (editar/excluir)
│       ├── criar-agendamento/       # Formulário reativo de criação
│       ├── editar-agendamento/      # Edição com autocomplete e data/hora separados
│       ├── excluir-agendamento/     # (Rota para confirmação e lógica de exclusão)
│       ├── novo-agendamento/        # Outro modelo de criação (teste/refatoração)
│       ├── compromissos/            # Visualização de compromissos por cliente
│       └── calendario/              # (Em desenvolvimento)
├── pipes/                            # Pipes customizados (a criar)
├── services/                         # Serviços HTTP (ex: AppointmentService)
├── shared/                           # Componentes compartilháveis entre páginas
├── utils/                            # Funções auxiliares e helpers
├── validators/                       # Validadores personalizados (a implementar)

✅ Funcionalidades Implementadas
✅ Listagem de agendamentos com paginação, ações de edição e exclusão

✅ Criação de agendamento com formulário reativo e validação

✅ Edição de agendamento com autocomplete e separação entre data/hora

✅ Exclusão de agendamento (rota dedicada, lógica de confirmação)

✅ Visualização de compromissos de um cliente

✅ Integração com back-end Java (DTOs definidos)

✅ Arquitetura standalone e modular

✅ Design profissional com Angular Material

✅ Responsabilidade separada por pastas e arquivos

📅 Funcionalidades em Desenvolvimento
 Componente de calendário com visualização semanal/mensal

 Busca por nome do paciente com autocomplete

 Validações personalizadas (datas futuras, horários, etc.)

 Pipes customizados (ex: status de pagamento, formatação de CPF)

 Responsividade completa para dispositivos móveis

 Autenticação (login/logout) com guardas de rota

💻 Como rodar o projeto
bash
Copiar
Editar
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
🧠 Explicação Técnica
Projeto desenvolvido com Angular 17 e componentes standalone (sem uso de módulos).

Arquitetura modular e escalável, separando responsabilidades por pasta.

Comunicação com back-end Java por meio de DTOs tipados.

Uso do Reactive Forms com validações embutidas e feedback visual.

Componentes independentes para listagem, criação, edição e exclusão de agendamentos.

Estilo aplicado com Angular Material e boas práticas de UI/UX.

👨‍💻 Autor
Paulo Henrique Barbosa de Lima
Desenvolvedor Front-end focado em Angular e aplicações organizadas por boas práticas e escalabilidade.

📌 Licença
Este projeto está disponível para uso pessoal ou profissional, livre para modificação e adaptação conforme a necessidade.

