// Root app
const useEffect = React.useEffect;
const useState = React.useState;

function App() {
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    window.registerDetailCallback(setDetailId);
    return () => window.registerDetailCallback(null);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Nav />
      <window.HUDOverlay />
      <main id="main">
        <Hero />
        <LabSection />
        <CodeSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />

      {detailId && <window.DetailModal id={detailId} onClose={() => setDetailId(null)} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
