const components = [
  {
    name: 'v-section',
    html: `<section>
  <h1 v-text="header"></h1>
  <p v-text="subheader"></p>
  <button class="btn" v-bind:class="{btnColor: btnColor, btnSize: btnSize, btnFullWidth: btnFullWidth}"></button>
</section>`,
    properties: [
      {
        name: 'Header',
        slug: 'header',
        type: 'PlainText',
        defaultValue: 'Header',
      },
      {
        name: 'Subheader',
        slug: 'subheader',
        type: 'PlainText',
        defaultValue: 'Subheader',
      },
      {
        name: 'Button Color',
        slug: 'btnColor',
        type: 'PlainText',
        defaultValue: 'primary',
      },
      {
        name: 'Button Size',
        slug: 'btnSize',
        type: 'PlainText',
      },
      {
        name: 'Button Full Width',
        slug: 'btnFullWidth',
        type: 'Bool',
        defaultValue: false,
      },
    ],
  },
  {
    name: 'v-section-classnames',
    html: `<section v-bind:class="classNames.root">
  <template v-if="!useH2Tag">
    <h1 v-bind:class="classNames.header" v-text="header"></h1>
  </template>
  <template v-if="useH2Tag">
    <h2 v-bind:class="classNames.header" v-text="header"></h2>
  </template>
  <p v-text="subheader"></p>
</section>`,
    groups: [{ name: 'Class Names', slug: 'classNames', nestProperties: true }],
    properties: [
      {
        name: 'Header',
        slug: 'header',
        type: 'PlainText',
        defaultValue: 'Header',
      },
      {
        name: 'Subheader',
        slug: 'subheader',
        type: 'PlainText',
        defaultValue: 'Subheader',
      },
      {
        name: 'Use H2 Tag',
        slug: 'useH2Tag',
        type: 'Bool',
        defaultValue: false,
      },
      {
        name: 'Root',
        slug: 'root',
        group: 'classNames',
        type: 'ClassName',
        defaultValue: 'py-20',
      },
      {
        name: 'Header',
        slug: 'header',
        group: 'classNames',
        type: 'ClassName',
      },
    ],
  },
];

export default components;
