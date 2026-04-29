// Root app — wires Tweaks to design knobs
const useEffect = React.useEffect;
const useState = React.useState;

const TWEAK_DEFAULTS = {
  "density": "comfortable",
  "accentBlue": "#3b82f6"
};

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('density--compact', tweaks.density === 'compact');
    document.documentElement.style.setProperty('--blue', tweaks.accentBlue);
  }, [tweaks.density, tweaks.accentBlue]);

  useEffect(() => {
    window.registerDetailCallback(setDetailId);
    return () => window.registerDetailCallback(null);
  }, []);

  return (
    <>
      <Nav />
      <window.HUDOverlay />
      <main>
        <Hero />
        <LabSection />
        <CodeSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />

      {detailId && <window.DetailModal id={detailId} onClose={() => setDetailId(null)} />}

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Density">
          <window.TweakRadio
            label="Spacing"
            value={tweaks.density}
            options={[
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'compact', label: 'Compact' },
            ]}
            onChange={(v) => setTweak('density', v)}
          />
        </window.TweakSection>

        <window.TweakSection label="Theme">
          <window.TweakColor
            label="Primary accent"
            value={tweaks.accentBlue}
            onChange={(v) => setTweak('accentBlue', v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
