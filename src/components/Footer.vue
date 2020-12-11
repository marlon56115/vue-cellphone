<template>
  <v-footer dark padless>
    <v-card flat tile width="100%" class="white--text text-center">
      <v-card-text>
        <v-btn
          v-for="icon in redes"
          :key="icon.link"
          class="mx-4 white--text"
          :href="icon.link"
          target="_blank"
          icon
        >
          <v-icon size="24px">
            {{ icon.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Desarrollado por <strong>Marlon Wilfredo Guerra Ramirez</strong>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>© All Right Reserved</strong>  FPI2020
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "footerv",
  data() {
    return {
      redes: [
        {
          icon: "mdi-facebook",
          link: "https://www.facebook.com/wil.guerra.739/",
        },
        { icon: "mdi-twitter", link: "https://twitter.com/Marlon_Guerra56" },
        {
          icon: "mdi-youtube",
          link:
            "https://www.youtube.com/channel/UCzC93Oe5wIre94slzot7OgQ?view_as=subscriber",
        },
        {
          icon: "mdi-instagram",
          link: "https://www.instagram.com/marlonn.guerra/",
        },
      ],
    };
  },
};
</script>

<style></style>
