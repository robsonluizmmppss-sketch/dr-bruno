# Dr. Bruno Aparecido — Website Profissional

Website profissional completo para o **Dr. Bruno Aparecido**, Cirurgião-Dentista. Inclui site público institucional e painel administrativo para gerenciamento completo de conteúdo.

## Tecnologias

- **Next.js** — Framework React com App Router
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização utilitária
- **Framer Motion** — Animações
- **Prisma ORM** — Acesso ao banco de dados
- **PostgreSQL** — Banco de dados
- **NextAuth.js** — Autenticação
- **Cloudinary** — Upload de imagens (opcional, fallback para upload local)
- **Lucide React** — Ícones

## Funcionalidades

### Site Público
- Hero Section com design premium
- Página de serviços com páginas individuais
- Seção Sobre com estatísticas
- Depoimentos de pacientes
- Blog com CMS
- Galeria de imagens
- Página de contato com Google Maps
- Botão flutuante de WhatsApp
- Barra inferior de conversão
- SEO completo (Sitemap, Schema.org, Open Graph)
- Política de Privacidade e Termos de Uso
- Design responsivo

### Painel Administrativo (`/admin`)
- Dashboard com estatísticas
- Gerenciamento do Hero
- Gerenciamento do Sobre
- CRUD de Serviços
- CRUD de Depoimentos
- Galeria com upload múltiplo
- Blog com editor
- Configurações de WhatsApp
- Redes Sociais
- SEO
- Configurações Gerais
- Gerenciamento de Usuários

## Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- (Opcional) Conta no Cloudinary

### Passos

1. **Clone o repositório**
```bash
git clone <repo-url>
cd dr.bruno
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. **Configure o banco de dados**
```bash
npx prisma db push
npm run db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse**
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin/login

### Credenciais padrão (seed)
- E-mail: `admin@drbruno.com.br`
- Senha: `admin123`

> **Altere as credenciais após o primeiro acesso.**

## Deploy

### Vercel (Recomendado)

1. Conecte o repositório na Vercel
2. Configure as variáveis de ambiente
3. O build será executado automaticamente

### Banco de Dados

Recomendamos serviços como:
- Neon (PostgreSQL serverless)
- Supabase
- Railway

### Cloudinary (Imagens)

1. Crie uma conta em cloudinary.com
2. Configure as variáveis `CLOUDINARY_*` no `.env`
3. Crie um upload preset no painel do Cloudinary

Sem Cloudinary configurado, as imagens são salvas localmente em `/public/uploads`.

## Estrutura do Projeto

```
src/
  app/
    (public)/          # Páginas públicas
    admin/             # Painel administrativo
    api/               # API Routes
  components/
    public/            # Componentes do site público
    admin/             # Componentes do painel
  lib/                 # Utilitários e configurações
  actions/             # Server Actions
  types/               # Tipos TypeScript
prisma/
  schema.prisma        # Schema do banco
  seed.ts              # Dados iniciais
```

## Licença

Projeto desenvolvido exclusivamente para Dr. Bruno Aparecido.
