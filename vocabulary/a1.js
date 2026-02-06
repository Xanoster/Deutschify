// A1 Level Vocabulary - Beginner (Basic phrases & greetings)
// ~60 common words for beginners

const VOCAB_A1 = [
    // Greetings & Basic Phrases
    { english: "hello", german: "Hallo", partOfSpeech: "interjection" },
    { english: "goodbye", german: "Tschüss", partOfSpeech: "interjection" },
    { english: "please", german: "bitte", partOfSpeech: "adverb" },
    { english: "thanks", german: "Danke", partOfSpeech: "interjection" },
    { english: "yes", german: "ja", partOfSpeech: "adverb" },
    { english: "no", german: "nein", partOfSpeech: "adverb" },

    // People
    { english: "man", german: "Mann", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Männer" },
    { english: "woman", german: "Frau", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Frauen" },
    { english: "child", german: "Kind", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Kinder" },
    { english: "friend", german: "Freund", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Freunde" },
    { english: "family", german: "Familie", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Familien" },
    { english: "mother", german: "Mutter", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Mütter" },
    { english: "father", german: "Vater", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Väter" },

    // Common Objects
    { english: "house", german: "Haus", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Häuser" },
    { english: "water", german: "Wasser", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "food", german: "Essen", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "book", german: "Buch", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Bücher" },
    { english: "table", german: "Tisch", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Tische" },
    { english: "chair", german: "Stuhl", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Stühle" },
    { english: "door", german: "Tür", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Türen" },
    { english: "window", german: "Fenster", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Fenster" },

    // Numbers (as words)
    { english: "one", german: "eins", partOfSpeech: "number" },
    { english: "two", german: "zwei", partOfSpeech: "number" },
    { english: "three", german: "drei", partOfSpeech: "number" },

    // Time
    { english: "today", german: "heute", partOfSpeech: "adverb" },
    { english: "tomorrow", german: "morgen", partOfSpeech: "adverb" },
    { english: "now", german: "jetzt", partOfSpeech: "adverb" },
    { english: "day", german: "Tag", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Tage" },
    { english: "night", german: "Nacht", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Nächte" },
    { english: "morning", german: "Morgen", partOfSpeech: "noun", gender: "masculine", article: "der" },
    { english: "evening", german: "Abend", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Abende" },

    // Common Verbs (infinitive)
    { english: "eat", german: "essen", partOfSpeech: "verb" },
    { english: "drink", german: "trinken", partOfSpeech: "verb" },
    { english: "sleep", german: "schlafen", partOfSpeech: "verb" },
    { english: "go", german: "gehen", partOfSpeech: "verb" },
    { english: "come", german: "kommen", partOfSpeech: "verb" },
    { english: "see", german: "sehen", partOfSpeech: "verb" },
    { english: "hear", german: "hören", partOfSpeech: "verb" },
    { english: "speak", german: "sprechen", partOfSpeech: "verb" },
    { english: "read", german: "lesen", partOfSpeech: "verb" },
    { english: "write", german: "schreiben", partOfSpeech: "verb" },

    // Adjectives
    { english: "good", german: "gut", partOfSpeech: "adjective" },
    { english: "bad", german: "schlecht", partOfSpeech: "adjective" },
    { english: "big", german: "groß", partOfSpeech: "adjective" },
    { english: "small", german: "klein", partOfSpeech: "adjective" },
    { english: "new", german: "neu", partOfSpeech: "adjective" },
    { english: "old", german: "alt", partOfSpeech: "adjective" },
    { english: "hot", german: "heiß", partOfSpeech: "adjective" },
    { english: "cold", german: "kalt", partOfSpeech: "adjective" },

    // Places
    { english: "city", german: "Stadt", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Städte" },
    { english: "country", german: "Land", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Länder" },
    { english: "street", german: "Straße", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Straßen" },
    { english: "school", german: "Schule", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Schulen" },
    { english: "office", german: "Büro", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Büros" },

    // Colors
    { english: "red", german: "rot", partOfSpeech: "adjective" },
    { english: "blue", german: "blau", partOfSpeech: "adjective" },
    { english: "green", german: "grün", partOfSpeech: "adjective" },
    { english: "white", german: "weiß", partOfSpeech: "adjective" },
    { english: "black", german: "schwarz", partOfSpeech: "adjective" },

    // Pronouns & Articles (for context, usually not replaced)
    { english: "here", german: "hier", partOfSpeech: "adverb" },
    { english: "there", german: "dort", partOfSpeech: "adverb" }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.VOCAB_A1 = VOCAB_A1;
}
