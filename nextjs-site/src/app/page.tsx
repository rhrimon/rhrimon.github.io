import Header from '@/components/Header';
import IntroSection from '@/components/IntroSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <IntroSection />
      
      {/* Placeholder sections for future implementation */}
      <section id="work" className="section">
        <div className="container">
          <h2 className="text-4xl font-semibold mb-8">Work</h2>
          <p className="text-gray-300">Work section content will go here.</p>
        </div>
      </section>
      
      <section id="values" className="section">
        <div className="container">
          <h2 className="text-4xl font-semibold mb-8">Values</h2>
          <p className="text-gray-300">Values section content will go here.</p>
        </div>
      </section>
      
      <section id="about" className="section">
        <div className="container">
          <h2 className="text-4xl font-semibold mb-8">About</h2>
          <p className="text-gray-300">About section content will go here.</p>
        </div>
      </section>
      
      <section id="contact" className="section">
        <div className="container">
          <h2 className="text-4xl font-semibold mb-8">Contact</h2>
          <p className="text-gray-300">Contact section content will go here.</p>
        </div>
      </section>
    </main>
  );
}
