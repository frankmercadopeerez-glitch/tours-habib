"use client";

import { useEffect, useState } from "react";
import { type Language, translatePage } from "./i18n";

const whatsapp = "https://wa.me/573215055649";

const Icon = ({ name }: { name: "arrow" | "check" | "star" | "whatsapp" | "menu" | "close" }) => {
  const paths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    star: <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8Z" />,
    whatsapp: <><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" /><path d="M8.3 8.1c.2-.5.4-.5.7-.5h.5l.7 1.7c.1.3 0 .5-.1.7l-.5.6c-.2.2-.1.4 0 .6.7 1.3 1.8 2.3 3.2 2.9.2.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5 0 .3-.2 1.3-.7 1.8-.5.5-1.2.8-2 .7-1.1-.1-2.6-.6-4.4-2.2-2.1-1.8-3.4-4.1-3.5-5.2 0-.5.1-.9.3-1.2Z" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("tours-habib-language") as Language | null;
    const detected: Language = navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
    setLanguage(saved === "es" || saved === "en" ? saved : detected);
  }, []);

  useEffect(() => {
    translatePage(language);
    window.localStorage.setItem("tours-habib-language", language);
  }, [language, sent, menuOpen]);

  function sendForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hola Habib, quiero cotizar una experiencia en yate.%0A%0ANombre: ${data.get("nombre")}%0AFecha: ${data.get("fecha") || "Por definir"}%0AInvitados: ${data.get("invitados")}%0AExperiencia: ${data.get("experiencia")}%0AMensaje: ${data.get("mensaje") || "Quiero conocer opciones y disponibilidad."}`;
    setSent(true);
    window.open(`${whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Tours Habib, inicio">
          <span className="brand-mark">TH</span>
          <span><b>TOURS HABIB</b><small>YACHT EXPERIENCES</small></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegación principal">
          <a href="#experiencias" onClick={closeMenu}>Experiencias</a>
          <a href="#incluye" onClick={closeMenu}>Qué incluye</a>
          <a href="#galeria" onClick={closeMenu}>Galería</a>
          <a href="#resenas" onClick={closeMenu}>Reseñas</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>
        <a className="button button-small header-cta" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20cotizar%20una%20experiencia%20en%20yate`} target="_blank" rel="noreferrer">Cotizar ahora</a>
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
          <h1>Tu fiesta.<br />Tu yate. <em>Tu mar.</em></h1>
          <p className="hero-copy">Creamos celebraciones privadas a bordo donde cada detalle se siente extraordinario. Tú traes a tu gente. Nosotros hacemos que la noche sea inolvidable.</p>
          <div className="hero-actions">
            <a className="button" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20organizar%20una%20fiesta%20privada%20en%20yate`} target="_blank" rel="noreferrer">Diseñar mi experiencia <Icon name="arrow" /></a>
            <a className="text-link" href="#experiencias">Descubrir experiencias <span>↓</span></a>
          </div>
          <div className="hero-proof">
            <div><strong>Experiencias</strong><span>100% privadas</span></div>
            <div><strong>Servicio</strong><span>Personalizado</span></div>
            <div><strong>Destino</strong><span>Cartagena & Islas</span></div>
          </div>
        </div>
        <span className="scroll-line" />
      </section>

      <section className="intro section">
        <p className="eyebrow gold">La experiencia Habib</p>
        <div className="intro-grid">
          <h2>No alquilamos un yate.<br /><em>Creamos tu mejor historia.</em></h2>
          <div>
            <p>Desde una tarde bajo el sol hasta una fiesta nocturna frente a la ciudad amurallada, diseñamos cada salida alrededor de lo que quieres celebrar.</p>
            <p>Yate, tripulación, ambientación, música, comida y bebidas: un solo equipo cuidando cada momento.</p>
          </div>
        </div>
      </section>

      <section className="services section" id="experiencias">
        <div className="section-heading">
          <div><p className="eyebrow gold">Hecho a tu medida</p><h2>Elige cómo quieres<br /><em>vivir el Caribe.</em></h2></div>
          <p>Experiencias privadas, atención cercana y una selección de embarcaciones para cada tipo de celebración.</p>
        </div>
        <div className="service-grid">
          <article className="service-card featured">
            <img src="/images/night-party.png" alt="Fiesta privada nocturna en un yate frente a Cartagena" />
            <div className="card-overlay" />
            <span className="number">01</span><span className="tag">Experiencia insignia</span>
            <div className="card-copy"><h3>Fiestas privadas<br />en yate</h3><p>DJ, ambientación, bebidas y la bahía de Cartagena como escenario.</p><a href={`${whatsapp}?text=Hola%20Habib,%20quiero%20cotizar%20una%20fiesta%20privada%20en%20yate`} target="_blank" rel="noreferrer">Quiero celebrar <Icon name="arrow" /></a></div>
          </article>
          <article className="service-card">
            <img src="/images/boat-rental.png" alt="Bote de lujo navegando por las Islas del Rosario" />
            <div className="card-overlay" />
            <span className="number">02</span>
            <div className="card-copy"><h3>Alquiler de<br />yates y botes</h3><p>Salidas privadas por la bahía y las Islas del Rosario, a tu propio ritmo.</p><a href={`${whatsapp}?text=Hola%20Habib,%20quiero%20ver%20opciones%20de%20yates%20y%20botes`} target="_blank" rel="noreferrer">Ver opciones <Icon name="arrow" /></a></div>
          </article>
          <article className="service-card">
            <img src="/images/private-event.png" alt="Cena y celebración privada a bordo de un yate" />
            <div className="card-overlay" />
            <span className="number">03</span>
            <div className="card-copy"><h3>Eventos, comida<br />y bebidas</h3><p>Cumpleaños, despedidas, cenas, propuestas y momentos que merecen algo especial.</p><a href={`${whatsapp}?text=Hola%20Habib,%20quiero%20organizar%20un%20evento%20con%20comida%20y%20bebidas%20a%20bordo`} target="_blank" rel="noreferrer">Crear mi evento <Icon name="arrow" /></a></div>
          </article>
        </div>
      </section>

      <section className="included section" id="incluye">
        <div className="included-photo"><img src="/images/private-event.png" alt="Montaje gastronómico premium en un yate" /><span className="frame frame-one" /><span className="frame frame-two" /></div>
        <div className="included-copy">
          <p className="eyebrow gold">Nos ocupamos de todo</p>
          <h2>Detalles impecables.<br /><em>Cero preocupaciones.</em></h2>
          <p className="lead">Coordinamos tu experiencia de principio a fin para que solo tengas que llegar y disfrutar.</p>
          <div className="check-grid">
            {["Yate o bote privado","Capitán y tripulación","Hielo y agua a bordo","Sistema de sonido","Decoración personalizada","Menú y catering","Bebidas y coctelería","DJ y entretenimiento"].map(item => <span key={item}><i><Icon name="check" /></i>{item}</span>)}
          </div>
          <a className="button button-outline" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20personalizar%20mi%20experiencia`} target="_blank" rel="noreferrer">Personalizar mi plan <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="process section">
        <div className="section-heading compact"><div><p className="eyebrow gold">Así de fácil</p><h2>Del primer mensaje<br /><em>al momento perfecto.</em></h2></div></div>
        <div className="steps">
          {[["01","Cuéntanos tu idea","Fecha, número de invitados y qué quieres celebrar."],["02","Diseñamos tu plan","Seleccionamos embarcación, ruta y detalles a tu medida."],["03","Confirma y celebra","Reserva tu fecha y llega listo para vivirlo todo."]].map(([n,t,d]) => <article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}
        </div>
      </section>

      <section className="gallery" id="galeria">
        <div className="gallery-heading"><p className="eyebrow">Momentos Habib</p><h2>Cartagena se vive<br /><em>mejor desde el mar.</em></h2></div>
        <div className="gallery-grid">
          <img className="gallery-main" src="/images/hero-yacht-party.png" alt="Amigos celebrando al atardecer en un yate en Cartagena" />
          <img src="/images/night-party.png" alt="Fiesta nocturna en yate con Cartagena iluminada" />
          <img src="/images/boat-rental.png" alt="Bote navegando en aguas del Caribe" />
        </div>
      </section>

      <section className="reviews section" id="resenas">
        <div className="section-heading"><div><p className="eyebrow gold">Lo que dicen nuestros invitados</p><h2>Recuerdos que siguen<br /><em>brillando después.</em></h2></div><div className="rating"><strong>5.0</strong><span>{[1,2,3,4,5].map(i=><Icon key={i} name="star" />)}</span><small>Experiencias memorables</small></div></div>
        <div className="review-grid">
          {[
            ["“Habib entendió exactamente lo que queríamos. El montaje, la música y la atención fueron increíbles. Se sintió exclusivo de principio a fin.”","Valentina R.","Cumpleaños privado"],
            ["“La mejor noche de nuestro viaje a Cartagena. El yate era espectacular y no tuvimos que preocuparnos por absolutamente nada.”","Andrés M.","Fiesta en la bahía"],
            ["“Organizaron nuestra cena a bordo con muchísimo gusto. La comida, el atardecer y cada detalle superaron lo que imaginábamos.”","Camila & Daniel","Cena especial"]
          ].map(([quote,name,type]) => <article key={name}><div className="stars">{[1,2,3,4,5].map(i=><Icon key={i} name="star" />)}</div><blockquote>{quote}</blockquote><div className="reviewer"><span>{name.charAt(0)}</span><p><b>{name}</b><small>{type}</small></p></div></article>)}
        </div>
        <p className="review-note">Reseñas de muestra · Reemplázalas por testimonios verificados a medida que los recibas.</p>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy">
          <p className="eyebrow gold">Tu celebración empieza aquí</p>
          <h2>Hablemos de<br /><em>tu próximo momento.</em></h2>
          <p>Cuéntanos qué tienes en mente. Habib te ayudará a crear una experiencia privada que se sienta exactamente como la imaginaste.</p>
          <a className="whatsapp-contact" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20cotizar%20una%20experiencia`} target="_blank" rel="noreferrer"><i><Icon name="whatsapp" /></i><span><small>WhatsApp directo</small><strong>+57 321 505 5649</strong></span></a>
          <div className="contact-meta"><span><small>Ubicación</small>Cartagena de Indias</span><span><small>Atención</small>Todos los días</span></div>
        </div>
        <form className="contact-form" onSubmit={sendForm}>
          <div className="field-row"><label>Nombre completo<input required name="nombre" placeholder="Tu nombre" /></label><label>Fecha del evento<input name="fecha" type="date" /></label></div>
          <div className="field-row"><label>Número de invitados<input required min="1" name="invitados" type="number" placeholder="Ej. 12" /></label><label>Tipo de experiencia<select name="experiencia" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Fiesta privada en yate</option><option>Alquiler de yate o bote</option><option>Evento con comida y bebidas</option><option>Otra experiencia</option></select></label></div>
          <label>Cuéntanos tu idea<textarea name="mensaje" rows={4} placeholder="¿Qué quieres celebrar? ¿Tienes alguna idea especial?" /></label>
          <button className="button form-button" type="submit">Enviar por WhatsApp <Icon name="arrow" /></button>
          <small className="privacy">{sent ? "WhatsApp abierto. Envía el mensaje para completar tu solicitud." : "Al enviar, abriremos WhatsApp con los datos de tu solicitud."}</small>
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#inicio"><span className="brand-mark">TH</span><span><b>TOURS HABIB</b><small>YACHT EXPERIENCES</small></span></a>
          <p>Experiencias privadas en yates y botes en Cartagena de Indias.</p>
          <nav><a href="#experiencias">Experiencias</a><a href="#incluye">Qué incluye</a><a href="#galeria">Galería</a><a href="#resenas">Reseñas</a><a href="#contacto">Contacto</a></nav>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Tours Habib. Todos los derechos reservados.</span><span>Cartagena · Colombia</span></div>
      </footer>

      <a className="floating-wa" href={`${whatsapp}?text=Hola%20Habib,%20quiero%20información%20sobre%20sus%20experiencias`} target="_blank" rel="noreferrer" aria-label="Hablar con Habib por WhatsApp"><Icon name="whatsapp" /><span>Habla con Habib</span></a>
    </main>
  );
}
