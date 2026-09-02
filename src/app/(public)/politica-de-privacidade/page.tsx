import { getSiteSettings } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Política de Privacidade | Dr. Bruno Aparecido",
};

export default async function PoliticaPage() {
  const settings = await getSiteSettings();
  const name = settings?.siteName || "Dr. Bruno Aparecido";

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#07141C] mb-8">Política de Privacidade</h1>
        <div className="prose prose-gray max-w-none text-[#0B2029]/70 space-y-6">
          <p>A sua privacidade é importante para nós. Esta Política de Privacidade descreve como {name} coleta, usa e protege as informações pessoais que você nos fornece.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">1. Informações Coletadas</h2>
          <p>Coletamos informações que você nos fornece voluntariamente ao entrar em contato conosco, como nome, e-mail e telefone. Não coletamos informações de navegação de forma identificável além do estritamente necessário.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">2. Uso das Informações</h2>
          <p>As informações coletadas são utilizadas exclusivamente para fins de agendamento, atendimento ao paciente e comunicação sobre nossos serviços.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">3. Proteção dos Dados</h2>
          <p>Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda ou destruição.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">4. Compartilhamento</h2>
          <p>Não compartilhamos, vendemos ou divulgamos suas informações pessoais a terceiros, exceto quando exigido por lei.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">5. Seus Direitos</h2>
          <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a solicitar acesso, correção, exclusão e portabilidade dos seus dados pessoais. Para exercer seus direitos, entre em contato conosco.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">6. Contato</h2>
          <p>Em caso de dúvidas sobre esta Política de Privacidade, entre em contato através dos canais disponíveis em nossa página de contato.</p>
        </div>
      </div>
    </div>
  );
}
