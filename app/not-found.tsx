import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';

export default function NotFound() {
  return (
    <div className="soft-page">
      <main className="soft-main">
        <section>
          <p className="soft-prompt">guest@mda ~ $ cd ruta</p>
          <h1>404</h1>
          <p>No existe esa ruta · page not found</p>
          <div className="soft-actions">
            <Link className="soft-btn" href="/">Volver al inicio</Link>
            <Link className="soft-btn alt" href="/cv/es">CV</Link>
          </div>
        </section>
      </main>
      <SiteFooter lang="es" />
    </div>
  );
}
