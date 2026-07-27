"use client";

import { useEffect, useState } from "react";
import { type Language, translatePage } from "./i18n";

const whatsapp = "https://wa.me/573215055649";

const WhatsAppLogo = () => (
  <svg className="whatsapp-logo" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.045 21.433h-.004a9.38 9.38 0 0 1-4.779-1.307l-.342-.203-3.552.932.948-3.461-.223-.356a9.36 9.36 0 0 1-1.436-4.993c.002-5.17 4.209-9.377 9.388-9.377 2.506.001 4.861.978 6.632 2.75a9.32 9.32 0 0 1 2.748 6.633c-.002 5.17-4.209 9.377-9.38 9.382m7.985-17.37A11.21 11.21 0 0 0 12.05.754C5.842.754.792 5.804.79 12.012c0 1.984.518 3.92 1.503 5.625L.695 23.486l5.982-1.569a11.25 11.25 0 0 0 5.368 1.366h.005c6.206 0 11.256-5.05 11.259-11.258a11.18 11.18 0 0 0-3.279-7.962"/>
  </svg>
);

const Icon = ({ name }: { name: "arrow" | "check" | "star" | "menu" | "close" }) => {
  const paths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    star: <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("tours-habib-language") as Language | null;
    const detected: Language = navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
    setLanguage(saved === "es" || saved === "en" ? saved : detected);
  }, []);

  useEffect(() => {
    translatePage(language);
    window.localStorage.setItem("tours-habib-language", language);
  }, [language, sent, menuOpen]);

  const reviews = [
    ["“Habib entendió exactamente lo que queríamos. El montaje, la música y la atención fueron increíbles. Se sintió exclusivo de principio a fin.”","Valentina R.","Cumpleaños privado"],
    ["“La mejor noche de nuestro viaje a Cartagena. El yate era espectacular y no tuvimos que preocuparnos por absolutamente nada.”","Andrés M.","Fiesta en la bahía"],
    ["“Organizaron nuestra cena a bordo con muchísimo gusto. La comida, el atardecer y cada detalle superaron lo que imaginábamos.”","Camila & Daniel","Cena especial"],
    ["“La tripulación fue muy atenta y la ruta por las islas fue preciosa. Todo estaba listo cuando llegamos.”","Mariana G.","Día en las islas"],
    ["“Celebramos la despedida de mi hermana y fue perfecta. Buena música, cocteles y un servicio excelente.”","Sofía T.","Despedida privada"],
    ["“Habib armó una fiesta increíble para nuestro grupo. La música, las anfitrionas y el servicio mantuvieron el ambiente arriba toda la noche.”","Carlos P.","Fiesta con amigos"],
    ["“La propuesta de matrimonio salió mejor de lo que soñé. Cuidaron cada detalle y el atardecer fue mágico.”","Felipe & Laura","Propuesta a bordo"],
    ["“Una experiencia impecable desde la salida hasta el regreso. Sin duda lo repetiríamos en Cartagena.”","Natalia S.","Celebración con amigos"]
  ];

  function sendForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hola Habib, quiero cotizar una fiesta privada en Cartagena.%0A%0ANombre: ${data.get("nombre")}%0AFecha: ${data.get("fecha") || "Por definir"}%0AInvitados: ${data.get("invitados")}%0ATipo de fiesta: ${data.get("experiencia")}%0AMensaje: ${data.get("mensaje") || "Quiero conocer opciones y disponibilidad."}`;
    setSent(true);
    window.open(`${whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={`header${headerScrolled ? " scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Tours Habib, inicio">
          <span className="brand-mark">TH</span>
          <span><b>TOURS HABIB</b><small>PRIVATE PARTY EXPERIENCES</small></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegación principal">
          <a href="#experiencias" onClick={closeMenu}>Experiencias</a>
          <a href="#incluye" onClick={closeMenu}>Qué incluye</a>
          <a href="#galeria" onClick={closeMenu}>Galería</a>
          <a href="#resenas" onClick={closeMenu}>Reseñas</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>
        <a className="button button-small header-cta" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20cotizar%20una%20fiesta%20privada%20en%20Cartagena`} target="_blank" rel="noreferrer">Cotizar mi fiesta</a>
        <div className="language-switch" role="group" aria-label="Language selector">
          <button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}>ES</button>
          <span>/</span>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen}>
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Cartagena · Colombia</p>
          <h1>Tu fiesta.<br /><em>Tu escenario. Tu momento.</em></h1>
          <p className="hero-copy">Producimos fiestas privadas en yates, islas, fincas y cabañas donde todo está pensado para sorprender: ambiente, animación, música, anfitriones, comida y bebidas. Tú eliges el escenario. Nosotros hacemos que la celebración sea inolvidable.</p>
          <div className="hero-actions">
            <a className="button" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20organizar%20una%20fiesta%20privada%20en%20Cartagena`} target="_blank" rel="noreferrer">Diseñar mi fiesta <Icon name="arrow" /></a>
            <a className="text-link" href="#experiencias">Descubrir experiencias <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <div><strong>Escenarios</strong><span>Yates · Islas · Fincas</span></div>
            <div><strong>Servicio</strong><span>Producción completa</span></div>
            <div><strong>Destino</strong><span>Cartagena & alrededores</span></div>
          </div>
        </div>
        <span className="scroll-line" />
      </section>

      <section className="intro section">
        <p className="eyebrow gold">La experiencia Habib</p>
        <div className="intro-grid">
          <h2>Creamos tu fiesta privada.<br /><em>Tú eliges el escenario.</em></h2>
          <div>
            <p>Transformamos yates, islas, fincas y cabañas en el escenario de una celebración diseñada alrededor de tu grupo, tu estilo y la energía que quieres vivir.</p>
            <p>Coordinamos el lugar, anfitriones y animadores adultos, DJ, ambientación, coctelería, catering, transporte, seguridad y cada detalle para que la fiesta fluya de principio a fin.</p>
          </div>
        </div>
      </section>

      <section className="services section" id="experiencias">
        <div className="section-heading">
          <div><p className="eyebrow gold">Producción a tu medida</p><h2>Un concepto.<br /><em>Infinitos escenarios.</em></h2></div>
          <p>Diseñamos la celebración completa en el escenario que prefieras y reunimos al equipo, el ambiente y los servicios que harán inolvidable tu experiencia en Cartagena.</p>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <img src="/images/night-party.webp" alt="Fiesta privada nocturna en un yate frente a Cartagena" loading="lazy" decoding="async" />
            <div className="card-overlay" />
            <span className="number">01</span><span className="tag">Experiencia insignia</span>
            <div className="card-copy"><h3>Fiestas privadas<br />en yates</h3><p>Una producción de lujo sobre el mar con DJ, animación, catering, bebidas y coordinación completa.</p><a href={`${whatsapp}?text=Hola%20Habib,%20quiero%20una%20fiesta%20privada%20en%20yate`} target="_blank" rel="noreferrer">Celebrar en el mar <Icon name="arrow" /></a></div>
          </article>
          <article className="service-card">
            <img src="/images/island-party.webp" alt="Fiesta privada de lujo en una isla cerca de Cartagena" loading="lazy" decoding="async" />
            <div className="card-overlay" />
            <span className="number">02</span>
            <div className="card-copy"><h3>Fiestas privadas<br />en islas</h3><p>Playas reservadas, música, cócteles y montaje tropical para celebrar con total libertad frente al Caribe.</p><a href={`${whatsapp}?text=Hola%20Habib,%20quiero%20una%20fiesta%20privada%20en%20una%20isla`} target="_blank" rel="noreferrer">Celebrar en una isla <Icon name="arrow" /></a></div>
          </article>
          <article className="service-card">
            <img src="/images/finca-party.webp" alt="Fiesta privada con piscina en una finca de lujo en Cartagena" loading="lazy" decoding="async" />
            <div className="card-overlay" />
            <span className="number">03</span>
            <div className="card-copy"><h3>Fiestas privadas<br />en fincas</h3><p>Piscina, zonas amplias y una producción completa para cumpleaños, despedidas y celebraciones sin límites.</p><a href={`${whatsapp}?text=Hola%20Habib,%20quiero%20una%20fiesta%20privada%20en%20una%20finca`} target="_blank" rel="noreferrer">Celebrar en una finca <Icon name="arrow" /></a></div>
          </article>
          <article className="service-card">
            <img src="/images/cabin-party.webp" alt="Fiesta privada nocturna en una cabaña tropical de lujo" loading="lazy" decoding="async" />
            <div className="card-overlay" />
            <span className="number">04</span>
            <div className="card-copy"><h3>Fiestas privadas<br />en cabañas</h3><p>Un ambiente íntimo entre naturaleza, iluminación, música, gastronomía y alojamiento para vivir la noche a tu ritmo.</p><a href={`${whatsapp}?text=Hola%20Habib,%20quiero%20una%20fiesta%20privada%20en%20una%20cabana`} target="_blank" rel="noreferrer">Celebrar en una cabaña <Icon name="arrow" /></a></div>
          </article>
        </div>
      </section>

      <section className="tiers section" id="niveles">
        <div className="section-heading">
          <div><p className="eyebrow gold">Niveles de experiencia</p><h2>Elige cómo quieres<br /><em>vivirlo.</em></h2></div>
          <p>Dos niveles de producción para adaptar la fiesta a la exclusividad, el servicio y el impacto que quieres ofrecer a tus invitados.</p>
        </div>
        <div className="tier-grid">
          <article className="tier-card">
            <span className="tier-index">01</span>
            <p className="tier-label">Luxury</p>
            <h3>Luxury</h3>
            <p className="tier-description">Una celebración premium con todos los elementos esenciales coordinados por un solo equipo.</p>
            <ul>
              {["Escenario premium seleccionado","DJ, sonido y ambientación","Anfitriones y animación","Catering y barra premium","Producción y coordinación integral"].map(item => <li key={item}><Icon name="check" />{item}</li>)}
            </ul>
            <a className="button button-outline" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20cotizar%20la%20experiencia%20Luxury`} target="_blank" rel="noreferrer">Cotizar Luxury <Icon name="arrow" /></a>
          </article>
          <article className="tier-card ultra">
            <span className="tier-index">02</span>
            <p className="tier-label">Ultra Luxury</p>
            <span className="tier-badge">Máxima exclusividad</span>
            <h3>Ultra Luxury</h3>
            <p className="tier-description">Una producción completamente a medida, con atención privada y detalles extraordinarios de principio a fin.</p>
            <ul>
              {["Selección prioritaria del escenario","Diseño y decoración de alto impacto","Entretenimiento y talentos especiales","Gastronomía y bebidas de categoría superior","Concierge y coordinación privada"].map(item => <li key={item}><Icon name="check" />{item}</li>)}
            </ul>
            <a className="button" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20cotizar%20la%20experiencia%20Ultra%20Luxury`} target="_blank" rel="noreferrer">Cotizar Ultra Luxury <Icon name="arrow" /></a>
          </article>
        </div>
      </section>

      <section className="included section" id="incluye">
        <div className="included-photo"><img src="/images/party-production-catering.webp" alt="Fiesta privada producida por Tours Habib con animación, coctelería y catering" loading="lazy" decoding="async" /><span className="frame frame-one" /><span className="frame frame-two" /></div>
        <div className="included-copy">
          <p className="eyebrow gold">Donde quieras celebrar</p>
          <h2>Detalles impecables.<br /><em>Cero preocupaciones.</em></h2>
          <p className="lead">Producimos tu fiesta en el escenario ideal, de principio a fin, para que solo tengas que llegar, brindar y disfrutar con tus invitados.</p>
          <div className="check-grid">
            {["Selección del escenario","Logística y transporte","Anfitriones y animadores","DJ y sistema de sonido","Decoración personalizada","Menú y catering","Bebidas y coctelería","Coordinación del evento"].map(item => <span key={item}><i><Icon name="check" /></i>{item}</span>)}
          </div>
          <a className="button button-outline" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20personalizar%20mi%20experiencia`} target="_blank" rel="noreferrer">Personalizar mi plan <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="process section">
        <div className="section-heading compact"><div><p className="eyebrow gold">Así de fácil</p><h2>Del primer mensaje<br /><em>al momento perfecto.</em></h2></div></div>
        <div className="steps">
          {[["01","Cuéntanos tu idea","Fecha, invitados, ocasión y el tipo de ambiente que quieres vivir."],["02","Elegimos tu escenario","Creamos el concepto y coordinamos el lugar, la logística, animación, música, catering y bebidas."],["03","Confirma y celebra","Reserva tu fecha y llega listo para disfrutarlo todo."]].map(([n,t,d]) => <article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}
        </div>
      </section>

      <section className="gallery" id="galeria">
        <div className="gallery-heading"><p className="eyebrow">Momentos Habib</p><h2>Cada escenario cambia.<br /><em>La energía permanece.</em></h2></div>
        <div className="gallery-grid">
          <img src="/images/hero-yacht-party.webp" alt="Amigos celebrando al atardecer en un yate en Cartagena" loading="lazy" decoding="async" />
          <img src="/images/night-party.webp" alt="Fiesta nocturna en yate con Cartagena iluminada" loading="lazy" decoding="async" />
          <img src="/images/party-hosts.webp" alt="Animación premium en una fiesta privada" loading="lazy" decoding="async" />
          <img src="/images/private-event.webp" alt="Catering y celebración privada producida por Tours Habib" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="reviews section" id="resenas">
        <div className="section-heading"><div><p className="eyebrow gold">Lo que dicen nuestros invitados</p><h2>Recuerdos que siguen<br /><em>brillando después.</em></h2></div><div className="rating"><strong>5.0</strong><span>{[1,2,3,4,5].map(i=><Icon key={i} name="star" />)}</span><small>Experiencias memorables</small></div></div>
        <div className="review-carousel" aria-label="Reseñas de clientes">
          <div className="review-track">
            {[...reviews, ...reviews].map(([quote,name,type],index) => <article key={`${name}-${index}`} aria-hidden={index >= reviews.length}><div className="stars">{[1,2,3,4,5].map(i=><Icon key={i} name="star" />)}</div><blockquote>{quote}</blockquote><div className="reviewer"><span>{name.charAt(0)}</span><p><b>{name}</b><small>{type}</small></p></div></article>)}
          </div>
        </div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow gold">Tu celebración empieza aquí</p>
          <h2>Hablemos de<br /><em>tu próximo momento.</em></h2>
          <p>Cuéntanos cómo imaginas la fiesta y dónde quieres vivirla. Habib organizará el escenario, la logística, el entretenimiento, el catering, las bebidas y todo lo necesario para hacerla realidad.</p>
          <a className="whatsapp-contact" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20cotizar%20una%20experiencia`} target="_blank" rel="noreferrer"><i><WhatsAppLogo /></i><span><small>WhatsApp directo</small><strong>+57 321 505 5649</strong></span></a>
          <div className="contact-meta"><span><small>Ubicación</small>Cartagena de Indias</span><span><small>Atención</small>Todos los días</span></div>
        </div>
        <form className="contact-form" onSubmit={sendForm}>
          <div className="field-row"><label>Nombre completo<input required name="nombre" placeholder="Tu nombre" /></label><label>Fecha del evento<input name="fecha" type="date" /></label></div>
          <div className="field-row"><label>Número de invitados<input required min="1" name="invitados" type="number" placeholder="Ej. 12" /></label><label>Tipo de experiencia<select name="experiencia" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Experiencia Luxury</option><option>Experiencia Ultra Luxury</option><option>Fiesta privada en yate</option><option>Fiesta privada en isla</option><option>Fiesta privada en finca</option><option>Fiesta privada en cabaña</option><option>Quiero que me recomienden un escenario</option></select></label></div>
          <label>Cuéntanos tu idea<textarea name="mensaje" rows={4} placeholder="¿Qué quieres celebrar? ¿Tienes alguna idea especial?" /></label>
          <button className="button form-button" type="submit">Enviar por WhatsApp <Icon name="arrow" /></button>
          <small className="privacy">{sent ? "WhatsApp abierto. Envía el mensaje para completar tu solicitud." : "Al enviar, abriremos WhatsApp con los datos de tu solicitud."}</small>
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#inicio"><span className="brand-mark">TH</span><span><b>TOURS HABIB</b><small>PRIVATE PARTY EXPERIENCES</small></span></a>
          <p>Producción de fiestas privadas en yates, islas, fincas y cabañas en Cartagena de Indias.</p>
          <nav><a href="#experiencias">Experiencias</a><a href="#incluye">Qué incluye</a><a href="#galeria">Galería</a><a href="#resenas">Reseñas</a><a href="#contacto">Contacto</a></nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Tours Habib. Todos los derechos reservados.</span><span>Cartagena · Colombia</span></div>
      </footer>

      <a className="floating-wa" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20informacion%20sobre%20una%20fiesta%20privada%20en%20Cartagena`} target="_blank" rel="noreferrer" aria-label="Hablar con Habib por WhatsApp"><WhatsAppLogo /><span>Habla con Habib</span></a>
    </main>
  );
}
