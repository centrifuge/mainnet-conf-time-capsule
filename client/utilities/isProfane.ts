const profaneWords = [
  '🖕',
  'anal',
  'analingus',
  'anus',
  'arsehole',
  'ass',
  'assmunch',
  'auto erotic',
  'autoerotic',
  'ball gag',
  'ball gravy',
  'ball kicking',
  'ball licking',
  'ball sack',
  'ball sucking',
  'bangbros',
  'bangbus',
  'bareback',
  'barely legal',
  'barenaked',
  'bastard',
  'bastardo',
  'bastinado',
  'bbw',
  'bdsm',
  'beaner',
  'beaners',
  'beastiality',
  'beaver cleaver',
  'beaver lips',
  'bestiality',
  'big black',
  'big breasts',
  'big knockers',
  'big tits',
  'bimbos',
  'birdlock',
  'bitch',
  'bitches',
  'black cock',
  'blonde action',
  'blonde on blonde action',
  'blow job',
  'blow your load',
  'blowjob',
  'blue waffle',
  'blumpkin',
  'bollocks',
  'bondage',
  'boner',
  'boob',
  'boobs',
  'booty call',
  'brown showers',
  'brunette action',
  'bukkake',
  'bulldyke',
  'bullet vibe',
  'bullshit',
  'bung hole',
  'bunghole',
  'busty',
  'butt',
  'buttcheeks',
  'butthole',
  'camel toe',
  'camgirl',
  'camslut',
  'camwhore',
  'carpet muncher',
  'carpetmuncher',
  'chocolate rosebuds',
  'cialis',
  'circlejerk',
  'cleveland steamer',
  'clit',
  'clitoris',
  'clover clamps',
  'clusterfuck',
  'cock',
  'cocks',
  'coon',
  'coons',
  'coprolagnia',
  'coprophilia',
  'cornhole',
  'creampie',
  'cum',
  'cumming',
  'cumshot',
  'cumshots',
  'cunnilingus',
  'cunt',
  'darkie',
  'date rape',
  'daterape',
  'deep throat',
  'deepthroat',
  'dendrophilia',
  'dick',
  'dildo',
  'dingleberries',
  'dingleberry',
  'dirty pillows',
  'dirty sanchez',
  'dog style',
  'doggie style',
  'doggiestyle',
  'doggy style',
  'doggystyle',
  'dolcett',
  'domination',
  'dominatrix',
  'dommes',
  'donkey punch',
  'double dong',
  'double penetration',
  'dp action',
  'dry hump',
  'dvda',
  'eat my ass',
  'ecchi',
  'ejaculation',
  'erotic',
  'erotism',
  'escort',
  'eunuch',
  'fag',
  'fagging',
  'faggot',
  'fagot',
  'fecal',
  'felch',
  'fellatio',
  'feltch',
  'female squirting',
  'femdom',
  'figging',
  'fingerbang',
  'fingering',
  'fisting',
  'foot fetish',
  'footjob',
  'frotting',
  'fuck buttons',
  'fuck',
  'fucktards',
  'fudge packer',
  'fudgepacker',
  'futanari',
  'g-spot',
  'gang bang',
  'gangbang',
  'gay sex',
  'genitals',
  'giant cock',
  'girl on top',
  'girl on',
  'girls gone wild',
  'goatcx',
  'goatse',
  'gokkun',
  'golden shower',
  'goo girl',
  'goodpoop',
  'goregasm',
  'grope',
  'group sex',
  'guro',
  'hand job',
  'handjob',
  'hard core',
  'hardcore',
  'hentai',
  'homoerotic',
  'honkey',
  'hooker',
  'horny',
  'hot carl',
  'hot chick',
  'how to kill',
  'how to murder',
  'huge fat',
  'humping',
  'incest',
  'intercourse',
  'jack off',
  'jail bait',
  'jailbait',
  'jelly donut',
  'jerk off',
  'jigaboo',
  'jiggaboo',
  'jiggerboo',
  'jizz',
  'juggs',
  'kike',
  'kinbaku',
  'kinkster',
  'kinky',
  'knobbing',
  'leather restraint',
  'leather straight jacket',
  'lemon party',
  'livesex',
  'lolita',
  'lovemaking',
  'make me come',
  'male squirting',
  'masturbate',
  'masturbating',
  'masturbation',
  'menage a trois',
  'milf',
  'missionary position',
  'mong',
  'motherfucker',
  'mound of venus',
  'muff diver',
  'muffdiving',
  'nambla',
  'nawashi',
  'negro',
  'neonazi',
  'nig nog',
  'nig',
  'nigg',
  'nigga',
  'nigga',
  'niggah',
  'niggaracci',
  'niggard',
  'niggarded',
  'niggarding',
  'niggardliness',
  'niggardly',
  'niggards',
  'niggaz',
  'nigger',
  'nigger',
  'niggerhead',
  'niggerhole',
  'niggers',
  'niggle',
  'niggled',
  'niggles',
  'niggling',
  'nigglings',
  'niggor',
  'niggur',
  'niglet',
  'nignog',
  'nigr',
  'nigra',
  'nigre',
  'nimphomania',
  'nipple',
  'nipples',
  'nsfw images',
  'nsfw',
  'nude',
  'nudity',
  'nutten',
  'nympho',
  'nymphomania',
  'octopussy',
  'omorashi',
  'one cup two girls',
  'one guy one jar',
  'orgasm',
  'orgy',
  'paedophile',
  'paki',
  'panties',
  'panty',
  'pedobear',
  'pedophile',
  'pegging',
  'penis',
  'phone sex',
  'piece of shit',
  'pikey',
  'piss pig',
  'pissing',
  'pisspig',
  'playboy',
  'pleasure chest',
  'pole smoker',
  'ponyplay',
  'poon',
  'poontang',
  'poop chute',
  'poopchute',
  'porn',
  'porno',
  'pornography',
  'prince albert piercing',
  'pubes',
  'punany',
  'pussy',
  'queaf',
  'queef',
  'quim',
  'raghead',
  'raging boner',
  'rape',
  'raping',
  'rapist',
  'rectum',
  'retard',
  'reverse cowgirl',
  'rimjob',
  'rimming',
  'rosy palm and her 5 sisters',
  'rosy palm',
  'rusty trombone',
  's&m',
  'sadism',
  'santorum',
  'scat',
  'schlong',
  'scissoring',
  'semen',
  'sex',
  'sexcam',
  'sexo',
  'sexual',
  'sexuality',
  'sexually',
  'sexy',
  'shaved beaver',
  'shaved pussy',
  'shemale',
  'shibari',
  'shit',
  'shitblimp',
  'shitty',
  'shota',
  'shrimping',
  'skeet',
  'slanteye',
  'slut',
  'smut',
  'snatch',
  'snowballing',
  'sodomize',
  'sodomy',
  'spastic',
  'spic',
  'splooge moose',
  'splooge',
  'spooge',
  'spread legs',
  'spunk',
  'strap on',
  'strapon',
  'strappado',
  'strip club',
  'style doggy',
  'suicide girls',
  'sultry women',
  'swastika',
  'swinger',
  'tainted love',
  'taste my',
  'tea bagging',
  'threesome',
  'throating',
  'thumbzilla',
  'tied up',
  'tight white',
  'tit',
  'tits',
  'titties',
  'titty',
  'tongue in a',
  'topless',
  'tosser',
  'towelhead',
  'tranny',
  'tribadism',
  'tub girl',
  'tubgirl',
  'tushy',
  'twat',
  'twink',
  'twinkie',
  'two girls one cup',
  'undressing',
  'upskirt',
  'urethra play',
  'urophilia',
  'vagina',
  'venus mound',
  'viagra',
  'vibrator',
  'violet wand',
  'vorarephilia',
  'voyeur',
  'voyeurweb',
  'voyuer',
  'vulva',
  'wank',
  'wet dream',
  'wetback',
  'white power',
  'whore',
  'worldsex',
  'wrapping men',
  'wrinkled starfish',
  'xx',
  'xxx',
  'yaoi',
  'yellow showers',
  'yiffy',
  'zoophilia',
  "niggard's",
  "niggardliness's",
  "nigger's",
];

const isProfane = (prediction: string) =>
  profaneWords.some(word => {
    const profanityRegEx = new RegExp(`\\b${word}\\b`);

    if (profanityRegEx.test(prediction)) {
      return true;
    }

    return false;
  });

export { isProfane };
