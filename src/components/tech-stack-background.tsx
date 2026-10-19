const rows = [
  ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "JAVASCRIPT", "HTML", "CSS"],
  ["NODE.JS", "EXPRESS", "REST API", "FIREBASE", "MONGODB", "REDIS", "WEBSOCKETS"],
  ["GIT", "GITHUB", "VERCEL", "DOCKER", "POSTMAN", "FIGMA","POSTGRESQL"],
];

export default function TechStackBackground() {
  return (
    <div className="tech-field pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="tech-field-glow" />
      <div className="absolute inset-0 flex -rotate-6 flex-col justify-center gap-7 opacity-[0.16] sm:gap-10">
        {rows.map((row, index) => (
          <div key={row[0]} className={`tech-track ${index % 2 ? "tech-track-reverse" : ""}`}>
            {[...row, ...row].map((tech, techIndex) => <span key={`${tech}-${techIndex}`} className="tech-word">{tech}<i /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
