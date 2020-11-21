<template>
  <div>
    <div class="card-latest-releases">
      <div
        class="game-image-latest-releases"
        :style="{
          backgroundImage:
            'linear-gradient(transparent -2%,#121212), url(' + banner + ')',
          boxShadow: '0 0.5px 2rem ' + color + '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <div class="game-description">
          <span align="center">
            {{
              description.substr(0, description.indexOf(".")) ||
              description.substr(0, description.indexOf("!"))
            }}
          </span>
        </div>
      </div>
      <div class="game-info-latest-releases">
        <p>
          {{ title }}<br />
          {{ date.substr(0, date.indexOf(" ")) }} <br />
          ${{ price }} USD
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatestGameCard",
  props: ["title", "price", "banner", "id", "color", "description", "date"],
  methods: {
    // dateFormat (){
    //   const d = new Date(200,);
    //   const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    //   const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    //   const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    //   console.log(${da}-${mo}-${ye});
    // }
  }
};
</script>

