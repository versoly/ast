const components = [
  {
    type: 'component',
    path: 'v-section',
    content: `<section>
  <h1 v-text="header"></h1>
  <p v-text="subheader"></p>
  <button class="btn" v-bind:class="{btnColor: btnColor, btnSize: btnSize, btnFullWidth: btnFullWidth}"
</section>`,
    properties: {
      header: {
        type: 'string',
        default: 'Header',
      },
      subheader: {
        type: 'string',
        default: 'Subheader',
      },
      btnColor: {
        type: 'string',
        default: 'primary',
      },
      btnSize: {
        type: 'string',
      },
      btnFullWidth: {
        type: 'boolean',
        default: false,
      },
    },
  },
];

export default components;
