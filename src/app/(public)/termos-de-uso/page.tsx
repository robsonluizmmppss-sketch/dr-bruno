import { getSiteSettings } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Termos de Uso | Dr. Bruno Aparecido",
};

export default async function TermosPage() {
  const settings = await getSiteSettings();
  const name = settings?.siteName || "Dr. Bruno Aparecido";

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#07141C] mb-8">Termos de Uso</h1>
        <div className="prose prose-gray max-w-none text-[#0B2029]/70 space-y-6">
          <p>Ao acessar e utilizar este website, você concorda com os presentes Termos de Uso.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">1. Conteúdo</h2>
          <p>O conteúdo deste site é de propriedade de {name} e tem caráter informativo. Nenhuma informação aqui contida substitui uma consulta profissional.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">2. Uso Adequado</h2>
          <p>O usuário compromete-se a utilizar o site de forma ética e legal, não realizando ações que possam prejudicar seu funcionamento.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">3. Propriedade Intelectual</h2>
          <p>Todos os textos, imagens, logotipos e demais conteúdos são protegidos por direitos autorais. A reprodução sem autorização prévia é proibida.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">4. Limitação de Responsabilidade</h2>
          <p>Não nos responsabilizamos por eventuais imprecisões ou desatualizações no conteúdo. Recomendamos sempre uma consulta presencial para diagnóstico e tratamento.</p>
          <h2 className="text-xl font-semibold text-[#07141C]">5. Alterações</h2>
          <p>Reservamos o direito de modificar estes termos a qualquer momento, sem aviso prévio.</p>
        </div>
      </div>
    </div>
  );
}
