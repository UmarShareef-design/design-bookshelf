import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "title": "UI/UX Design Bookshelf",
            "subtitle": "A new design tool drops every week, but fundamentals are forever. In the age of AI, knowing the \"why\" through timeless principles is your real competitive edge. Make use of the ultimate list of UI/UX books to read—curated from foundational UX books and top reddit recommendations.",
            "nav": {
                "all_books": "All Books",
                "favorites": "Favorites",
                "about": "About",
                "feedback": "Feedback ( Anonymous )"
            },
            "categories": {
                "All": "All",
                "UX Design": "UX Design",
                "UI Design": "UI Design",
                "Interaction Design": "Interaction Design",
                "Design Fundamentals": "Design Fundamentals",
                "User Research": "User Research",
                "Portfolio": "Portfolio",
                "Design Process": "Design Process",
                "Complementary Skills": "Complementary Skills"
            },
            "summaries": {
                "All": "A complete collection of UI/UX design books covering everything from basic principles to advanced research methods to soft skills.",
                "UX Design": "Essential reading for understanding user behavior, usability, and the strategy behind successful digital products.",
                "UI Design": "Books focused on visual hierarchy, typography, color theory, and the aesthetics of interface design.",
                "Interaction Design": "Guides on how users engage with products, focusing on flow, feedback, and interactive patterns.",
                "Design Fundamentals": "Mastering core principles is the secret to better AI prompting. Understanding hierarchy and color theory allows you to direct AI tools with precision.",
                "User Research": "Methodologies for gathering deep insights into user needs and testing design assumptions.",
                "Portfolio": "Strategies for showcasing your design process and landing roles in the UI/UX industry.",
                "Design Process": "Frameworks like Design Thinking and Lean UX that help teams build the right things efficiently.",
                "Complementary Skills": "Soft skills that help you grow beyond just pixels.",
                "Favorites": "Your curated collection of design wisdom. These books save to your local browser storage so you can easily reference them later."
            },
            "about": {
                "title": "About Me",
                "p1": "I'm Umar Shareef, a Designer who loves reading books with 5+ years of experience. Originally a mechanical engineer, I transitioned into website design and am now exploring \"vibe coding\" to build my own digital products.",
                "p2": "I love reading books, but I've always felt confused whenever I visited Amazon to buy one.",
                "p3": "Every week, a new free design tool emerges that claims to do everything better. But I realized that while tools cycle quickly, the core fundamentals found in these books are timeless. In the age of AI, knowing these principles is more important than ever—it’s the only way to truly master the new tools instead of being replaced by them.",
                "p4": "I hope this curated collection helps you build an AI-proof foundation for your design career.",
                "disclosure": "Full Affiliate Disclosure: All these links are affiliate links. Using these wouldn't cost you anything extra, but will give me a tiny commission that would motivate me a lot.",
                "closing": "Happy Upskilling Designers :)",
                "linkedin": "Connect on LinkedIn"
            },
            "common": {
                "check_it_out": "Check it out",
                "no_books": "No books found.",
                "add_favorites": "Add some favorites!",
                "try_category": "Try a different category.",
                "footer_text": "Knowledge is power.",
                "affiliate_disclosure": "Full Affiliate Disclosure: This website contains affiliate links. If you purchase through these links, we may earn a small commission at no extra cost to you.",
                "share_feedback": "Share your feedback ( Anonymous )",
                "select_language": "Select Language",
                "skip_to_main": "Skip to main content"
            },
            "meta": {
                "UX Design": {
                    "title": "Best UX Design Books | UI/UX Design Bookshelf",
                    "description": "Discover the best UX design books covering user behavior, usability, and product strategy. Curated for Indian designers and professionals on Amazon.",
                    "h1": "Best UX Design Books"
                },
                "UI Design": {
                    "title": "Best UI Design Books | UI/UX Design Bookshelf",
                    "description": "Explore top UI design books on visual hierarchy, typography, color theory, and interface aesthetics. Available on Amazon India.",
                    "h1": "Best UI Design Books"
                },
                "Interaction Design": {
                    "title": "Best Interaction Design Books | UI/UX Design Bookshelf",
                    "description": "Find the best interaction design books on user flow, feedback patterns, and interactive experiences. Curated for designers.",
                    "h1": "Best Interaction Design Books"
                },
                "Design Fundamentals": {
                    "title": "Best Design Fundamentals Books | UI/UX Design Bookshelf",
                    "description": "Master core design principles with these essential books. Understanding hierarchy and color theory gives you precision with AI tools.",
                    "h1": "Best Design Fundamentals Books"
                },
                "User Research": {
                    "title": "Best User Research Books | UI/UX Design Bookshelf",
                    "description": "Top user research books covering methodologies for gathering insights into user needs and testing design assumptions.",
                    "h1": "Best User Research Books"
                },
                "Portfolio": {
                    "title": "Best UX Portfolio Books | UI/UX Design Bookshelf",
                    "description": "Learn how to build a winning UI/UX portfolio. These books cover strategies for showcasing your design process and landing roles.",
                    "h1": "Best UX Portfolio Books"
                },
                "Design Process": {
                    "title": "Best Design Process Books | UI/UX Design Bookshelf",
                    "description": "Explore Design Thinking, Lean UX, and other frameworks that help teams build the right products efficiently.",
                    "h1": "Best Design Process Books"
                },
                "Complementary Skills": {
                    "title": "Best Complementary Skills Books for Designers | UI/UX Design Bookshelf",
                    "description": "Soft skills books that help designers grow beyond pixels — communication, productivity, and career development.",
                    "h1": "Best Complementary Skills Books for Designers"
                },
                "hint": "You can add custom favorites across categories and bookmark to visit later!",
                "view_all": "View all UI/UX Books!",
                "404": "Category not found.",
                "back_to_all": "Back to All Books"
            }
        }
    },
    ta: {
        translation: {
            "title": "UI/UX வடிவமைப்பு புத்தக அலமாரி",
            "subtitle": "ஒவ்வொரு வாரமும் ஒரு புதிய வடிவமைப்பு கருவி வருகிறது, ஆனால் அடிப்படை கோட்பாடுகள் என்றும் நிலைத்திருக்கும். AI காலத்தில், காலத்தால் அழியாத கொள்கைகள் மூலம் \"ஏன்\" என்பதை அறிந்துகொள்வதே உங்களின் உண்மையான போட்டி நன்மையாகும். UI/UX புத்தகங்களின் இறுதிப் பட்டியலைப் பயன்படுத்தவும்—அடிப்படை UX புத்தகங்கள் மற்றும் சிறந்த ரெடிட் பரிந்துரைகளிலிருந்து தொகுக்கப்பட்டது.",
            "nav": {
                "all_books": "அனைத்து புத்தகங்களும்",
                "favorites": "விருப்பமானவை",
                "about": "என்னை பற்றி",
                "feedback": "கருத்து (பெயரிலி)"
            },
            "categories": {
                "All": "அனைத்தும்",
                "UX Design": "UX வடிவமைப்பு",
                "UI Design": "UI வடிவமைப்பு",
                "Interaction Design": "ஊடாடும் வடிவமைப்பு",
                "Design Fundamentals": "வடிவமைப்பு அடிப்படைகள்",
                "User Research": "பயனர் ஆராய்ச்சி",
                "Portfolio": "போர்ட்ஃபோலியோ",
                "Design Process": "வடிவமைப்பு செயல்முறை",
                "Complementary Skills": "கூடுதல் திறன்கள்"
            },
            "summaries": {
                "All": "அடிப்படைத் தத்துவங்கள் முதல் மேம்பட்ட ஆராய்ச்சி முறைகள் மற்றும் மென்மையான திறன்கள் வரையிலான UI/UX வடிவமைப்பு புத்தகங்களின் முழுமையான தொகுப்பு.",
                "UX Design": "பயனர் நடத்தை, பயன்பாடு மற்றும் வெற்றிகரமான டிஜிட்டல் தயாரிப்புகளின் பின்னால் உள்ள உத்தியைப் புரிந்துகொள்வதற்கு அவசியமான வாசிப்பு.",
                "UI Design": "காட்சி படிநிலை, அச்சுக்கலை, வண்ணக் கோட்பாடு மற்றும் இடைமுக வடிவமைப்பின் அழகியல் ஆகியவற்றில் கவனம் செலுத்தும் புத்தகங்கள்.",
                "Interaction Design": "பயனர்கள் தயாரிப்புகளுடன் எவ்வாறு ஈடுபடுகிறார்கள் என்பதற்கான வழிகாட்டிகள், ஓட்டம், கருத்து மற்றும் ஊடாடும் வடிவங்களில் கவனம் செலுத்துகின்றன.",
                "Design Fundamentals": "அடிப்படைக் கொள்கைகளில் தேர்ச்சி பெறுவதே சிறந்த AI தூண்டுதலின் ரகசியம். படிநிலை மற்றும் வண்ணக் கோட்பாட்டைப் புரிந்துகொள்வது AI கருவிகளைத் துல்லியமாக இயக்க உங்களை அனுமதிக்கிறது.",
                "User Research": "பயனர் தேவைகள் பற்றிய ஆழமான நுண்ணறிவுகளைச் சேகரிப்பதற்கும் வடிவமைப்பு அனுமானங்களைச் சோதிப்பதற்கும் முறைகள்.",
                "Portfolio": "உங்கள் வடிவமைப்பு செயல்முறையை வெளிப்படுத்துவதற்கும் UI/UX துறையில் வேலைகளைப் பெறுவதற்குமான உத்திகள்.",
                "Design Process": "வடிவமைப்பு சிந்தனை மற்றும் லீன் UX போன்ற கட்டமைப்புகள் குழுக்கள் சரியான விஷயங்களைத் திறமையாக உருவாக்க உதவுகின்றன.",
                "Complementary Skills": "பிக்சல்களைத் தாண்டி நீங்கள் வளர உதவும் மென்மையான திறன்கள்.",
                "Favorites": "உங்கள் விருப்பமான வடிவமைப்பு ஞானத்தின் தொகுப்பு. இந்த புத்தகங்கள் உங்கள் உள்ளூர் உலாவி சேமிப்பகத்தில் சேமிக்கப்படும், எனவே நீங்கள் அவற்றை பின்னர் எளிதாகப் பார்க்கலாம்."
            },
            "about": {
                "title": "என்னை பற்றி",
                "p1": "நான் உமர் ஷரீப், 5+ ஆண்டுகள் அனுபவம் கொண்ட புத்தகங்களை வாசிக்க விரும்பும் ஒரு வடிவமைப்பாளர். முதலில் ஒரு மெக்கானிக்கல் இன்ஜினியராக இருந்த நான், இணையதள வடிவமைப்பிற்கு மாறி, இப்போது எனது சொந்த டிஜிட்டல் தயாரிப்புகளை உருவாக்க \"vibe coding\" ஐ ஆராய்ந்து வருகிறேன்.",
                "p2": "எனக்கு புத்தகங்கள் வாசிப்பது மிகவும் பிடிக்கும், ஆனால் அமேசானில் புத்தகம் வாங்கச் சென்றபோதெல்லாம் குழப்பமாகவே இருக்கும்.",
                "p3": "ஒவ்வொரு வாரமும், எல்லாவற்றையும் சிறப்பாகச் செய்வதாகக் கூறும் ஒரு புதிய இலவச வடிவமைப்பு கருவி உருவாகிறது. ஆனால் கருவிகள் விரைவாக மாறினாலும், இந்தப் புத்தகங்களில் உள்ள அடிப்படைகள் காலத்தால் அழியாதவை என்பதை நான் உணர்ந்தேன். AI காலத்தில், இந்தக் கொள்கைகளைத் தெரிந்துகொள்வது முன்னெப்போதையும் விட முக்கியமானது—அவற்றால் மாற்றப்படுவதற்குப் பதிலாக புதிய கருவிகளில் உண்மையாகத் தேர்ச்சி பெறுவதற்கான ஒரே வழி இதுதான்.",
                "p4": "இந்தத் தொகுப்பு உங்கள் வடிவமைப்பு வாழ்க்கைக்கு AI-ஆதாரமான அடித்தளத்தை உருவாக்க உதவும் என்று நம்புகிறேன்.",
                "disclosure": "முழு இணைப்பு வெளிப்படுத்தல்: இந்த இணைப்புகள் அனைத்தும் அஃபிலியேட் இணைப்புகள். இவற்றைப் பயன்படுத்துவதால் உங்களுக்கு கூடுதல் செலவு எதுவும் ஏற்படாது, ஆனால் எனக்கு ஒரு சிறிய கமிஷன் கிடைக்கும், அது என்னை ஊக்கப்படுத்தும்.",
                "closing": "மகிழ்ச்சியான கற்றல் வடிவமைப்பாளர்களே :)",
                "linkedin": "LinkedIn இல் இணைக்கவும்"
            },
            "common": {
                "check_it_out": "பார்க்கவும்",
                "no_books": "புத்தகங்கள் எதுவும் கிடைக்கவில்லை.",
                "add_favorites": "சிலவற்றை விருப்பமானவற்றில் சேர்க்கவும்!",
                "try_category": "வேறு வகையை முயற்சிக்கவும்.",
                "footer_text": "அறிவே சக்தி.",
                "affiliate_disclosure": "முழு இணைப்பு வெளிப்படுத்தல்: இந்த இணையதளத்தில் அஃபிலியேட் இணைப்புகள் உள்ளன. இந்த இணைப்புகள் மூலம் நீங்கள் வாங்கினால், உங்களுக்கு கூடுதல் கட்டணம் ஏதுமின்றி நாங்கள் ஒரு சிறிய கமிஷனைப் பெறலாம்.",
                "share_feedback": "உங்கள் கருத்தைப் பகிரவும் ( பெயரிலி )",
                "select_language": "மொழியைத் தேர்ந்தெடுக்கவும்",
                "skip_to_main": "முக்கிய பகுதிக்குச் செல்லவும்"
            },
            "meta": {
                "UX Design": {
                    "title": "சிறந்த UX வடிவமைப்பு புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "பயனர் நடத்தை, பயன்பாடு மற்றும் தயாரிப்பு உத்தியை உள்ளடக்கிய சிறந்த UX வடிவமைப்பு புத்தகங்களைக் கண்டறியவும்.",
                    "h1": "சிறந்த UX வடிவமைப்பு புத்தகங்கள்"
                },
                "UI Design": {
                    "title": "சிறந்த UI வடிவமைப்பு புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "காட்சி படிநிலை, அச்சுக்கலை, வண்ணக் கோட்பாடு மற்றும் இடைமுக அழகியல் பற்றிய சிறந்த UI வடிவமைப்பு புத்தகங்களை ஆராயுங்கள்.",
                    "h1": "சிறந்த UI வடிவமைப்பு புத்தகங்கள்"
                },
                "Interaction Design": {
                    "title": "சிறந்த ஊடாடும் வடிவமைப்பு புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "பயனர் ஓட்டம், கருத்து வடிவங்கள் மற்றும் ஊடாடும் அனுபவங்கள் குறித்த சிறந்த ஊடாடும் வடிவமைப்பு புத்தகங்களைக் கண்டறியவும்.",
                    "h1": "சிறந்த ஊடாடும் வடிவமைப்பு புத்தகங்கள்"
                },
                "Design Fundamentals": {
                    "title": "சிறந்த வடிவமைப்பு அடிப்படை புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "இந்த அத்தியாவசிய புத்தகங்கள் மூலம் முக்கிய வடிவமைப்பு கொள்கைகளில் தேர்ச்சி பெறுங்கள்.",
                    "h1": "சிறந்த வடிவமைப்பு அடிப்படை புத்தகங்கள்"
                },
                "User Research": {
                    "title": "சிறந்த பயனர் ஆராய்ச்சி புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "பயனர் தேவைகள் மற்றும் வடிவமைப்பு அனுமானங்களைச் சோதிப்பதற்கான நுண்ணறிவுகளைச் சேகரிப்பதற்கான முறைகளை உள்ளடக்கிய சிறந்த பயனர் ஆராய்ச்சி புத்தகங்கள்.",
                    "h1": "சிறந்த பயனர் ஆராய்ச்சி புத்தகங்கள்"
                },
                "Portfolio": {
                    "title": "சிறந்த UX போர்ட்ஃபோலியோ புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "வெற்றிபெறும் UI/UX போர்ட்ஃபோலியோவை எவ்வாறு உருவாக்குவது என்பதைக் கற்றுக்கொள்ளுங்கள்.",
                    "h1": "சிறந்த UX போர்ட்ஃபோலியோ புத்தகங்கள்"
                },
                "Design Process": {
                    "title": "சிறந்த வடிவமைப்பு செயல்முறை புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "வடிவமைப்பு சிந்தனை, லீன் UX மற்றும் பிற கட்டமைப்புகளை ஆராயுங்கள்.",
                    "h1": "சிறந்த வடிவமைப்பு செயல்முறை புத்தகங்கள்"
                },
                "Complementary Skills": {
                    "title": "வடிவமைப்பாளர்களுக்கான சிறந்த கூடுதல் திறன் புத்தகங்கள் | UI/UX வடிவமைப்பு புத்தக அலமாரி",
                    "description": "தொடர்பு, உற்பத்தித்திறன் மற்றும் தொழில் வளர்ச்சி ஆகியவற்றில் வடிவமைப்பாளர்கள் வளர உதவும் புத்தகங்கள்.",
                    "h1": "வடிவமைப்பாளர்களுக்கான சிறந்த கூடுதல் திறன் புத்தகங்கள்"
                },
                "hint": "நீங்கள் வெவ்வேறு வகைகளில் உங்களுக்கு விருப்பமானவற்றைச் சேர்த்து, பின்னர் பார்க்க சேமிக்கலாம்!",
                "view_all": "அனைத்து UI/UX புத்தகங்களையும் பார்க்கவும்!",
                "404": "வகை காணப்படவில்லை.",
                "back_to_all": "மீண்டும் அனைத்து புத்தகங்களுக்கும்"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            lookupFromPathIndex: 0,
            caches: ['localStorage']
        }
    });

export default i18n;
