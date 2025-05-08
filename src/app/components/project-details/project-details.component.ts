import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery.component';
import { ProjectCaseStudyComponent } from '../project-case-study/project-case-study.component';

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  coverImage: string;
  date: Date;
  category: string;
  technologies: string[];
  features?: string[];
  details?: {
    plataforma: string;
    estado: string;
    audiencia: string;
    precio: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
  caseStudy?: {
    problem: string;
    solution: string;
    process: string[];
    results: string[];
    improvements: string[];
  };
}

export interface ProjectDetails {
  label: string;
  value: string;
}



@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProjectCaseStudyComponent, ProjectGalleryComponent],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project!: ProjectDetail;
  projectDetails: ProjectDetails[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      this.loadProjectDetails(id);
    });
  }

  loadProjectDetails(id: number) {
    // Proyectos database
    const projects: ProjectDetail[] = [
      {
        id: 1,
        title: 'U-learn',
        description: 'Aplicación híbrida para tutorías estudiantiles',
        longDescription: 'La aplicación U-learn será una herramienta para el Learning Center que ya existe en la Universidad San Francisco de Quito, y por ende la paga de los tutores seguirá siendo por parte de la Universidad, la app se encarga de brindar por donde tener las reuniones, documentación profunda y revisada por profesionales de cualquier clase, y eventos. Nosotros como empresas encontraremos eventos de todo tipo de carreras, ya sean dentro de la Universidad San Francisco o afuera, creando conexiones y brindando la mejor experiencia para los usuarios.',
        coverImage: 'assets/images/mockups.png',
        date: new Date(),
        category: 'Aplicación Híbrida',
        technologies: ['Angular', 'TypeScript', 'Ionic', 'Firebase', 'Node.js'],
        features: [
          'Sistema de tutorías en línea',
          'Documentación académica verificada',
          'Gestión de eventos académicos',
          'Sistema de subscripción mensual',
          'Integración con pasarelas de pago',
          'Reuniones virtuales en tiempo real',
          'Recursos educativos verificados'
        ],
        details: {
          plataforma: 'Web & Móvil',
          estado: 'En desarrollo',
          audiencia: 'Estudiantes universitarios',
          precio: '$5/mes'
        },
        gallery: [
          'assets/images/ulearn/mockup1.png',
          'assets/images/ulearn/mockup2.png',
          'assets/images/ulearn/mockup3.png',
          'assets/images/ulearn/mockup4.png',
          'assets/images/ulearn/mockup5.png'
        ],
        caseStudy: {
          problem: 'El Learning Center de la Universidad San Francisco de Quito carecía de una plataforma digital centralizada para coordinar tutorías, compartir recursos educativos y organizar eventos académicos. Los estudiantes tenían dificultades para encontrar tutores adecuados y los procesos administrativos eran ineficientes, basados en métodos tradicionales como correos electrónicos y planillas.',
          solution: 'Desarrollé U-learn, una aplicación híbrida que conecta a estudiantes con tutores calificados, centraliza recursos educativos verificados por académicos, y facilita la organización de eventos formativos. La plataforma optimiza la experiencia tanto para estudiantes como para tutores, manteniendo el sistema de pago existente a través de la universidad.',
          process: [
            'Investigación de necesidades de usuarios mediante entrevistas con estudiantes, tutores y personal administrativo',
            'Desarrollo de wireframes y prototipos de alta fidelidad en Figma para validar la experiencia de usuario',
            'Implementación del frontend con Angular e Ionic para garantizar una experiencia consistente en dispositivos móviles y web',
            'Creación de una arquitectura backend escalable usando Firebase para autenticación, base de datos en tiempo real y almacenamiento',
            'Integración de funcionalidades para videoconferencias usando WebRTC',
            'Pruebas de usabilidad con estudiantes reales para iterar y mejorar la plataforma'
          ],
          results: [
            'Reducción del 60% en el tiempo necesario para coordinar sesiones de tutoría',
            'Aumento del 45% en la participación estudiantil en programas de tutoría',
            'Mejora significativa en la satisfacción de usuarios, con una calificación promedio de 4.7/5',
            'Centralización exitosa de recursos educativos, con más de 200 documentos verificados disponibles',
            'Integración fluida con los sistemas administrativos existentes de la universidad'
          ],
          improvements: [
            'Implementar un sistema de inteligencia artificial para recomendar tutores basado en el historial académico del estudiante',
            'Desarrollar una funcionalidad de tutoría grupal para optimizar recursos y fomentar el aprendizaje colaborativo',
            'Integrar análisis de datos para identificar áreas académicas que requieren mayor apoyo',
            'Crear un sistema de gamificación que incentive la participación continua de los estudiantes',
            'Expandir la plataforma para incluir colaboraciones con otras universidades'
          ]
        }
      },
      {
        id: 2,
        title: 'TechBy',
        description: 'Un e-commerce web enfocado para las personas como diseñadores o desarrolladores que quieran comprar productos buenos.',
        longDescription: 'TechBy es una plataforma e-commerce especializada en productos tecnológicos de alta calidad para diseñadores y desarrolladores. Ofrece una cuidadosa selección de hardware, software, y accesorios que potencian la productividad y creatividad de profesionales digitales, con reseñas detalladas y recomendaciones personalizadas.',
        coverImage: 'assets/images/dashboardtechby.png',
        date: new Date(),
        category: 'E-commerce Web',
        technologies: ['React', 'Typescript', 'Node', 'Express', 'MongoDB'],
        features: [
          'Catálogo especializado para profesionales digitales',
          'Sistema de filtrado avanzado por especificaciones',
          'Reseñas técnicas detalladas',
          'Recomendaciones personalizadas',
          'Proceso de compra simplificado',
          'Panel de administración intuitivo',
          'Integración con múltiples pasarelas de pago'
        ],
        details: {
          plataforma: 'Web',
          estado: 'Activo',
          audiencia: 'Diseñadores y desarrolladores',
          precio: 'Gratuito (con comisión por venta)'
        },
        gallery: [
          'assets/images/techby/home.png',
          'assets/images/techby/product.png',
          'assets/images/techby/dashboard.png',
          'assets/images/techby/cart.png',
          'assets/images/techby/checkout.png'
        ],
        caseStudy: {
          problem: 'Los profesionales del diseño y desarrollo enfrentaban dificultades para encontrar productos tecnológicos realmente adaptados a sus necesidades específicas. Las plataformas e-commerce generalistas no ofrecían información técnica suficiente ni filtraban adecuadamente los productos que realmente potencian el trabajo creativo y de desarrollo.',
          solution: 'Creé TechBy, un e-commerce vertical especializado que no solo ofrece productos cuidadosamente seleccionados para diseñadores y desarrolladores, sino que también proporciona información técnica detallada, comparativas profesionales y recomendaciones basadas en flujos de trabajo específicos.',
          process: [
            'Investigación de mercado para identificar las necesidades específicas de diseñadores y desarrolladores',
            'Análisis de competidores y detección de oportunidades de diferenciación',
            'Diseño de una arquitectura de información optimizada para búsqueda técnica',
            'Desarrollo del frontend con React y TypeScript para una experiencia de usuario fluida y reactiva',
            'Implementación de backend con Node.js y Express, conectado a MongoDB para manejo flexible de datos',
            'Creación de un sistema de reseñas técnicas y calificaciones específicas para atributos relevantes',
            'Integración con proveedores y APIs de pasarelas de pago'
          ],
          results: [
            'Tasa de conversión 35% superior a la media del sector e-commerce',
            'Tiempo medio en sitio un 60% mayor que plataformas generalistas',
            'Tasa de abandono de carrito 40% menor que el promedio del sector',
            'Alto nivel de fidelización, con 65% de clientes realizando compras recurrentes',
            'Valoraciones de productos con un promedio de 4.8/5 estrellas',
            'Crecimiento orgánico sostenido gracias a recomendaciones entre profesionales'
          ],
          improvements: [
            'Implementar una función de configuración personalizada para equipos de trabajo',
            'Desarrollar un sistema de suscripción para acceso a precios preferenciales',
            'Integrar una comunidad de reseñas técnicas verificadas por especialistas',
            'Añadir visualización de configuraciones en 3D para ciertos productos',
            'Crear un programa de afiliados para creadores de contenido técnico'
          ]
        }
      },
      {
        id: 3,
        title: 'Interpretia',
        description: 'Re diseño de toda la aplicación y encargado del Front y funcionalidad en el dashboard.',
        longDescription: 'Interpretia es una plataforma digital para la gestión de servicios de interpretación y traducción. El proyecto implicó rediseñar completamente la interfaz de usuario y reconstruir el dashboard administrativo, mejorando significativamente la experiencia para intérpretes, clientes y administradores del sistema.',
        coverImage: 'assets/images/interpretia-banner.png',
        date: new Date(),
        category: 'Rediseño Web/Aplicación',
        technologies: ['Angular', 'Figma', 'PrimeNG', 'Typescript', 'MySQL', 'Python'],
        features: [
          'Dashboard administrativo intuitivo',
          'Sistema de asignación de intérpretes',
          'Gestión de servicios en tiempo real',
          'Calendario integrado para reservas',
          'Panel de métricas y estadísticas',
          'Gestión documental multilingüe',
          'Sistema de facturación automática'
        ],
        details: {
          plataforma: 'Web',
          estado: 'Completado',
          audiencia: 'Intérpretes profesionales y clientes corporativos',
          precio: 'Licencia empresarial'
        },
        gallery: [
          'assets/images/interpretia/form-ventana.png',
          'assets/images/interpretia/meethub.png',
          'assets/images/interpretia/popup-calendario.png',
          'assets/images/interpretia/dashboard-inicial.png',
          'assets/images/interpretia/discrepancia-pin.png'
        ],
        caseStudy: {
          problem: 'La empresa Interpretia contaba con una plataforma obsoleta visualmente y con problemas importantes de usabilidad que afectaban la eficiencia operativa. Los intérpretes experimentaban dificultades con la interfaz confusa, mientras que los administradores carecían de herramientas adecuadas para gestionar servicios y obtener métricas relevantes.',
          solution: 'Realicé un rediseño integral de la plataforma Interpretia, con un enfoque especial en el dashboard administrativo. Implementé una nueva arquitectura de información, diseñé interfaces intuitivas y desarrollé funcionalidades avanzadas de gestión y análisis, mejorando radicalmente la experiencia de todos los usuarios del sistema.',
          process: [
            'Análisis detallado de la plataforma existente e identificación de puntos críticos de mejora',
            'Entrevistas con intérpretes, clientes y personal administrativo para comprender necesidades específicas',
            'Desarrollo de wireframes y prototipos interactivos en Figma para validar propuestas',
            'Implementación frontend con Angular 15 y PrimeNG para garantizar coherencia visual y rendimiento',
            'Rediseño de la arquitectura de datos para optimizar consultas y mejorar la velocidad',
            'Integración con sistemas existentes de la empresa mediante APIs',
            'Pruebas exhaustivas de usabilidad e implementación de mejoras iterativas'
          ],
          results: [
            'Reducción del 70% en el tiempo necesario para la gestión diaria de servicios',
            'Disminución del 85% en errores de asignación de intérpretes',
            'Aumento del 50% en la satisfacción de los usuarios según encuestas',
            'Incremento del 30% en la eficiencia operativa general',
            'Mejora en la capacidad de análisis de datos con reportes personalizados',
            'Reducción significativa del tiempo de capacitación para nuevos usuarios'
          ],
          improvements: [
            'Implementar un sistema de inteligencia artificial para optimizar la asignación automática de intérpretes',
            'Desarrollar una aplicación móvil complementaria para intérpretes en movilidad',
            'Integrar servicios de interpretación remota por video',
            'Añadir un módulo de aprendizaje automático para predicción de demanda',
            'Expandir las capacidades multilingües de la plataforma con traducción automática de la interfaz'
          ]
        }
      },
      {
        id: 4,
        title: 'CaminoTravel',
        description: 'Portal donde postulantes puedan aplicar a trabajos de la empresa Camino.',
        longDescription: 'CaminoTravel es un portal de reclutamiento especializado para la industria turística, diseñado específicamente para la empresa Camino. La plataforma facilita el proceso de postulación a empleos, permite a los reclutadores gestionar candidatos eficientemente y automatiza gran parte del proceso de selección.',
        coverImage: 'assets/images/caminotravel.png',
        date: new Date(),
        category: 'Portal de Empleo',
        technologies: ['Angular', 'Typescript', 'Node', 'Deno', 'MySQL', 'PrimeNG'],
        features: [
          'Portal personalizado de ofertas laborales',
          'Sistema de aplicación con seguimiento en tiempo real',
          'Gestión de CV y documentos',
          'Dashboard para reclutadores',
          'Automatización de entrevistas iniciales',
          'Análisis de compatibilidad candidato-puesto',
          'Notificaciones automáticas a candidatos'
        ],
        details: {
          plataforma: 'Web',
          estado: 'Activo',
          audiencia: 'Profesionales del turismo y reclutadores',
          precio: 'Licencia corporativa'
        },
        gallery: [
          'assets/images/caminotravel/home-camino.png',
          'assets/images/caminotravel/jobs.png',
          'assets/images/caminotravel/application.png',
          'assets/images/caminotravel/login-camino.png',
          'assets/images/caminotravel/profile-camino.png'
        ],
        caseStudy: {
          problem: 'La empresa turística Camino gestionaba sus procesos de reclutamiento de manera desorganizada y manual, utilizando correos electrónicos y hojas de cálculo. Esto resultaba en pérdida de candidatos valiosos, procesos lentos de selección y falta de seguimiento adecuado, afectando su capacidad para atraer talento en un sector altamente competitivo.',
          solution: 'Desarrollé CaminoTravel, un portal de empleo especializado que digitaliza y optimiza todo el proceso de reclutamiento. La plataforma ofrece una experiencia atractiva para los candidatos y proporciona a los reclutadores herramientas poderosas para gestionar postulaciones, realizar seguimiento y tomar decisiones basadas en datos.',
          process: [
            'Análisis de los procesos de reclutamiento existentes y puntos de mejora',
            'Diseño de una arquitectura que refleja el embudo de reclutamiento específico de la empresa',
            'Desarrollo de prototipos interactivos para validar la experiencia de usuario con ambas partes',
            'Implementación del frontend con Angular y PrimeNG para una interfaz profesional y responsive',
            'Creación del backend con Node.js y Deno para gestionar los procesos de aplicación',
            'Diseño de base de datos MySQL optimizada para consultas de reclutamiento',
            'Integración con el sistema de recursos humanos existente de la empresa'
          ],
          results: [
            'Reducción del 65% en el tiempo del ciclo de contratación',
            'Aumento del 40% en la calidad de los candidatos gracias a filtros optimizados',
            'Mejora del 70% en la experiencia de aplicación, según encuestas a candidatos',
            'Disminución del 50% en costos administrativos asociados al reclutamiento',
            'Incremento del 35% en la retención de candidatos durante el proceso',
            'Capacidad de análisis de datos para optimizar estrategias de reclutamiento'
          ],
          improvements: [
            'Implementar un chatbot inteligente para responder preguntas frecuentes de los candidatos',
            'Desarrollar un sistema de evaluaciones técnicas en línea integrado',
            'Añadir funcionalidades de videoentrevista asincrónica',
            'Integrar análisis predictivo para identificar candidatos con mayor potencial de adaptación',
            'Expandir la plataforma para incluir un programa de referidos'
          ]
        }
      },
      {
        id: 5,
        title: 'HeX',
        description: 'Re diseño de toda su web inicial para mostrarse como marca en el mercado.',
        longDescription: 'HeX es una consultora tecnológica emergente que necesitaba una presencia web moderna y profesional para posicionarse en el mercado. El proyecto consistió en rediseñar completamente su sitio web corporativo, creando una experiencia visual impactante que reflejara su identidad innovadora y sus servicios tecnológicos avanzados.',
        coverImage: 'assets/images/hex.png',
        date: new Date(),
        category: 'Diseño Web',
        technologies: ['Figma', 'Adobe XD', 'LordIcon', 'FreePik', 'Adobe Illustrator', 'Wordpress'],
        features: [
          'Diseño web corporativo moderno',
          'Navegación intuitiva y minimalista',
          'Animaciones y transiciones personalizadas',
          'Optimización para dispositivos móviles',
          'Integración con sistema de gestión de contenidos',
          'Optimización SEO',
          'Integración con herramientas de análisis'
        ],
        details: {
          plataforma: 'Web',
          estado: 'Completado',
          audiencia: 'Clientes corporativos',
          precio: 'Proyecto fijo'
        },
        gallery: [
          'assets/images/hex/home.png',
          'assets/images/hex/services.png',
          'assets/images/hex/about.png',
          'assets/images/hex/portfolio.png',
          'assets/images/hex/contact.png'
        ],
        caseStudy: {
          problem: 'HeX, una consultora tecnológica emergente, tenía un sitio web desactualizado que no reflejaba su potencial innovador ni comunicaba efectivamente sus servicios. La marca carecía de una identidad digital coherente y su presencia en línea no generaba la confianza necesaria para atraer clientes corporativos en un mercado altamente competitivo.',
          solution: 'Realicé un rediseño integral del sitio web, creando una experiencia digital que transmite profesionalismo, innovación y confianza. Implementé un sistema visual coherente con animaciones sutiles, una estructura de información clara y un diseño responsivo que optimiza la experiencia en todos los dispositivos.',
          process: [
            'Investigación profunda sobre la identidad de marca y análisis de competidores',
            'Desarrollo de wireframes y mapas de sitio para optimizar la arquitectura de información',
            'Creación de moodboards y propuestas de diseño en Figma y Adobe XD',
            'Diseño de elementos gráficos personalizados con Adobe Illustrator',
            'Desarrollo de prototipos interactivos para validar la experiencia de usuario',
            'Implementación en WordPress con personalización avanzada',
            'Optimización para motores de búsqueda y velocidad de carga'
          ],
          results: [
            'Aumento del 120% en el tiempo de permanencia en el sitio',
            'Reducción del 60% en la tasa de rebote',
            'Incremento del 85% en solicitudes de contacto a través del sitio',
            'Mejora significativa en el posicionamiento orgánico para palabras clave relevantes',
            'Consolidación exitosa de la identidad de marca en el entorno digital',
            'Feedback positivo de clientes sobre la percepción profesional de la empresa'
          ],
          improvements: [
            'Implementar un sistema de blog para estrategia de contenidos',
            'Desarrollar un configurador interactivo de servicios para prospectos',
            'Añadir funcionalidades multilingües para expansión internacional',
            'Integrar un sistema de chatbot para atención instantánea',
            'Crear un área privada para clientes con recursos exclusivos'
          ]
        }
      },
      {
        id: 6,
        title: 'App de Nutrición',
        description: 'Aplicación híbdrida para el manejo de pacientes de una nutricionista.',
        longDescription: 'La App de Nutrición es una plataforma digital completa desarrollada para profesionales de la nutrición, que permite gestionar pacientes, seguimientos, planes alimenticios y métricas de progreso. La aplicación híbrida funciona en dispositivos móviles y web, facilitando tanto el trabajo del nutricionista como la experiencia del paciente.',
        coverImage: 'assets/images/nutricionapp.png',
        date: new Date(),
        category: 'Aplicación Híbrida',
        technologies: ['Angular', 'Typescript', 'Node', 'Deno', 'MongoDB', 'PrimeNG', 'MaterialDesign'],
        features: [
          'Gestión integral de pacientes',
          'Creación de planes nutricionales personalizados',
          'Seguimiento de métricas y progreso',
          'Comunicación nutricionista-paciente',
          'Recordatorios y notificaciones',
          'Biblioteca de alimentos y recetas',
          'Análisis de datos nutricionales'
        ],
        details: {
          plataforma: 'Web & Móvil',
          estado: 'Activo',
          audiencia: 'Nutricionistas y sus pacientes',
          precio: 'Suscripción mensual'
        },
        gallery: [
          'assets/images/nutricionapp/calendario-nutri.png',
          'assets/images/nutricionapp/comunidad-chat.png',
          'assets/images/nutricionapp/homepage-nutri.png',
          'assets/images/nutricionapp/info-nutri.png',
          'assets/images/nutricionapp/login-nutri.png'
        ],
        caseStudy: {
          problem: 'Los nutricionistas profesionales carecían de una herramienta digital especializada para gestionar eficientemente a sus pacientes, teniendo que utilizar múltiples aplicaciones inconexas (hojas de cálculo, WhatsApp, correo electrónico). Esto resultaba en pérdida de tiempo, dificultad para hacer seguimiento adecuado y una experiencia fragmentada para los pacientes.',
          solution: 'Desarrollé una aplicación híbrida integral que unifica todo el proceso de atención nutricional, desde la evaluación inicial hasta el seguimiento a largo plazo. La plataforma permite a los nutricionistas gestionar pacientes, crear planes personalizados, monitorear progresos y comunicarse eficientemente, todo desde una única interfaz intuitiva accesible en cualquier dispositivo.',
          process: [
            'Investigación de las necesidades específicas de nutricionistas mediante entrevistas y observación de flujos de trabajo',
            'Desarrollo de wireframes y prototipos en colaboración con profesionales del sector',
            'Diseño de una arquitectura de datos optimizada para información nutricional y antropométrica',
            'Implementación del frontend con Angular, utilizando PrimeNG y Material Design',
            'Desarrollo del backend con Node.js y Deno para manejar la lógica de negocio',
            'Diseño de una base de datos MongoDB para almacenar perfiles, planes y métricas',
            'Pruebas con nutricionistas reales y sus pacientes para iteración y mejora'
          ],
          results: [
            'Aumento del 40% en la productividad de los nutricionistas',
            'Reducción del 70% en el tiempo dedicado a tareas administrativas',
            'Mejora del 60% en la adherencia de pacientes a los planes nutricionales',
            'Incremento del 50% en la capacidad de gestión de pacientes por profesional',
            'Satisfacción del 95% entre los nutricionistas usuarios de la plataforma',
            'Valoración promedio de 4.8/5 en encuestas a pacientes'
          ],
          improvements: [
            'Implementar reconocimiento de alimentos por imagen usando IA',
            'Desarrollar un módulo de planificación automática de menús basado en preferencias',
            'Integrar dispositivos wearables para seguimiento en tiempo real',
            'Añadir funcionalidades de teleconsulta integrada',
            'Crear una comunidad de pacientes para apoyo mutuo y gamificación'
          ]
        }
      },
      {
        id: 7,
        title: 'Fortia',
        description: 'Pagina web para una empresa de consultorías.',
        longDescription: 'Fortia es un sitio web corporativo para una empresa de consultoría empresarial especializada en transformación digital y optimización de procesos. El proyecto abarcó el diseño y desarrollo de un sitio web elegante y profesional que proyecta confianza, experiencia y un enfoque moderno hacia la consultoría.',
        coverImage: 'assets/images/fortia.png',
        date: new Date(),
        category: 'Sitio Web Corporativo',
        technologies: ['Figma', 'Wordpress'],
        features: [
          'Diseño corporativo elegante',
          'Arquitectura de información clara',
          'Presentación detallada de servicios',
          'Casos de éxito interactivos',
          'Formularios de contacto personalizados',
          'Blog corporativo integrado',
          'Panel de administración intuitivo'
        ],
        details: {
          plataforma: 'Web',
          estado: 'Completado',
          audiencia: 'Empresas medianas y grandes',
          precio: 'Proyecto fijo'
        },
        gallery: [
          'assets/images/fortia/landing-fortia.png',
          'assets/images/fortia/services-fortia.png',
          'assets/images/fortia/cases-fortia.png',
          'assets/images/fortia/about-fortia.png',
          'assets/images/fortia/contact-fortia.png'
        ],
        caseStudy: {
          problem: 'Fortia Consulting carecía de presencia digital profesional que reflejara su expertise en consultoría empresarial de alto nivel. Su imagen de marca no estaba definida en el entorno online y no lograban convertir visitantes en leads cualificados, perdiendo oportunidades de negocio frente a competidores con mejor presencia digital.',
          solution: 'Diseñé un sitio web corporativo sofisticado que transmite autoridad y profesionalismo, con enfoque en la conversión. Implementé una arquitectura de información estratégica que guía a los visitantes hacia la acción, destacando la experiencia de Fortia mediante casos de éxito detallados y presentaciones de servicios orientadas a resultados.',
          process: [
            'Análisis de la identidad de marca y posicionamiento deseado en el mercado',
            'Benchmarking de competidores nacionales e internacionales',
            'Diseño de wireframes y prototipos de alta fidelidad en Figma',
            'Creación de una paleta de colores y sistema visual coherente con la imagen corporativa',
            'Desarrollo de contenido estratégico orientado a la conversión',
            'Implementación sobre WordPress con personalización avanzada',
            'Optimización SEO completa con enfoque en palabras clave relevantes para el sector'
          ],
          results: [
            'Incremento del 200% en consultas cualificadas a través del sitio web',
            'Aumento del 70% en el tiempo de permanencia de los usuarios',
            'Mejora significativa del posicionamiento en búsquedas relacionadas con consultoría empresarial',
            'Reducción del 50% en el costo de adquisición de cliente',
            'Conversión de contacto superior al 15% en visitantes de páginas de servicio',
            'Fortalecimiento notable de la imagen de marca en el entorno digital'
          ],
          improvements: [
            'Implementar un sistema de reserva de citas para consultas iniciales',
            'Desarrollar una sección interactiva de autodiagnóstico empresarial',
            'Añadir testimoniales en video de clientes destacados',
            'Crear versiones del sitio en múltiples idiomas para expansión internacional',
            'Implementar un sistema de webinars y eventos virtuales integrado'
          ]
        }
      },
      {
        id: 8,
        title: 'Xipher, Xlead',
        description: 'Re diseño y desarrollo del front de nuevas aplicaciones en la empresa que trabajo.',
        longDescription: 'Xipher y XLead son plataformas empresariales interconectadas para gestión de recursos y liderazgo, respectivamente. El proyecto consistió en rediseñar completamente la experiencia de usuario y reconstruir el frontend de estas aplicaciones críticas, modernizando la interfaz y optimizando los flujos de trabajo para los usuarios corporativos.',
        coverImage: 'assets/images/hexapps.png',
        date: new Date(),
        category: 'Aplicaciones Empresariales',
        technologies: ['React', 'Typescript', 'Figma'],
        features: [
          'Dashboards interactivos personalizables',
          'Gestión de recursos empresariales',
          'Herramientas de liderazgo y gestión de equipos',
          'Visualización de datos avanzada',
          'Reportes y analíticas en tiempo real',
          'Integración con sistemas empresariales',
          'Experiencia de usuario optimizada para productividad'
        ],
        details: {
          plataforma: 'Web',
          estado: 'Activo',
          audiencia: 'Usuarios corporativos',
          precio: 'Licencia empresarial'
        },
        gallery: [
          'assets/images/xcore/dashboard-xcore.png',
          'assets/images/xcore/resources-xcore.png',
          'assets/images/xlead/teams-xlead.png',
          'assets/images/xlead/reports-xlead.png',
          'assets/images/xcore/settings-xcore.png'
        ],
        caseStudy: {
          problem: 'Las aplicaciones Xipher y XLead de la empresa presentaban interfaces desactualizadas y poco intuitivas que generaban frustración en los usuarios y reducían la productividad. La complejidad innecesaria de la navegación, junto con problemas de rendimiento y falta de coherencia visual, obstaculizaban la adopción y el uso eficiente de estas herramientas críticas para el negocio.',
          solution: 'Lideré el rediseño completo y el desarrollo frontend de ambas aplicaciones, implementando una experiencia de usuario moderna, cohesiva y eficiente. Reorganicé la arquitectura de información, simplifiqué flujos de trabajo complejos y creé un sistema de diseño consistente que se aplica a través de todas las interfaces, mejorando significativamente la usabilidad y el rendimiento.',
          process: [
            'Análisis exhaustivo de la experiencia de usuario existente e identificación de puntos de dolor',
            'Investigación con usuarios finales mediante entrevistas y pruebas de usabilidad',
            'Creación de un sistema de diseño unificado en Figma para mantener consistencia visual',
            'Desarrollo de prototipos interactivos para validar nuevos flujos de trabajo',
            'Implementación frontend con React y TypeScript siguiendo arquitectura de componentes',
            'Optimización de rendimiento para mejorar los tiempos de carga y respuesta',
            'Pruebas iterativas con usuarios reales e implementación de mejoras continuas'
          ],
          results: [
            'Reducción del 75% en tickets de soporte relacionados con la interfaz de usuario',
            'Disminución del 60% en el tiempo necesario para completar tareas frecuentes',
            'Mejora del 90% en la satisfacción de usuario según encuestas internas',
            'Aumento del 40% en la adopción voluntaria de las plataformas',
            'Incremento del 50% en la eficiencia de los equipos que utilizan las aplicaciones',
            'Ahorro estimado de 120 horas-hombre mensuales a nivel organizacional'
          ],
          improvements: [
            'Implementar una versión móvil optimizada para acceso en desplazamientos',
            'Desarrollar un sistema de onboarding interactivo para nuevos usuarios',
            'Crear paneles de analítica avanzada con capacidades predictivas',
            'Añadir funcionalidades de colaboración en tiempo real',
            'Integrar asistentes virtuales basados en IA para tareas repetitivas'
          ]
        }
      }
    ];

    // Find the project by ID
    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      this.project = foundProject;
      
      // Set project details
      if (this.project.details) {
        this.projectDetails = [
          { label: 'Plataforma', value: this.project.details.plataforma },
          { label: 'Estado', value: this.project.details.estado },
          { label: 'Audiencia', value: this.project.details.audiencia },
          { label: 'Precio', value: this.project.details.precio }
        ];
      }
    } else {
      // Fallback to default project if not found
      this.project = projects[0];
      this.projectDetails = [
        { label: 'Plataforma', value: 'Web & Móvil' },
        { label: 'Estado', value: 'En desarrollo' },
        { label: 'Audiencia', value: 'Estudiantes universitarios' },
        { label: 'Precio', value: '$5/mes' }
      ];
    }
  }

  openGalleryImage(imageUrl: string) {
    console.log('Opening image:', imageUrl);
  }

  goBack() {
    this.location.back();
  }
}