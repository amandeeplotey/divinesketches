import CallToAction from '../components/CallToAction';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <CallToAction />
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>Welcome to Divine Sketches ✨</h1>
        <p>Your personalized soulmate sketch will appear here after purchase.</p>
        <button style={{ padding: "10px 20px", background: "#7f5af0", color: "white", border: "none", borderRadius: "5px" }}>
          Pay ₹499
        </button>
      </div>
      <Footer />
    </>
  );
}
