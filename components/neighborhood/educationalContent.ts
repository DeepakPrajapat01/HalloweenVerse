/**
 * Centralized, typed educational content module for HalloweenVerse.
 * Contains verified, culturally accurate, and historical information for all 8 educational locations.
 */

export interface EducationalFact {
    title: string;
    text: string;
    icon?: string;
}

export interface EducationalLocation {
    id: string;
    number: number;
    title: string;
    category: string;
    topic: string;
    badgeEmoji: string;
    tagline: string;
    accentColor: string;
    secondaryColor: string;
    
    // In-world coordinates [X, Y, Z]
    position: [number, number, number];
    interactionRadius: number;
    
    // HUD prompts
    promptLabel: string;
    promptHint: string;
    
    // Modal Content
    heading: string;
    subtitle: string;
    explanation: string[];
    facts: EducationalFact[];
    culturalContext: string;
    illustrationType: "pumpkin" | "street" | "haunted" | "costume" | "party" | "park" | "candy" | "world";
    
    // Associated landmark or house link in 3D scene
    associatedHouseId?: string;
    associatedLandmarkId?: string;
}

export const EDUCATIONAL_LOCATIONS: EducationalLocation[] = [
    {
        id: "pumpkin_house",
        number: 1,
        title: "The Pumpkin House",
        category: "Art, Folklore & Decor",
        topic: "Jack-o'-lanterns, pumpkin carving, and Halloween decorations",
        badgeEmoji: "🎃",
        tagline: "Stingy Jack's Roost — Autumn squash carving & glowing porches",
        accentColor: "#FF7518",
        secondaryColor: "#FFAA33",
        position: [-9.5, 0, -10],
        interactionRadius: 3.2,
        promptLabel: "Explore The Pumpkin House",
        promptHint: "Press [E] to learn about Jack-o'-lantern carving & origins",
        heading: "The Art & Lore of Jack-o'-Lanterns",
        subtitle: "How carved turnips evolved into the modern smiling pumpkin",
        explanation: [
            "Carving glowing faces into vegetables began centuries ago in Ireland and the Scottish Highlands using turnips, rutabagas, and beets. When 19th-century Irish and Scottish immigrants arrived in North America, they discovered the native pumpkin—a vibrant orange squash that was softer, larger, and much easier to carve with expressive faces.",
            "A candle or ember placed inside was traditionally meant to represent the souls of departed wanderers and illuminate dark country lanes during harvest nights. Over time, illuminated doorsteps became a joyful visual signal welcoming neighbors and celebrating the arrival of autumn.",
        ],
        facts: [
            {
                title: "From Turnips to Pumpkins",
                text: "Original Irish turnip lanterns (some preserved in Dublin's National Museum) had grotesque, fierce expressions carved to frighten away mischievous spirits during the dark winter transition.",
                icon: "🥔",
            },
            {
                title: "The Legend of Stingy Jack",
                text: "Folk tales tell of Jack, an old blacksmith who outwitted the Devil and was cursed to wander the dark between heaven and hell, carrying only a hollowed turnip with an ember to light his way.",
                icon: "🕯️",
            },
        ],
        culturalContext:
            "While giant orange pumpkin carving is most prevalent in North America, traditional turnip carving contests are still proudly held in parts of Ireland, Scotland, and the Isle of Man.",
        illustrationType: "pumpkin",
        associatedHouseId: "house_2",
    },
    {
        id: "trick_or_treat_street",
        number: 2,
        title: "Trick-or-Treat Street",
        category: "Community Custom",
        topic: "How trick-or-treating works and why children visit decorated houses",
        badgeEmoji: "🏡",
        tagline: "Spooky Lane Boulevard — Welcoming porch lights & neighborly goodwill",
        accentColor: "#F59E0B",
        secondaryColor: "#FDE68A",
        position: [0, 0, 13],
        interactionRadius: 3.2,
        promptLabel: "Inspect Trick-or-Treat Way",
        promptHint: "Press [E] to discover how trick-or-treating began",
        heading: "The Neighborhood Tradition of Trick-or-Treating",
        subtitle: "From medieval 'souling' to modern doorbell greetings",
        explanation: [
            "Trick-or-treating is an evening community activity where children dress in costume and visit neighboring homes calling out 'Trick or treat!' Homeowners show they are actively participating by turning on exterior porch lights and displaying festive autumn decorations.",
            "Despite the playful mention of a 'trick,' the modern tradition is overwhelmingly generous: neighbors greet visitors warmly, admire their creative costumes, and drop individually wrapped candies or small treats into their sacks.",
        ],
        facts: [
            {
                title: "Medieval 'Souling' & 'Guising'",
                text: "During the Middle Ages on All Souls' Eve, children and poor citizens visited houses offering prayers and songs for deceased relatives in exchange for small sweet spice cakes called 'soul cakes.'",
                icon: "📜",
            },
            {
                title: "The First Printed 'Trick or Treat'",
                text: "The exact phrase was first recorded in print in November 1927 in Blackie, Alberta, Canada, quickly spreading across North American towns as a peaceful alternative to harvest pranks.",
                icon: "📰",
            },
        ],
        culturalContext:
            "The universal neighborhood etiquette is the porch light: an illuminated porch welcomes trick-or-treaters, while an unlit home indicates that the residents prefer not to participate.",
        illustrationType: "street",
    },
    {
        id: "haunted_house",
        number: 3,
        title: "The Haunted House",
        category: "History & Folklore",
        topic: "Halloween's history, historical influences, and the development of modern traditions",
        badgeEmoji: "🏰",
        tagline: "The Blackthorn Manor — Ancient Samhain, All Hallows' Eve & Gothic lore",
        accentColor: "#9B5CFF",
        secondaryColor: "#D8B4FE",
        position: [-9.5, 0, -26],
        interactionRadius: 3.2,
        promptLabel: "Explore The Haunted House",
        promptHint: "Press [E] to uncover Halloween's 2,000-year history",
        heading: "The Ancient Roots of Halloween",
        subtitle: "How the Gaelic festival of Samhain shaped our modern celebration",
        explanation: [
            "Halloween's earliest roots trace back over 2,000 years to the Celtic festival of Samhain (pronounced 'sow-in'), celebrated across ancient Ireland, Scotland, and the Isle of Man. It marked the end of harvest season and the onset of winter—a liminal time when people believed the boundary between the living and the spirit world grew thin.",
            "In the 8th century, Pope Gregory III designated November 1 as All Saints' Day (All Hallows' Day) to honor Christian martyrs and saints. The evening before became known as All Hallows' Eve, which was gradually shortened to Hallowe'en and eventually Halloween.",
        ],
        facts: [
            {
                title: "A Liminal Fire Festival",
                text: "Ancient Celtic communities extinguished their hearth fires on Samhain and re-lit them from a single sacred community bonfire, symbolizing unity and protection through the coming cold winter.",
                icon: "🔥",
            },
            {
                title: "Rise of the Commercial Haunted House",
                text: "The first community-built haunted houses appeared during the Great Depression in the 1930s to entertain youth, later popularized globally by cinema, theatrical attractions, and theme parks in the 1970s.",
                icon: "🦇",
            },
        ],
        culturalContext:
            "Modern commercial Halloween is largely a 20th-century secular and cultural evolution, and should not be confused with the solemn religious observances of All Saints' Day and All Souls' Day still practiced globally.",
        illustrationType: "haunted",
        associatedHouseId: "house_1",
    },
    {
        id: "costume_house",
        number: 4,
        title: "The Costume House",
        category: "Creative Tradition",
        topic: "Halloween costumes and the reasons people dress up",
        badgeEmoji: "🎭",
        tagline: "The Masquerade Chateau — Folklore disguises & creative expression",
        accentColor: "#F43F5E",
        secondaryColor: "#FDA4AF",
        position: [9.5, 0, 10],
        interactionRadius: 3.2,
        promptLabel: "Explore The Costume House",
        promptHint: "Press [E] to discover why people dress up in costumes",
        heading: "The Masquerade: Why We Wear Costumes",
        subtitle: "From supernatural disguise to joyful personal expression",
        explanation: [
            "Wearing costumes on Halloween stems from the Scottish and Irish practice known as 'guising' (short for disguising). Centuries ago during autumn and midwinter nights, people wore animal masks, straw suits, or soot-darkened faces so that roaming spirits would mistake them for fellow specters and pass them by unharmed.",
            "In the late 19th and early 20th centuries, costumed children performed short skits, songs, or recitations door-to-door to earn nuts and fruit. Today, costuming has expanded beyond supernatural creatures into a vibrant celebration of imagination, humor, literature, and pop culture.",
        ],
        facts: [
            {
                title: "Guising Before Plastic Masks",
                text: "Before manufactured costumes existed, families crafted disguises from everyday materials: old linens for ghosts, burlap sacks for scarecrows, and chimney soot for theatrical eyebrows and mustaches.",
                icon: "🧵",
            },
            {
                title: "1930s Mass-Produced Disguises",
                text: "Companies like Ben Cooper and Collegeville began selling inexpensive boxed mask-and-smock costumes in the 1930s, featuring superheroes, cartoon characters, and historical figures.",
                icon: "🦸",
            },
        ],
        culturalContext:
            "Costume traditions vary worldwide: while North American celebrations embrace whimsical and heroic characters of all kinds, many European communities traditionally favor classic ghost, witch, and folkloric creature motifs.",
        illustrationType: "costume",
        associatedHouseId: "house_7",
    },
    {
        id: "party_house",
        number: 5,
        title: "The Party House & Plaza",
        category: "Social Festivities",
        topic: "Halloween parties, decorations, themed food, and social activities",
        badgeEmoji: "🎉",
        tagline: "The Hearth & Bonfire — Cider, music, pumpkin seeds & social warmth",
        accentColor: "#FB923C",
        secondaryColor: "#FED7AA",
        position: [0, 0, 1.8],
        interactionRadius: 3.4,
        promptLabel: "Join The Party Plaza",
        promptHint: "Press [E] to learn about Halloween parties & traditional foods",
        heading: "Autumn Gatherings: Food, Music & Festivities",
        subtitle: "How communities celebrate warmth and friendship as winter approaches",
        explanation: [
            "Halloween parties provide a cozy, joyful gathering space as daylight wanes and the autumn chill sets in. Modern gatherings feature costume contests, dance music, illuminated lanterns, and seasonal potluck snacks designed to look playful or mildly spooky.",
            "Traditional party foods highlight the rich agricultural bounty of late October: hot spiced apple cider infused with cinnamon and cloves, crisp caramel and candy apples, roasted pumpkin seeds, and hearty gingerbread.",
        ],
        facts: [
            {
                title: "Bobbing for Apples",
                text: "Bobbing for apples dates back to ancient Roman Britain celebrating Pomona, goddess of orchards and fruit trees. Because apples float in water, snagging one without hands was believed to bring good fortune.",
                icon: "🍎",
            },
            {
                title: "Cider Pressing Season",
                text: "Late October coincides precisely with the end of apple harvests. Historic farmsteads pressed fresh autumn cider and boiled spiced cider syrup to celebrate the completion of the year's field work.",
                icon: "☕",
            },
        ],
        culturalContext:
            "Party customs reflect regional harvest produce: in the UK and Ireland, toffee apples and treacle scones are staples, while North American parties frequently feature spiced pumpkin pie and apple cider donuts.",
        illustrationType: "party",
        associatedLandmarkId: "bonfire",
    },
    {
        id: "community_park",
        number: 6,
        title: "The Community Park",
        category: "Civic Celebrations",
        topic: "Halloween games, neighborhood celebrations, and community activities",
        badgeEmoji: "🌳",
        tagline: "Maple Hollow Commons — Scavenger hunts, trunk-or-treats & unity",
        accentColor: "#34D399",
        secondaryColor: "#A7F3D0",
        position: [0, 0, -34],
        interactionRadius: 3.4,
        promptLabel: "Explore The Community Park",
        promptHint: "Press [E] to discover neighborhood games & civic celebrations",
        heading: "Community Celebrations & Folk Games",
        subtitle: "How shared public spaces bring diverse neighborhoods together",
        explanation: [
            "Community parks and town squares serve as the civic heart of seasonal festivities. Towns host scarecrow-decorating contests, pumpkin illumination walks, story circles under ancient trees, and charity food drives.",
            "Public celebrations ensure that all community members—including families living in apartment buildings or rural areas without dense sidewalks—can participate in safe, accessible, and inclusive autumn games together.",
        ],
        facts: [
            {
                title: "The Rise of 'Trunk-or-Treat'",
                text: "Originated in the mid-1990s in community and school parking lots, neighbors decorate open car trunks with creative themes so children can safely visit multiple stops in a centralized pedestrian area.",
                icon: "🚗",
            },
            {
                title: "Storytelling Under Autumn Boughs",
                text: "Historically, town elders gathered around village greens to tell cautionary folk legends, ghost tales, and humorous riddles, passing down local history through oral tradition.",
                icon: "📖",
            },
        ],
        culturalContext:
            "Many towns organize 'Great Pumpkin Walks' where hundreds of hand-carved jack-o'-lanterns are illuminated along park walking trails, transforming public green spaces into magical illuminated night walks.",
        illustrationType: "park",
        associatedLandmarkId: "park_tree",
    },
    {
        id: "candy_shop",
        number: 7,
        title: "The Candy Shop & Bakehouse",
        category: "Confections & History",
        topic: "Halloween treats and the popularity of candy traditions",
        badgeEmoji: "🍬",
        tagline: "Sweet Tooth Bakehouse — From honey soul cakes to modern chocolates",
        accentColor: "#FBBF24",
        secondaryColor: "#FEF08A",
        position: [-9.5, 0, 26],
        interactionRadius: 3.2,
        promptLabel: "Explore The Candy Shop",
        promptHint: "Press [E] to learn the history of Halloween sweets & candy corn",
        heading: "The Sweet Evolution: From Soul Cakes to Confections",
        subtitle: "How harvest fruits and baked pastries turned into modern sweets",
        explanation: [
            "Before mass-produced candies existed, historic autumn treats were made at home: honey-sweetened oat cakes, glazed apples, molasses popcorn balls, and roasted chestnuts. In the late 19th century, commercial confectionery shops began crafting seasonal sugar sweets inspired by autumn harvest crops.",
            "By the 1950s, individually wrapped branded candies became the standard for trick-or-treating due to sanitation, shelf life, and neighborhood convenience.",
        ],
        facts: [
            {
                title: "The Invention of Candy Corn",
                text: "Candy corn was invented in the 1880s by George Renninger of Wunderle Candy Company. Its yellow, orange, and white layered design was created to imitate kernels of real harvest field corn.",
                icon: "🌽",
            },
            {
                title: "The Teal Pumpkin Project",
                text: "Started in 2014 by Food Allergy Research & Education (FARE), placing a teal-painted pumpkin on a porch indicates that the home offers non-food treats (such as stickers, glow sticks, and small toys) safe for children with food allergies.",
                icon: "🩵",
            },
        ],
        culturalContext:
            "Candy customs vary significantly: in North America, chocolate miniatures and peanut-butter cups dominate; in Mexico, tamarind confections and sugar calaveras are cherished; and in Japan, limited-edition autumn purple-yam and chestnut sweets are celebrated.",
        illustrationType: "candy",
        associatedHouseId: "house_4",
    },
    {
        id: "world_traditions_corner",
        number: 8,
        title: "World Traditions Corner",
        category: "Global Perspectives",
        topic: "How Halloween is observed differently in different countries and how some related remembrance traditions are distinct from Halloween",
        badgeEmoji: "🌍",
        tagline: "Memorial Pavilion & Heritage Fountain — Distinct cultures & remembrance",
        accentColor: "#38BDF8",
        secondaryColor: "#BAE6FD",
        position: [4.5, 0, -38.5],
        interactionRadius: 3.4,
        promptLabel: "Inspect World Traditions Corner",
        promptHint: "Press [E] to learn how different cultures honor autumn & ancestors",
        heading: "Global Perspectives: Halloween & Remembrance Traditions",
        subtitle: "Distinguishing modern costume festivals from sacred ancestor celebrations",
        explanation: [
            "Around late October and early November, cultures across the globe celebrate autumn harvests and honor departed ancestors. While contemporary commercial Halloween has spread internationally through cinema and media, several profound traditions have entirely separate cultural and spiritual origins:",
            "• Día de los Muertos (Day of the Dead, Mexico & Latin America): Celebrated on November 1 and 2, this vibrant indigenous and Catholic tradition is a joyful reunion with deceased loved ones. Families build warm 'ofrendas' (altars) adorned with marigold flowers (cempasúchil), photographs, pan de muerto, and favorite foods. It is a loving celebration of memory, completely distinct from Halloween's spooky folklore.\n\n• Teng Chieh & Obon (East Asia): Chinese and Japanese traditions honor ancestors with lanterns floated on rivers to guide spirits home peacefully.\n\n• Pangangaluluwa (Philippines): In rural towns, groups of children go house to house singing soulful hymns representing souls in purgatory in exchange for sweet rice cakes and prayers.\n\n• All Saints' & All Souls' Day (Europe & Americas): Families visit cemeteries to clean gravestones, light candles, and lay chrysanthemums in serene, prayerful remembrance.",
        ],
        facts: [
            {
                title: "UNESCO Cultural Heritage",
                text: "Mexico's Indigenous Festivity Dedicated to the Dead was inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity in 2008 for its profound community meaning.",
                icon: "🌼",
            },
            {
                title: "Irish 'Barmbrack' Traditions",
                text: "In Ireland, traditional Halloween fruit bread (barmbrack) is baked with hidden charms: finding a pea, a rag, a coin, or a ring playfully predicted a person's fortune or marriage for the coming year.",
                icon: "🍞",
            },
        ],
        culturalContext:
            "Recognizing the distinction between Halloween's playful costuming and solemn ancestor-remembrance holidays (such as Día de los Muertos) is an essential mark of cultural respect and empathy.",
        illustrationType: "world",
        associatedLandmarkId: "park_fountain",
    },
];
