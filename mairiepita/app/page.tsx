import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import QuickAccess from '@/components/QuickAccess';
import MaireSection from '@/components/MaireSection';
import ActualitesRecentes from '@/components/ActualitesRecentes';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <Hero />
      <div style={{ backgroundColor: '#f5f5f5', paddingTop: '48px', paddingBottom: '0' }}>
        <QuickAccess />
      </div>
      <MaireSection />
      <ActualitesRecentes />
      <Footer />
    </main>
  );
}
