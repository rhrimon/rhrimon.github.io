import IntroSection from '@/components/IntroSection';
import WorkSection from '@/components/WorkSection';
import ValuesSection from '@/components/ValuesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <IntroSection />
      <WorkSection />
      <ValuesSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
