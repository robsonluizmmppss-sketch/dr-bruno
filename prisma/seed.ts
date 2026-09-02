import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@drbruno.com.br";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Dr. Bruno Aparecido",
      password: hashedPassword,
      role: "admin",
    },
  });

  const siteData = {
    siteName: "Dr. Bruno Aparecido",
    siteSubtitle: "Cirurgião-Dentista",
    email: "contato@drbruno.com.br",
    phone: "(11) 99876-5432",
    address: "Av. Paulista, 1578 - Sala 1204",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-200",
    cro: "SP-123456",
    workingHours: "Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h",
    copyrightText: "© 2026 Dr. Bruno Aparecido. Todos os direitos reservados.",
  };
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: siteData,
    create: { id: "default", ...siteData },
  });

  const heroData = {
    badge: "ODONTOLOGIA COM EXCELÊNCIA",
    title: "Seu sorriso merece cuidado, precisão e confiança.",
    subtitle: "Atendimento odontológico personalizado, aliado à experiência, tecnologia e cuidado em cada etapa do seu tratamento.",
    buttonPrimary: "Agendar consulta",
    buttonSecondary: "Conheça o Dr. Bruno",
    image: "/images/hero-dentist.jpg",
    card1Title: "Atendimento personalizado",
    card2Title: "Experiência e precisão",
    card3Title: "Tecnologia em cada detalhe",
  };
  await prisma.heroSettings.upsert({
    where: { id: "default" },
    update: heroData,
    create: { id: "default", ...heroData },
  });

  const aboutData = {
    name: "Dr. Bruno Aparecido",
    role: "Cirurgião-Dentista",
    cro: "SP-123456",
    biography: "Formado pela Universidade de São Paulo (USP) em 2010, com especialização em Implantodontia pela APCD e pós-graduação em Estética Dental pela ABO. Ao longo de mais de 14 anos de carreira, dediquei-me a proporcionar tratamentos odontológicos de excelência, unindo tecnologia de ponta a um atendimento humanizado e acolhedor.",
    photo: "/images/about-doctor.jpg",
    education: "Universidade de São Paulo (USP) — Graduação em Odontologia",
    specializations: "Implantodontia (APCD) | Estética Dental (ABO) | Endodontia",
    experience: "Mais de 14 anos de experiência clínica",
    stat1Number: "5.000+",
    stat1Label: "Pacientes atendidos",
    stat2Number: "14 anos",
    stat2Label: "de experiência",
    stat3Number: "8.500+",
    stat3Label: "Procedimentos realizados",
  };
  await prisma.aboutSettings.upsert({
    where: { id: "default" },
    update: aboutData,
    create: { id: "default", ...aboutData },
  });

  const services = [
    { name: "Clínica Geral", slug: "clinica-geral", shortDescription: "Cuidado completo para a saúde dos seus dentes e gengivas.", fullDescription: "A clínica geral é a base da odontologia, voltada para a prevenção, diagnóstico e tratamento das principais condições bucais. Engloba consultas de rotina, avaliações completas e orientação sobre cuidados diários para manter sua saúde bucal em dia.", icon: "Stethoscope", image: "/images/service-clinica.jpg", order: 1 },
    { name: "Limpeza e Prevenção", slug: "limpeza-e-prevencao", shortDescription: "Profilaxia profissional para manter seu sorriso saudável.", fullDescription: "A limpeza profissional remove tártaro e placas bacterianas que a escovação convencional não alcança. Fundamental para prevenir cáries, gengivite e doenças periodontais, mantendo seus dentes e gengivas saudáveis.", icon: "Sparkles", image: "/images/service-limpeza.jpg", order: 2 },
    { name: "Restaurações", slug: "restauracoes", shortDescription: "Restaurações estéticas e funcionais com materiais de alta qualidade.", fullDescription: "As restaurações dentárias devolvem forma, função e estética ao dente comprometido por cárie ou fratura. Utilizamos resina composta de alta performance e cerâmicas para resultados naturais e duradouros.", icon: "Wrench", image: "/images/service-restauracao.jpg", order: 3 },
    { name: "Clareamento Dental", slug: "clareamento-dental", shortDescription: "Dentes mais brancos com segurança e resultados comprovados.", fullDescription: "O clareamento dental é um procedimento seguro que utiliza géis clareadores à base de peróxido para remover manchas e devolver a luminosidade ao seu sorriso, com acompanhamento profissional durante todo o processo.", icon: "Sun", image: "/images/service-clareamento.jpg", order: 4 },
    { name: "Estética Dental", slug: "estetica-dental", shortDescription: "Transforme seu sorriso com procedimentos estéticos avançados.", fullDescription: "A estética dental reúne procedimentos que visam a harmonização e embelezamento do sorriso, incluindo lentes de contato dental, facetas em porcelana, remodelação gengival e design digital do sorriso.", icon: "Star", image: "/images/service-estetica.jpg", order: 5 },
    { name: "Implantes", slug: "implantes", shortDescription: "Reabilitação oral com implantes de última geração.", fullDescription: "Os implantes dentários são a solução mais avançada para substituição de dentes perdidos. Utilizamos implantes de titânio com planejamento digital 3D, proporcionando resultados naturais, conforto e durabilidade.", icon: "Anchor", image: "/images/service-implante.jpg", order: 6 },
  ];

  for (const service of services) {
    const { slug, ...data } = service;
    await prisma.service.upsert({
      where: { slug },
      update: data,
      create: service,
    });
  }

  const differentials = [
    { title: "Atendimento Humanizado", description: "Cada paciente é único. Nosso atendimento é focado em ouvir, entender e cuidar com empatia e respeito em todas as etapas.", icon: "Heart", order: 1 },
    { title: "Tecnologia Avançada", description: "Equipamentos de última geração para diagnósticos precisos, radiografias digitais e planejamento computadorizado.", icon: "Cpu", order: 2 },
    { title: "Precisão e Segurança", description: "Procedimentos realizados com rigor técnico e biossegurança, priorizando a segurança e o conforto do paciente.", icon: "Shield", order: 3 },
    { title: "Conforto e Acolhimento", description: "Ambiente climatizado, moderno e acolhedor para que você se sinta confortável e tranquilo em cada visita.", icon: "Sofa", order: 4 },
    { title: "Planejamento Personalizado", description: "Cada tratamento é planejado de forma individual com simulação digital, respeitando suas necessidades e expectativas.", icon: "ClipboardList", order: 5 },
    { title: "Resultados Naturais", description: "Buscamos sempre o resultado mais natural e harmonioso, valorizando a beleza e a funcionalidade do seu sorriso.", icon: "Smile", order: 6 },
  ];

  for (const diff of differentials) {
    await prisma.differential.upsert({
      where: { id: diff.title },
      update: { description: diff.description, icon: diff.icon, order: diff.order },
      create: diff,
    });
  }

  await prisma.testimonial.deleteMany();

  const testimonials = [
    { name: "Mariana Oliveira", text: "Procurei o Dr. Bruno para fazer um clareamento e fiquei impressionada com o resultado. O consultório é lindo, a equipe muito atenciosa e o procedimento foi indolor. Recomendo de olhos fechados!", rating: 5, order: 1 },
    { name: "Ricardo Santos", text: "Fiz um implante com o Dr. Bruno e foi a melhor decisão que tomei. Profissional extremamente competente, explicou cada etapa do tratamento e o resultado ficou perfeito. Nota 10!", rating: 5, order: 2 },
    { name: "Camila Ferreira", text: "Atendimento impecável do início ao fim. Desde a recepção até o procedimento, tudo muito organizado e profissional. Me senti segura e acolhida durante todo o tratamento.", rating: 5, order: 3 },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  const socials = [
    { platform: "instagram", url: "https://instagram.com/drbruno.odontologia", isActive: true },
    { platform: "facebook", url: "https://facebook.com/drbruno.odontologia", isActive: true },
    { platform: "tiktok", url: "", isActive: false },
    { platform: "youtube", url: "", isActive: false },
    { platform: "linkedin", url: "", isActive: false },
  ];

  for (const social of socials) {
    await prisma.socialLink.upsert({
      where: { platform: social.platform },
      update: { url: social.url, isActive: social.isActive },
      create: social,
    });
  }

  const whatsappData = {
    phoneNumber: "5511999765432",
    defaultMessage: "Olá, Dr. Bruno! Gostaria de agendar uma consulta.",
    appointmentMessage: "Olá! Gostaria de agendar uma consulta com o Dr. Bruno Aparecido.",
    showFloatingButton: true,
    showBottomBar: false,
  };
  await prisma.whatsappSettings.upsert({
    where: { id: "default" },
    update: whatsappData,
    create: { id: "default", ...whatsappData },
  });

  await prisma.contactSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });

  const seoData = {
    metaTitle: "Dr. Bruno Aparecido | Cirurgião-Dentista em São Paulo",
    metaDescription: "Consultório odontológico em São Paulo. Implantes, clareamento, estética dental e muito mais. Atendimento humanizado com tecnologia de ponta. Agende sua consulta.",
    keywords: "dentista são paulo, cirurgião-dentista, implante dentário, clareamento dental, estética dental, consultório odontológico SP",
  };
  await prisma.seoSettings.upsert({
    where: { id: "default" },
    update: seoData,
    create: { id: "default", ...seoData },
  });

  await prisma.ctaSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });

  const clinicData = {
    image: "/images/clinic.jpg",
  };
  await prisma.clinicSection.upsert({
    where: { id: "default" },
    update: clinicData,
    create: { id: "default", ...clinicData },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
