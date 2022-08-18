---
layout: home
features:
  - icon: 🎉
    title: Many features
    details: Blocks, Hatchs, Image, Insert and more...
  - icon: 🛠️
    title: Simple and Customizable
    details: All entities are customizable.

title: '@tarikjabiri/dxf'
titleTemplate: A JavaScript dxf generator written in TypeScript.

hero:
  name: '@tarikjabiri/dxf'
  text: A DXF writer.
  tagline: A JavaScript interface to dxf written in TypeScript.
  image:
    src: /logo.svg
    alt: '@tarikjabiri/dxf'
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/tarikjabiri/dxf
---

<script setup>
import { 
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'
const members = [
  {
    avatar: 'https://www.github.com/tarikjabiri.png',
    name: 'Tarik EL JABIRI',
    title: 'Open source developer',
    desc: 'Creator & Maintainer',
    links: [
      { icon: 'github', link: 'https://github.com/tarikjabiri' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/tarikjabiri' },
      { icon: 'twitter', link: 'hhttps://twitter.com/TarikEljabiri1' },
      { icon: 'facebook', link: 'https://web.facebook.com/tarike.eljabiri' }
    ],
    sponsor: 'https://github.com/sponsors/dxfjs',
    org: 'dxfjs',
    orgLink: 'https://github.com/dxfjs'
  },
  {
    avatar: 'https://www.github.com/ognjen-petrovic.png',
    name: 'Ognjen Petrovic',
    desc: 'Collaborator',
    links: [
      { icon: 'github', link: 'https://github.com/ognjen-petrovic' }
    ]
  },
  {
    avatar: 'https://www.github.com/jean9696.png',
    name: 'Jean Dessane',
    desc: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/jean9696' }
    ]
  },
  {
    avatar: 'https://www.github.com/frederic-schwarz.png',
    name: 'Frederic Schwarz',
    title: 'Co-founder',
    links: [
      { icon: 'github', link: 'https://github.com/frederic-schwarz' }
    ],
    desc: 'Sponsor',
    org: 'Archilogic',
    orgLink: 'https://github.com/archilogic-com'
  }
]
</script>
<VPTeamPageSection style="margin-top: 1em;">
  <template #title>Members, Contributors & Sponsors</template>
  <template #lead>This project made possible because of all wonderful peoples</template>
  <template #members>
    <VPTeamMembers size="small" :members="members" />
  </template>
</VPTeamPageSection>

