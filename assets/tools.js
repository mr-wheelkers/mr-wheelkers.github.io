/* The one place that says which tools are public.
   Set "public" to true when a repository opens: every page then shows the "Public" badge,
   links to GitHub, and drops the "as they will be" note next to the install commands.
   Without JavaScript the pages keep their written default: "Not public yet", no GitHub links. */
window.TOOLS = {
  "daleq":        { public: false, repo: "mr-wheelkers/daleq" },
  "drawingboard": { public: false, repo: "mr-wheelkers/drawingboard" },
  "imgcompare":   { public: false, repo: "mr-wheelkers/imgcompare" },
  "godot-pilot":  { public: false, repo: "mr-wheelkers/godot-pilot" },
  "simq":         { public: false, repo: "mr-wheelkers/simq" }
};
