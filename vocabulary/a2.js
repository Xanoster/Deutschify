// A2 Level Vocabulary - Elementary (Everyday expressions)
// ~60 words for elementary learners

const VOCAB_A2 = [
    // Daily Life
    { english: "breakfast", german: "Frühstück", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "lunch", german: "Mittagessen", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "dinner", german: "Abendessen", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "coffee", german: "Kaffee", partOfSpeech: "noun", gender: "masculine", article: "der" },
    { english: "tea", german: "Tee", partOfSpeech: "noun", gender: "masculine", article: "der" },
    { english: "bread", german: "Brot", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Brote" },
    { english: "milk", german: "Milch", partOfSpeech: "noun", gender: "feminine", article: "die" },

    // Travel & Transport
    { english: "car", german: "Auto", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Autos" },
    { english: "train", german: "Zug", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Züge" },
    { english: "bus", german: "Bus", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Busse" },
    { english: "airplane", german: "Flugzeug", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Flugzeuge" },
    { english: "ticket", german: "Ticket", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Tickets" },
    { english: "airport", german: "Flughafen", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Flughäfen" },
    { english: "station", german: "Bahnhof", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Bahnhöfe" },

    // Shopping
    { english: "shop", german: "Laden", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Läden" },
    { english: "money", german: "Geld", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "price", german: "Preis", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Preise" },
    { english: "expensive", german: "teuer", partOfSpeech: "adjective" },
    { english: "cheap", german: "billig", partOfSpeech: "adjective" },

    // Weather
    { english: "weather", german: "Wetter", partOfSpeech: "noun", gender: "neuter", article: "das" },
    { english: "sun", german: "Sonne", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "rain", german: "Regen", partOfSpeech: "noun", gender: "masculine", article: "der" },
    { english: "snow", german: "Schnee", partOfSpeech: "noun", gender: "masculine", article: "der" },
    { english: "warm", german: "warm", partOfSpeech: "adjective" },
    { english: "cool", german: "kühl", partOfSpeech: "adjective" },

    // Activities
    { english: "work", german: "Arbeit", partOfSpeech: "noun", gender: "feminine", article: "die" },
    { english: "play", german: "spielen", partOfSpeech: "verb" },
    { english: "learn", german: "lernen", partOfSpeech: "verb" },
    { english: "help", german: "helfen", partOfSpeech: "verb" },
    { english: "buy", german: "kaufen", partOfSpeech: "verb" },
    { english: "sell", german: "verkaufen", partOfSpeech: "verb" },
    { english: "pay", german: "bezahlen", partOfSpeech: "verb" },
    { english: "wait", german: "warten", partOfSpeech: "verb" },
    { english: "ask", german: "fragen", partOfSpeech: "verb" },
    { english: "answer", german: "antworten", partOfSpeech: "verb" },

    // Body Parts
    { english: "head", german: "Kopf", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Köpfe" },
    { english: "hand", german: "Hand", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Hände" },
    { english: "eye", german: "Auge", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Augen" },
    { english: "heart", german: "Herz", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Herzen" },

    // Time & Frequency
    { english: "week", german: "Woche", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Wochen" },
    { english: "month", german: "Monat", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Monate" },
    { english: "year", german: "Jahr", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Jahre" },
    { english: "always", german: "immer", partOfSpeech: "adverb" },
    { english: "never", german: "nie", partOfSpeech: "adverb" },
    { english: "sometimes", german: "manchmal", partOfSpeech: "adverb" },
    { english: "often", german: "oft", partOfSpeech: "adverb" },

    // Emotions & States
    { english: "happy", german: "glücklich", partOfSpeech: "adjective" },
    { english: "sad", german: "traurig", partOfSpeech: "adjective" },
    { english: "tired", german: "müde", partOfSpeech: "adjective" },
    { english: "hungry", german: "hungrig", partOfSpeech: "adjective" },
    { english: "thirsty", german: "durstig", partOfSpeech: "adjective" },

    // Places
    { english: "restaurant", german: "Restaurant", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Restaurants" },
    { english: "hotel", german: "Hotel", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Hotels" },
    { english: "hospital", german: "Krankenhaus", partOfSpeech: "noun", gender: "neuter", article: "das", plural: "Krankenhäuser" },
    { english: "bank", german: "Bank", partOfSpeech: "noun", gender: "feminine", article: "die", plural: "Banken" },
    { english: "market", german: "Markt", partOfSpeech: "noun", gender: "masculine", article: "der", plural: "Märkte" },

    // More Adverbs
    { english: "quickly", german: "schnell", partOfSpeech: "adverb" },
    { english: "slowly", german: "langsam", partOfSpeech: "adverb" },
    { english: "together", german: "zusammen", partOfSpeech: "adverb" },
    { english: "alone", german: "allein", partOfSpeech: "adverb" }
];

// Make available globally
if (typeof window !== 'undefined') {
    window.VOCAB_A2 = VOCAB_A2;
}
