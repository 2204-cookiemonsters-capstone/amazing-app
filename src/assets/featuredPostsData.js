import { TouchableHighlightComponent } from "react-native";

export const featuredPostsData = [
  {
    taskId: 1,
    title: 'Read a Book',
    description:
      'It can be any genre of your choice, just finish a book this month.',
    defaultImgUrl: 'https://i.imgur.com/Tr4Urao.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection',
    reflection: '“Taking a moment to figure out how you really feel instead of letting old patterns decide for you is one of the most authentic things you can do." \n \n - Yung Pueblo, Clarity & Connection',
    reflection2: "bookshop.com \n find books at your local bookstores",
    reflectionLink: "https://bookshop.org/books/clarity-connection-9781524860486/9781524860486"
  },
  {
    taskId: 2,
    title: 'Breathing Meditation',
    description:
      'Find a quiet space to sit. Without changing your normal breathing pattern, bring your attention to your inhaling and exhaling. As your mind wanders, bring your focus back to your breath. Practice this type of meditation for at least 15 minutes.',
      defaultImgUrl: 'https://i.imgur.com/GyKJQjk.jpg',
      month: 'July',
      year: 2022,
      category: 'meditation',
      reflection: '"Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor." \n \n -Thich Nhat Hanh' ,
      reflection2: "insighttimer.com \n free meditations",
      reflectionLink:"https://insighttimer.com/"
  },
  {
    taskId: 3,
    title: 'Nature Walk',
    description:
      'Visit any natural environment-- a trail, a park, a lake, or whatever is available-- and go on a nature walk.',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',
    month: 'July',
    year: 2022,
    category: 'nature',
    reflection: '“The land knows you, even when you are lost.” \n \n -Robin Wall Kimmerer, Braiding Sweetgrass',
    reflection2: "find trails near you: \n alltrails.com",
    reflectionLink:"https://www.alltrails.com/"
  },
  {
    taskId: 4,
    title: 'Send A Letter',
    description: 'Write and mail a physical letter to someone you care about.',
    defaultImgUrl: 'https://i.imgur.com/XKzBaOA.jpg',
    month: 'July',
    year: 2022,
    category: 'kindness',
    reflection: '"How wonderful it is to be able to write someone a letter! To feel like conveying your thoughts to a person, to sit at your desk and pick up a pen, to put your thoughts into words like this is truly marvelous." \n \n -Haruki Murakami',
    reflection2: "stamps.com",
    reflectionLink:"https://www.stamps.com/"
  },
  {
    taskId: 5,
    title: 'Purposeful Photo Album',
    description:
      'Take photos of ten important things in your life-- people, places, or objects.',
      defaultImgUrl: 'https://i.imgur.com/RcYQzBW.jpg',
      month: 'July',
      year: 2022,
      category: 'creativity',
      reflection: '"When words become unclear, I shall focus with photographs." \n\n -Ansel Adams',
      reflection2: "turn your photos into photo books \n shutterfly.com",
      reflectionLink:"https://www.shutterfly.com/photo-books/"
  },
  {
    taskId: 6,
    title: 'Connect With Community',
    description:
      'Attend a local event or group meeting in your community.',
      defaultImgUrl: 'https://i.imgur.com/8TZYNlI.jpg',
      month: 'July',
      year: 2022,
      category: 'community',
      reflection: '"Love is an action, never simply a feeling." -bell hooks',
      reflection2: "meetup.com",
      reflectionLink:"https://www.meetup.com/"
  },
  {
    taskId: 7,
    title: 'Full Body Stretch',
    description:
      'Spend 20+ minutes stretching your muscles, loosen up the tightness in your body.',
      defaultImgUrl:'https://i.imgur.com/uJOBwHY.jpg',
      month: 'July',
      year: 2022,
      category: 'movement',
      reflection: `"Even if you don't have time for a big workout, stretching in the morning and night really changes your body." \n \n - Erin Heatherton`,
      reflection2: "down dog app",
      reflectionLink:"https://www.downdogapp.com/"
  },
  {
    taskId: 8,
    title: 'Core Values Reflection',
    description: 'Journal Prompt: What are your core values? When do you feel most connected with these values?',
    defaultImgUrl: 'https://i.imgur.com/auj7RJW.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection',
    reflection: '"It is no measure of health to be well adjusted to a profoundly sick society." \n \n -J. Krishnamurti',
    reflection2: "values app",
    reflectionLink:"https://values.institute/values-app/"
  },
  {
    taskId: 9,
    title: 'Walking Meditation',
    description: 'Walk slowly and focus on the feeling of your feet on the ground. As your attention goes elsewhere, bring your focus back to the feeling of your feet on the ground. Practice this meditation for 10+ minutes.',
      defaultImgUrl: 'https://i.imgur.com/wEF9n7F.jpg',
      month: 'July',
      year: 2022,
      category: 'meditation',
      reflection: `“When you walk, arrive with every step. That is walking meditation. There's nothing else to it.” \n \n -Thich Nhat Hanh`,
      reflection2: "headspace.com",
      reflectionLink:"https://www.headspace.com/meditation/walking-meditation"
  },
  {
    taskId: 10,
    title: 'Water',
    description:
      'Visit a pond, lake, river, ocean, or other body of water. If the climate allows, swim, canoe, or just enjoy the sounds and wildlife near the water.',
      defaultImgUrl: 'https://i.imgur.com/kC0vOPy.jpg',
      month: 'July',
      year: 2022,
      category: 'nature',
      reflection: '"As a rule, whatever is fluid, soft, and yielding will overcome whatever is rigid and hard. This is another paradox: what is soft is strong." \n \n -Lao Tzu',
      reflection2: "surfline: the world's go to wave forecasting app",
      reflectionLink:"https://go.surfline.com/app"
  },
  {
    taskId: 11,
    title: 'Positive Review',
    description:
      'Leave a positive review for a local business or organization you support.',
      defaultImgUrl: 'https://i.imgur.com/p5Lyn9H.jpg',
      month: 'July',
      year: 2022,
      category: 'kindness',
      reflection: '"A good, sympathetic review is always a wonderful surprise." \n \n -Joyce Carol Oates',
      reflection2: "google",
      reflectionLink:"https://www.google.com"
  },
  {
    taskId: 12,
    title: 'Improve Your Space',
    description: 'Make some improvement to your work or living space-- redesign, organize, rearrange, build, or declutter.',
    defaultImgUrl: 'https://i.imgur.com/Cm6c0Ar.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity',
    reflection: '"The question of what you want to own is actually the question of how you want to live your life." \n \n -Marie Kondo',
    reflection2: "balancethroughsimplicity.com",
    reflectionLink:"https://balancethroughsimplicity.com/"
  },
  {
    taskId: 13,
    title: 'Reconnect',
    description: 'Reach out to someone you have not spoken to in more than 3 months.',
    defaultImgUrl: 'https://i.imgur.com/kq8X3ss.jpg',
    month: 'July',
    year: 2022,
    category: 'community',
    reflection: `"Friendship is the hardest thing in the world to explain. It's not something you learn in school. But if you haven't learned the meaning of friendship, you really haven't learned anything." \n \n -Muhammad Ali`,
    reflection2: "google",
    reflectionLink:"https://www.google.com"
  },
  {
    taskId: 14,
    title: 'Core / Upper Body Strength',
    description: 'Complete a core or upper body workout of some kind for 20+ minutes.',
    defaultImgUrl: 'https://i.imgur.com/2usl9dm.jpg',
    month: 'July',
    year: 2022,
    category: 'movement',
    reflection: `"It is not a daily increase, but a daily decrease. Hack away at the inessentials." \n \n -Bruce Lee`,
    reflection2: "strong app",
    reflectionLink:"https://www.strong.app/"
  },
{
  taskId: 15,
  title: 'Gratitude Reflection',
  description: 'Journal Prompt: Who are you grateful for in your life? What experiences are you most grateful for? Which of your qualities or traits are you grateful for?',
  defaultImgUrl: 'https://i.imgur.com/A6ZH2gb.jpg',
  month: 'July',
  year: 2022,
  category: 'reflection',
  reflection: `"I am happy because I'm grateful. I choose to be grateful. That gratitude allows me to be happy." \n \n -Will Arnett`,
  reflection2: "gratefulness.me",
  reflectionLink:"https://gratefulness.me/"
},
  {
    taskId: 16,
    title: 'Relaxation Meditation',
    description: 'While lying down, slowly scan from head to toe. As you scan, focus on relaxing each part of your body for several breaths, then move to the next part of your body. Practice for minimum 20 min.',
    defaultImgUrl: 'https://i.imgur.com/Xcz7KJ7.jpg',
    month: 'July',
    year: 2022,
    category: 'meditation',
    reflection: '"Let go of the battle. Breathe quietly and let it be. Let your body relax and your heart soften. Open to whatever you experience without fighting." \n \n -Jack Kornfield',
    reflection2: "calm app",
    reflectionLink:"https://www.calm.com/"
  },
  {
    taskId: 17,
    title: 'Nature Sit',
    description: 'Find a peaceful place to sit in nature without any distractions. Spend at least 20 minutes sitting without using your phone, reading, music, or journaling.',
    defaultImgUrl: 'https://i.imgur.com/Ga1vIyc.jpg',
    month: 'July',
    year: 2022,
    category: 'nature',
    reflection: '"Many eyes go through the meadow, but few see the flowers in it." -R.W. Emerson',
    reflection2: "inaturalist.org",
    reflectionLink:"https://www.inaturalist.org/"
  },
  {
    taskId: 18,
    title: 'Donation',
    description:
      'Make a donation of some kind-- it could be a monetary donation to a cause you care about, or it could be clothing, food, or some other item.',
      defaultImgUrl: 'https://i.imgur.com/cjOOlHY.jpg',
      month: 'July',
      year: 2022,
      category: 'kindness',
      reflection: '"Remember that the happiest people are not those getting more, but those giving more." -H. Jackson Brown Jr.',
      reflection2: "support a classroom \n donorschoose.org.",
      reflectionLink:"https://www.donorschoose.org/"
  },
  {
    taskId: 19,
    title: 'Album',
    description: "Listen to an entire music album from start to finish.",
    defaultImgUrl: 'https://i.imgur.com/mz0ciOf.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity',
    reflection:  `"Music is healing. Music holds things together" \n \n -Prince`,
    reflection2: "spotify",
    reflectionLink:"https://open.spotify.com/"
  },
  {
    taskId: 20,
    title: 'Volunteer',
    description: 'Volunteer for a local organization or cause.',
    defaultImgUrl: 'https://i.imgur.com/xOEG5mO.jpg',
    month: 'July',
    year: 2022,
    category: 'community',
    reflection:   `"Life's most persistent and urgent question is: What are you doing for others?" \n \n -Martin Luther King Jr.`,
    reflection2: "find volunteer opportunities \n volunteermatch.org",
    reflectionLink:"https://www.volunteermatch.org/"
  },{
    taskId: 21,
    title: 'Yoga',
    description: 'Complete a yoga or martial arts practice. Minimum 20+ min, use the internet to discover free class videos.',
    defaultImgUrl: 'https://i.imgur.com/bb17UDd.jpg',
    month: 'July',
    year: 2022,
    category: 'movement',
    reflection: '"Yoga does not just change the way we see things, it transforms the person who sees." \n \n -B.K.S. Iyengar',
    reflection2: "daily yoga app",
    reflectionLink:"https://www.dailyyoga.com/#/"
  },
  {
    taskId: 22,
    title: 'Goals',
    description: 'Journal Prompt: What is a goal you would like to accomplish in the next year? What steps or people will help you achieve this goal? What is your motivation for achieving this goal? How can you help others achieve their goals?',
    defaultImgUrl: 'https://i.imgur.com/PTcmc5o.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection',
    reflection: '“Tell me, what is it you plan to do with your one wild and precious life?" \n \n -Mary Oliver',
    reflection2: "stridesapp.com",
    reflectionLink:"https://www.stridesapp.com/"
  },
  {
    taskId: 23,
    title: 'Compassion Meditation',
    description: 'Pracitice a compassion meditation: bring to mind people you care about. For each person, say to yourself: "May they be happy and free from unhappiness and pain". This practice helps to build your compassionate feelings for others.',
    defaultImgUrl: 'https://i.imgur.com/moDVGYn.jpg',
    month: 'July',
    year: 2022,
    category: 'meditation',
    reflection: '"If we learn to open our hearts, anyone, including the people who drive us crazy, can be our teacher." \n \n -Pema Chodron ',
    reflection2: "find hundreds of meditations: tenpercent.com",
    reflectionLink:"https://www.tenpercent.com/"
  },
  {
    taskId: 24,
    title: 'Care for Plants / Animals',
    description: 'Ideas: If you have a pet, spend time caring for your pet. If you have a garden or plants, spend time tending your garden or plants. In some way, spend some time caring for plants or animals.',
    defaultImgUrl: 'https://i.imgur.com/xOEG5mO.jpg',
    month: 'July',
    year: 2022,
    category: 'nature',
    reflection: `"Until you dig a hole, you plant a tree, you water it and make it survive, you haven't done a thing." \n \n -Wangari Maathai` ,
    reflection2: "grow your own plants app: seedtospoon.net",
    reflectionLink:"https://www.seedtospoon.net/"
  },
  {
    taskId: 25,
    title: 'Kind Messages',
    description: 'Send messages to 3+ people who have had a positive impact on you, letting them know you appreciate them.',
    defaultImgUrl: 'https://i.imgur.com/nfy24Gz.jpg',
    month: 'July',
    year: 2022,
    category: 'kindness',
    reflection: '"Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love." \n \n -Lao Tzu',
    reflection2: "bekind.org \n an app for kindness",
    reflectionLink:"https://bekind.org/"
  },
  {
    taskId: 26,
    title: 'Hands On Art',
    description: 'Complete an art project with your hands-- paint, draw, sculpt, build, etc.',
    defaultImgUrl: 'https://i.imgur.com/VaOCIkc.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity',
    reflection: '"Nothing is absolute. Everything changes, everything moves, everything revolves, everything flies and goes away." \n \n -Frida Kahlo',
    reflection2: "artsandculture.google.com",
    reflectionLink:"https://artsandculture.google.com/"
  },
  {
    taskId: 27,
    title: 'Support Local',
    description: 'Visit a locally-owned restaurant, store, or organization.',
    defaultImgUrl: 'https://i.imgur.com/X97pCMd.jpg',
    month: 'July',
    year: 2022,
    category: 'community',
    reflection: `"Every time you spend money you're casting a vote for the kind of world you want." \n \n -Anna Lappe`,
    reflection2: "find local farms and ranches: \n simplylocal.io",
    reflectionLink:"https://www.simplylocal.io/home"
  },
  {
    taskId: 28,
    title: 'Jog',
    description: 'Complete a walk/jog/run for at least one mile.',
    defaultImgUrl: 'https://i.imgur.com/eGvYXyM.jpg',
    month: 'July',
    year: 2022,
    category: 'movement',
    reflection: '"When the mind is controlled and spirit aligned with purpose, the body is capable of so much more than we realize." \n \n -Rich Roll, Finding Ultra',
    reflection2: "strava.com \n track your runs",
    reflectionLink: "https://www.strava.com/"
  },
];