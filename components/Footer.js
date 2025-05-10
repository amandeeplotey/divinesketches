export default function Footer() {
  return (
    <footer style={{ background: '#f0f0f0', padding: '1rem', textAlign: 'center', marginTop: '2rem' }}>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>© {new Date().getFullYear()} Divine Sketches. All rights reserved.</p>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        <a href="mailto:support@divinesketches.com" style={{ color: '#6c2bd9' }}>support@divinesketches.com</a>
      </p>
    </footer>
  );
}
