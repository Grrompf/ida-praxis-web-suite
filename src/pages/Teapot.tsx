import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Home, Phone, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { practice } from "@/config/practice";
import teapotImage from "@/assets/418-team.webp";

const Teapot = () => {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoNodesRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    document.title = `418 – ${t("teapot.title")}`;
  }, [t]);

  const stopMusic = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    // Sanftes Ausfaden, dann Knoten stoppen
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0.0001, now + 0.6);
    const oscs = oscillatorsRef.current;
    const lfos = lfoNodesRef.current;
    setTimeout(() => {
      oscs.forEach((o) => {
        try { o.stop(); o.disconnect(); } catch { /* noop */ }
      });
      lfos.forEach((o) => {
        try { o.stop(); o.disconnect(); } catch { /* noop */ }
      });
      oscillatorsRef.current = [];
      lfoNodesRef.current = [];
    }, 700);
    setPlaying(false);
  }, []);

  const startMusic = useCallback(() => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = ctxRef.current ?? new AudioCtx();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    masterRef.current = master;

    // Sanfter C-Dur-Akkord (C4, E4, G4, C5) als atmender Drone
    const frequencies = [261.63, 329.63, 392.0, 523.25];
    const oscs: OscillatorNode[] = [];
    const lfos: OscillatorNode[] = [];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 3 ? "triangle" : "sine";
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      gain.gain.value = 0.12 - i * 0.015; // Höhere Töne leiser

      // LFO für sanftes "Atmen" der Lautstärke
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1 + i * 0.03; // sehr langsam, leicht versetzt
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.04;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(master);

      osc.start();
      lfo.start();
      oscs.push(osc);
      lfos.push(lfo);
    });

    oscillatorsRef.current = oscs;
    lfoNodesRef.current = lfos;

    // Sanftes Einfaden auf moderates Niveau
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.35, now + 1.5);

    setPlaying(true);
  }, []);

  const toggleMusic = useCallback(() => {
    if (playing) stopMusic();
    else startMusic();
  }, [playing, startMusic, stopMusic]);

  // Cleanup beim Verlassen der Seite
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((o) => {
        try { o.stop(); o.disconnect(); } catch { /* noop */ }
      });
      lfoNodesRef.current.forEach((o) => {
        try { o.stop(); o.disconnect(); } catch { /* noop */ }
      });
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        ctxRef.current.close().catch(() => { /* noop */ });
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4 py-12">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              {t("teapot.label")}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">418</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("teapot.title")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              {t("teapot.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="w-4 h-4" aria-hidden="true" />
                  {t("teapot.cta_home")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${practice.phoneFull}`}>
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {t("teapot.cta_call")}
                </a>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="ghost"
                onClick={toggleMusic}
                aria-pressed={playing}
                aria-label={playing ? t("teapot.music_stop") : t("teapot.music_play")}
                title={playing ? t("teapot.music_stop") : t("teapot.music_play")}
              >
                {playing ? (
                  <VolumeX className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="sr-only sm:not-sr-only">
                  {playing ? t("teapot.music_stop") : t("teapot.music_play")}
                </span>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={teapotImage}
              alt={t("teapot.image_alt")}
              className="w-full h-auto rounded-2xl shadow-lg"
              width={1200}
              height={896}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Teapot;
