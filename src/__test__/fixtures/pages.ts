const pages = [
  {
    type: 'page',
    path: 'index',
    content: `<section>
  <h1 v-text="header"></h1>
  <p v-text="subheader"></p>
  <button class="btn" v-bind:class="{btnColor: btnColor, btnSize: btnSize, btnFullWidth: btnFullWidth}"
</section>`,
  },
];

export default pages;
