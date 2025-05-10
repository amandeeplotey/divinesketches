export default function Header() {
  return (
    <header style={{ background: '#6c2bd9', padding: '1rem', color: 'white', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Divine Sketches</h1>
      <nav style={{ marginTop: '0.5rem' }}>
        <a href="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Home</a>
        <a href="/policies" style={{ color: 'white', textDecoration: 'none' }}>Policies</a>
      </nav>
    </header>
  );
}
