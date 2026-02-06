// B1 Level Vocabulary - Intermediate (Everyday topics)
// ~60 words for intermediate learners

const VOCAB_B1 = [
    // Abstract Concepts
    { english: "experience", german: "Erfahrung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Erfahrungen" },
    { english: "opinion", german: "Meinung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Meinungen" },
    { english: "problem", german: "Problem", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Probleme" },
    { english: "solution", german: "Lösung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Lösungen" },
    { english: "question", german: "Frage", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Fragen" },
    { english: "idea", german: "Idee", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Ideen" },
    { english: "reason", german: "Grund", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Gründe" },
    { english: "result", german: "Ergebnis", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Ergebnisse" },

    // Education & Career
    { english: "education", german: "Bildung", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "university", german: "Universität", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Universitäten" },
    { english: "career", german: "Karriere", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Karrieren" },
    { english: "company", german: "Firma", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Firmen" },
    { english: "meeting", german: "Besprechung", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Besprechungen" },
    { english: "project", german: "Projekt", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Projekte" },

    // Technology
    { english: "computer", german: "Computer", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Computer" },
    { english: "phone", german: "Telefon", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Telefone" },
    { english: "internet", german: "Internet", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "message", german: "Nachricht", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Nachrichten" },
    { english: "website", german: "Webseite", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Webseiten" },

    // Verbs - Actions
    { english: "explain", german: "erklären", partOfSpeech: "verb" },
    { english: "understand", german: "verstehen", partOfSpeech: "verb" },
    { english: "believe", german: "glauben", partOfSpeech: "verb" },
    { english: "decide", german: "entscheiden", partOfSpeech: "verb" },
    { english: "discuss", german: "besprechen", partOfSpeech: "verb" },
    { english: "suggest", german: "vorschlagen", partOfSpeech: "verb" },
    { english: "remember", german: "erinnern", partOfSpeech: "verb" },
    { english: "forget", german: "vergessen", partOfSpeech: "verb" },
    { english: "develop", german: "entwickeln", partOfSpeech: "verb" },
    { english: "improve", german: "verbessern", partOfSpeech: "verb" },
    { english: "compare", german: "vergleichen", partOfSpeech: "verb" },
    { english: "prepare", german: "vorbereiten", partOfSpeech: "verb" },

    // Adjectives - Qualities
    { english: "important", german: "wichtig", partOfSpeech: "adjective" },
    { english: "difficult", german: "schwierig", partOfSpeech: "adjective" },
    { english: "easy", german: "einfach", partOfSpeech: "adjective" },
    { english: "possible", german: "möglich", partOfSpeech: "adjective" },
    { english: "necessary", german: "notwendig", partOfSpeech: "adjective" },
    { english: "different", german: "unterschiedlich", partOfSpeech: "adjective" },
    { english: "similar", german: "ähnlich", partOfSpeech: "adjective" },
    { english: "successful", german: "erfolgreich", partOfSpeech: "adjective" },
    { english: "available", german: "verfügbar", partOfSpeech: "adjective" },
    { english: "interesting", german: "interessant", partOfSpeech: "adjective" },

    // Health
    { english: "health", german: "Gesundheit", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "doctor", german: "Arzt", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Ärzte" },
    { english: "medicine", german: "Medizin", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "sick", german: "krank", partOfSpeech: "adjective" },
    { english: "healthy", german: "gesund", partOfSpeech: "adjective" },

    // Nature & Environment
    { english: "nature", german: "Natur", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "environment", german: "Umwelt", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "mountain", german: "Berg", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Berge" },
    { english: "river", german: "Fluss", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Flüsse" },
    { english: "forest", german: "Wald", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Wälder" },

    // Connectors & Expressions
    { english: "however", german: "jedoch", partOfSpeech: "adverb" },
    { english: "therefore", german: "deshalb", partOfSpeech: "adverb" },
    { english: "actually", german: "eigentlich", partOfSpeech: "adverb" },
    { english: "probably", german: "wahrscheinlich", partOfSpeech: "adverb" },
    { english: "especially", german: "besonders", partOfSpeech: "adverb" },
    { english: "recently", german: "kürzlich", partOfSpeech: "adverb" },
    { english: "already", german: "bereits", partOfSpeech: "adverb" },
    { english: "finally", german: "endlich", partOfSpeech: "adverb" }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.VOCAB_B1 = VOCAB_B1;
}
