/**
 * Shared data for shows listing and show detail pages.
 */
var QFShowsData = (function () {
  'use strict';

  var shows = [
    {
      id: 'heated-rivalry',
      title: 'Heated Rivalry',
      folder: 'heatedrivalry',
      logo: 'images/shows/heatedrivalry/heatedrivalry-logo.jpg',
      pageUrl: '/shows/heated-rivalry',
      diagonalVariant: 'a',
      descriptionParagraphs: [
        'Shane Hollander and Ilya Rosanov are the hottest players on the ice. But when ice meets heat, it gets WET! Will Shane and Ilya show butt on stage? What did Rose & Svetlana really think about being beards? And who is keeping track of all these time jumps? You\'ve seen the show. You got turned on. You cried. Sometimes at the same time. Now come see the earnest show about gay sex and hockey. Enjoy songs and jokes, and find out how many pucking innuendos we can fit into one show. This is "HEATED RIVALRY."'
      ],
      galleryImages: [
        'images/shows/heatedrivalry/heatedrivalry1.webp',
        'images/shows/heatedrivalry/heatedrivalry2.webp',
        'images/shows/heatedrivalry/heatedrivalry3.webp',
        'images/shows/heatedrivalry/heatedrivalry4.webp',
        'images/shows/heatedrivalry/heatedrivalry6.webp',
        'images/shows/heatedrivalry/heatedrivalry7.webp',
        'images/shows/heatedrivalry/heatedrivalry8.webp',
        'images/shows/heatedrivalry/heatedrivalry9.webp',
        'images/shows/heatedrivalry/heatedrivalry10.webp',
        'images/shows/heatedrivalry/heatedrivalry11.webp',
        'images/shows/heatedrivalry/heatedrivalry12.webp',
        'images/shows/heatedrivalry/heatedrivalry13.webp',
        'images/shows/heatedrivalry/heatedrivalry14.webp'
      ]
    },
    {
      id: 'white-lotus',
      title: 'The White Lotus Musical Parody',
      folder: 'whitelotus',
      logo: 'images/shows/whitelotus/whitelotus-logo.webp',
      pageUrl: '/shows/white-lotus',
      diagonalVariant: 'b',
      descriptionParagraphs: [
        'White Lotus Season 4, but it\'s a musical! Tone-deaf rich people. Downtrodden staff with K-pop aspirations. And of course, Tanya will be there. These gays are trying to sing to me!'
      ],
      galleryImages: []
    },
    {
      id: 'hlml',
      title: 'Hot Love Mansion of Love',
      folder: 'HLML',
      logo: 'images/shows/HLML/HLML-logo.webp',
      pageUrl: '/shows/hlml',
      diagonalVariant: 'c',
      descriptionParagraphs: [
        'All your favorite stupid, sexy reality TV dating shows combined into one stupid, sexy musical, hosted by every stupid, sexy celebrity host we could fit into the script. This is: Hot Love Mansion of Love.'
      ],
      galleryImages: [
        'images/shows/HLML/HLML1.webp',
        'images/shows/HLML/HLML2.webp',
        'images/shows/HLML/HLML3.webp',
        'images/shows/HLML/HLML4.webp',
        'images/shows/HLML/HLML5.webp',
        'images/shows/HLML/HLML6.webp',
        'images/shows/HLML/HLML7.webp'
      ]
    },
    {
      id: 'other-cats',
      title: 'Other Cats',
      folder: 'othercats',
      logo: 'images/shows/othercats/othercats-logo.webp',
      pageUrl: '/shows/other-cats',
      diagonalVariant: 'a',
      descriptionParagraphs: [
        'Not based on and yet completely based on one of the most iconic musicals in history, OTHER CATS explores the lives of the cats we didn\'t meet in Andrew Lloyd Webber\'s beloved fever dream. If you hate Cats...or if you love Cats... this is the show to see!'
      ],
      galleryImages: [
        'images/shows/othercats/othercats1.webp',
        'images/shows/othercats/othercats2.webp',
        'images/shows/othercats/othercats3.webp',
        'images/shows/othercats/othercats4.webp',
        'images/shows/othercats/othercats5.webp',
        'images/shows/othercats/othercats6.webp'
      ]
    },
    {
      id: 'ksw',
      title: 'Kids Save World',
      folder: 'ksw',
      logo: 'images/shows/ksw/ksw-logo.webp',
      pageUrl: '/shows/ksw',
      diagonalVariant: 'b',
      descriptionParagraphs: [
        'Immerse yourself in the fantastic world of every young adult fantasy book you\'ve ever read! We\'ve got dragons, wizards, hot vampires, brooding professors, and a darkness so EVIL it\'ll make you question why children are the ones who have to fix everything. Seriously, shouldn\'t the adults be handling this? And it\'s a musical!'
      ],
      galleryImages: [
        'images/shows/ksw/ksw1.webp',
        'images/shows/ksw/ksw2.webp',
        'images/shows/ksw/ksw3.webp',
        'images/shows/ksw/ksw4.webp',
        'images/shows/ksw/ksw5.webp',
        'images/shows/ksw/ksw6.webp',
        'images/shows/ksw/ksw7.webp'
      ]
    },
    {
      id: 'meet-cute',
      title: 'Meet Cute',
      folder: 'meetcute',
      logo: 'images/shows/meetcute/meetcute-logo.webp',
      pageUrl: '/shows/meet-cute',
      diagonalVariant: 'c',
      descriptionParagraphs: [
        'Every romantic comedy fan is familiar with the fundamental joy of a Meet Cute. Where first love begins in a chance encounter and blossoms into a perfect relationship. Join us for a collection of those stories with parodies and send-ups of your favorite RomCom tropes in the form of song.'
      ],
      galleryImages: []
    },
    {
      id: 'thanksgiving',
      title: 'Go Thank Yourself',
      folder: 'thanksgiving',
      logo: 'images/shows/thanksgiving/thanksgiving-logo.jpg',
      pageUrl: '/shows/go-thank-yourself',
      diagonalVariant: 'a',
      descriptionParagraphs: [
        'A Quick & Funny Musicals Family Thanksgiving Extravaganza!',
        'Come celebrate Thanksgiving with the QuickNFunny Family! There\'ll be turkey, fist fights, and a weird uncle, just like at your house! But funnier.'
      ],
      galleryImages: []
    },
    {
      id: 'period-piece',
      title: 'Period Piece',
      folder: 'periodpiece',
      logo: 'images/shows/periodpiece/periodpiece-logo.webp',
      pageUrl: '/shows/period-piece',
      diagonalVariant: 'b',
      descriptionParagraphs: [
        'Quick and Funny Musicals presents a tale as old as that time of the month: A period drama about periods!'
      ],
      galleryImages: [
        'images/shows/periodpiece/periodpiece50.webp',
        'images/shows/periodpiece/periodpiece51.webp',
        'images/shows/periodpiece/periodpiece52.webp'
      ]
    },
    {
      id: 'queer-as-folk-songs',
      title: 'Queer as Folk Songs',
      folder: 'queer',
      logo: 'images/shows/queer/queer-logo.webp',
      pageUrl: '/shows/queer-as-folk-songs',
      diagonalVariant: 'c',
      descriptionParagraphs: [
        'Quick and Funny musical presents a folk music romcom set at an Appalachian wedding. We follow several interconnected queer couples as they navigate love and all its oddities!'
      ],
      galleryImages: [
        'images/shows/queer/queer1.webp',
        'images/shows/queer/queer2.webp',
        'images/shows/queer/queer3.webp',
        'images/shows/queer/queer4.webp',
        'images/shows/queer/queer5.webp'
      ]
    },
    {
      id: 'mall-wars',
      title: 'Mall Wars: Glendale vs. Glendale',
      folder: 'mallwars',
      logo: 'images/shows/mallwars/mallwars-logo.webp',
      pageUrl: '/shows/mall-wars',
      diagonalVariant: 'a',
      descriptionParagraphs: [
        'A gritty crime story between the Glendale Americana and Glendale Galleria - and the man who tries to climb to the top of the Evil Mall Empire.'
      ],
      galleryImages: [
        'images/shows/mallwars/mallwars1.webp',
        'images/shows/mallwars/mallwars2.webp',
        'images/shows/mallwars/mallwars3.webp',
        'images/shows/mallwars/mallwars4.webp',
        'images/shows/mallwars/mallwars5.webp',
        'images/shows/mallwars/mallwars6.webp',
        'images/shows/mallwars/mallwars7.webp',
        'images/shows/mallwars/mallwars8.webp',
        'images/shows/mallwars/mallwars9.webp',
        'images/shows/mallwars/mallwars10.webp'
      ]
    },
    {
      id: 'yes-chef',
      title: 'Yes, Chef',
      folder: 'yeschef',
      logo: 'images/shows/yeschef/yeschef-logo.jpg',
      pageUrl: '/shows/yes-chef',
      diagonalVariant: 'b',
      descriptionParagraphs: [
        'Yes Chef is a musical feast that tells the story of a ragtag group of amateur chefs who attempt the impossible: opening a fancy restaurant. Will there be an Italian family that shouts a lot? Yes chef! Will there be a rat pulling someone\'s hair? Yes chef! Will there be a romantic ode to Great British Bake Off judge Paul Hollywood? YES CHEF!'
      ],
      galleryImages: [
        'images/shows/yeschef/yeschef1.webp',
        'images/shows/yeschef/yeschef2.webp',
        'images/shows/yeschef/yeschef3.webp',
        'images/shows/yeschef/yeschef4.webp',
        'images/shows/yeschef/yeschef5.webp'
      ]
    },
    {
      id: 'special-princess-unit',
      title: 'Law & Order, Special Princess Unit',
      folder: 'princess',
      logo: 'images/shows/princess/princess-logo.jpg',
      pageUrl: '/shows/special-princess-unit',
      diagonalVariant: 'c',
      descriptionParagraphs: [
        'Cinderella\'s been murdered! And in this fairytale world full of deception, lies, and backstabbing, there\'s only one team that can solve it. Agent Grimm and Agent Andersen are on the case! Follow them as they solve it piece by piece, interrogating your favorite (twisted) fairytale characters along the way.'
      ],
      galleryImages: [
        'images/shows/princess/princess1.webp',
        'images/shows/princess/princess2.webp',
        'images/shows/princess/princess3.webp',
        'images/shows/princess/princess4.webp',
        'images/shows/princess/princess5.webp',
        'images/shows/princess/princess6.webp',
        'images/shows/princess/princess7.webp',
        'images/shows/princess/princess8.webp',
        'images/shows/princess/princess9.webp'
      ]
    },
    {
      id: 'a-picket-line',
      title: 'A Picket Line',
      folder: 'picketline',
      logo: 'images/shows/picketline/picketline-logo.jpg',
      pageUrl: '/shows/a-picket-line',
      diagonalVariant: 'a',
      descriptionParagraphs: [
        'The WGA is on strike! But a strike is more than just an cause. Sometimes, it\'s a place where dreams are made, love thrives, and actors get their 15 minutes of fame. Come see a series of stories behind the scenes of the picket line. Everyone wants something in a strike. We hope they get it!'
      ],
      galleryImages: [
        'images/shows/picketline/picketline1.webp',
        'images/shows/picketline/picketline2.webp',
        'images/shows/picketline/picketline3.webp',
        'images/shows/picketline/picketline4.webp',
        'images/shows/picketline/picketline5.webp',
        'images/shows/picketline/picketline6.webp'
      ]
    },
    {
      id: 'tttl',
      title: 'TikTok Time Loop',
      folder: 'TTTL',
      logo: 'images/shows/TTTL/TTTL-logo.webp',
      pageUrl: '/shows/tiktok-time-loop',
      diagonalVariant: 'b',
      descriptionParagraphs: [
        'When Mia\'s Tik Tok addiction ruins her relationship with her partner, she is forced to relive the day of her breakup over and over again, taunted by a personified Tik Tok Troll, aggressive Gen Z bullies, and other haterz!'
      ],
      galleryImages: [
        'images/shows/TTTL/TTTL1.webp',
        'images/shows/TTTL/TTTL2.webp',
        'images/shows/TTTL/TTTL3.webp',
        'images/shows/TTTL/TTTL4.webp',
        'images/shows/TTTL/TTTL5.webp'
      ]
    }
  ];

  function getShowById(id) {
    return shows.find(function (show) {
      return show.id === id;
    }) || null;
  }

  return {
    shows: shows,
    getShowById: getShowById
  };
})();
