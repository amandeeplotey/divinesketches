import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav style={{ background: '#f2f2f2', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/logo.png" alt="Divine Sketches Logo" width={40} height={40} style={{ borderRadius: '8px' }} />
        <h2 style={{ marginLeft: '0.5rem', color: '#6c2bd9' }}>Divine Sketches</h2>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/how-it-works">How It Works</Link></li>
        <li><Link href="/policies">Policies</Link></li>
        <li><Link href="/faq">FAQs</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
