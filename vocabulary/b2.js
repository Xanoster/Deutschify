// B2 Level Vocabulary - Upper Intermediate (Complex texts)
// ~60 words for upper-intermediate learners

const VOCAB_B2 = [
    // Professional & Business
    { english: "advantage", german: "Vorteil", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Vorteile" },
    { english: "disadvantage", german: "Nachteil", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Nachteile" },
    { english: "strategy", german: "Strategie", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Strategien" },
    { english: "challenge", german: "Herausforderung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Herausforderungen" },
    { english: "opportunity", german: "Gelegenheit", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Gelegenheiten" },
    { english: "responsibility", german: "Verantwortung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Verantwortungen" },
    { english: "competition", german: "Wettbewerb", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Wettbewerbe" },
    { english: "investment", german: "Investition", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Investitionen" },

    // Academic & Research
    { english: "research", german: "Forschung", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "analysis", german: "Analyse", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Analysen" },
    { english: "conclusion", german: "Schlussfolgerung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Schlussfolgerungen" },
    { english: "evidence", german: "Beweis", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Beweise" },
    { english: "theory", german: "Theorie", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Theorien" },
    { english: "hypothesis", german: "Hypothese", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Hypothesen" },
    { english: "phenomenon", german: "Phänomen", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Phänomene" },

    // Society & Politics
    { english: "society", german: "Gesellschaft", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Gesellschaften" },
    { english: "government", german: "Regierung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Regierungen" },
    { english: "democracy", german: "Demokratie", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "citizen", german: "Bürger", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Bürger" },
    { english: "policy", german: "Politik", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "influence", german: "Einfluss", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Einflüsse" },

    // Advanced Verbs
    { english: "achieve", german: "erreichen", partOfSpeech: "verb" },
    { english: "analyze", german: "analysieren", partOfSpeech: "verb" },
    { english: "assume", german: "annehmen", partOfSpeech: "verb" },
    { english: "consider", german: "berücksichtigen", partOfSpeech: "verb" },
    { english: "establish", german: "etablieren", partOfSpeech: "verb" },
    { english: "evaluate", german: "bewerten", partOfSpeech: "verb" },
    { english: "implement", german: "umsetzen", partOfSpeech: "verb" },
    { english: "indicate", german: "hinweisen", partOfSpeech: "verb" },
    { english: "investigate", german: "untersuchen", partOfSpeech: "verb" },
    { english: "maintain", german: "pflegen", partOfSpeech: "verb" },
    { english: "obtain", german: "erhalten", partOfSpeech: "verb" },
    { english: "recognize", german: "erkennen", partOfSpeech: "verb" },
    { english: "require", german: "erfordern", partOfSpeech: "verb" },

    // Nuanced Adjectives
    { english: "significant", german: "bedeutend", partOfSpeech: "adjective" },
    { english: "considerable", german: "erheblich", partOfSpeech: "adjective" },
    { english: "complex", german: "komplex", partOfSpeech: "adjective" },
    { english: "essential", german: "wesentlich", partOfSpeech: "adjective" },
    { english: "relevant", german: "relevant", partOfSpeech: "adjective" },
    { english: "appropriate", german: "angemessen", partOfSpeech: "adjective" },
    { english: "effective", german: "wirksam", partOfSpeech: "adjective" },
    { english: "efficient", german: "effizient", partOfSpeech: "adjective" },
    { english: "obvious", german: "offensichtlich", partOfSpeech: "adjective" },
    { english: "specific", german: "spezifisch", partOfSpeech: "adjective" },
    { english: "fundamental", german: "grundlegend", partOfSpeech: "adjective" },
    { english: "comprehensive", german: "umfassend", partOfSpeech: "adjective" },

    // Abstract Nouns
    { english: "aspect", german: "Aspekt", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Aspekte" },
    { english: "context", german: "Kontext", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Kontexte" },
    { english: "approach", german: "Ansatz", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Ansätze" },
    { english: "structure", german: "Struktur", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Strukturen" },
    { english: "process", german: "Prozess", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Prozesse" },
    { english: "factor", german: "Faktor", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Faktoren" },

    // Discourse Markers
    { english: "nevertheless", german: "dennoch", partOfSpeech: "adverb" },
    { english: "consequently", german: "folglich", partOfSpeech: "adverb" },
    { english: "furthermore", german: "außerdem", partOfSpeech: "adverb" },
    { english: "meanwhile", german: "inzwischen", partOfSpeech: "adverb" },
    { english: "apparently", german: "anscheinend", partOfSpeech: "adverb" },
    { english: "ultimately", german: "letztendlich", partOfSpeech: "adverb" },
    { english: "presumably", german: "vermutlich", partOfSpeech: "adverb" }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.VOCAB_B2 = VOCAB_B2;
}
