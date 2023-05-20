---
layout: home

title: "@tarikjabiri/dxf"
titleTemplate: A DXF writer written in TypeScript..

hero:
  name: "@tarikjabiri/dxf"
  text: A DXF writer written in TypeScript.
  image:
    src: /logo.svg
    alt: "dxfjs"
  actions:
    - theme: brand
      text: Get Started
      link: /start
    - theme: alt
      text: View on GitHub
      link: https://github.com/dxfjs/writer
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
      { icon: 'twitter', link: 'https://twitter.com/TarikEljabiri1' },
      { icon: 'facebook', link: 'https://web.facebook.com/tarike.eljabiri' }
    ],
    sponsor: 'https://github.com/sponsors/dxfjs',
    org: 'dxfjs',
    orgLink: 'https://github.com/dxfjs'
  }
]
</script>
<VPTeamPageSection>
  <template #title>Maintainers, Sponsors & Contributors</template>
  <template #members>
    <VPTeamMembers size="small" :members="members" />
  </template>
</VPTeamPageSection>

<br>
<div style="display: flex; justify-content: center;">
<a href="/_media/sponsors.svg" target="_blank" rel="noopener noreferrer">

![Sponsors](_media/sponsors.svg)

</a>
</div>

<br>
<div style="display: flex; justify-content: center;">
<a href="/_media/contributors.svg" target="_blank" rel="noopener noreferrer">

![Contributors](_media/contributors.svg)

</a>
</div>
