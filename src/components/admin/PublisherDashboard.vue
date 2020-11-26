<template>
  <div>
    <div class="up">
      <div class="paypal">PayPal: {{ dashboardInfo.paypal }}</div>
      <div class="data">
        Total Ventas: {{ dashboardInfo.sells }} <br />
        Total Ganancias: ${{ dashboardInfo.earnings }} USD
      </div>
      <!-- <v-row no-gutters >
        <v-col cols="6">
            
                <Chart  type="doughnut" :data="chartData" />
            
          
        </v-col>
        <v-col cols="6">
          <Chart  type="doughnut" :data="pchartData" />
        </v-col>
      </v-row> -->
      <Chart  type="doughnut" :data="chartData" />
        <Chart  type="doughnut" :data="pchartData" />
      <Chart  type="bar" :data="basicData" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";
import Chart from "primevue/chart";

export default {
  name: "PublisherDashboard",
  props: ["id"],

  data() {
    return {
      dashboardInfo: [],
      meses: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],

      basicData: {
        labels: [],
        datasets: [
          {
            label: "Ventas",
            backgroundColor: "#42A5F5",
            data: [],
          },
          {
            label: "Ganancias",
            backgroundColor: "#FFA726",
            data: [],
          },
        ],
      },

      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
          {
            data: [],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },

      pchartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
          {
            data: [],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
    };
  },

  components: {
    Chart,
  },

  methods: {
    convertir() {
      for (var i = 0; i < this.basicData.labels.length; i++) {
        if (
          !isNaN(this.basicData.labels[i]) &&
          this.basicData.labels[i] >= 1 &&
          this.basicData.labels[i] <= 12
        ) {
          this.basicData.labels[i] = this.meses[this.basicData.labels[i] - 1];
        }
      }
    },
  },

  mounted() {
    axios
      .get("http://" + URLBACKEND + "/ming/publisher/" + this.id + "/dashboard")
      .then(
        (response) => (
          (this.dashboardInfo = response.data),
          (this.basicData.labels = this.dashboardInfo.monthlyData.map(
            (a) => a.month
          )),
          this.convertir(),
          console.log(this.basicData.labels),
          (this.basicData.datasets[0].label = "Ventas"),
          (this.basicData.datasets[1].label = "Ganancias"),
          (this.basicData.datasets[0].data = this.dashboardInfo.monthlyData.map(
            (a) => a.sells
          )),
          (this.basicData.datasets[1].data = this.dashboardInfo.monthlyData.map(
            (a) => a.earnings
          )),
          (this.chartData.labels = this.dashboardInfo.gameData.map(
            (a) => a.game
          )),
          (this.chartData.datasets[0].data = this.dashboardInfo.gameData.map(
            (a) => a.sells
          )),
          (this.chartData.datasets[1].data = this.dashboardInfo.gameData.map(
            (a) => a.earnings
          )),
          (this.pchartData.labels = this.dashboardInfo.countryData.map(
            (a) => a.country
          )),
          (this.pchartData.datasets[0].data = this.dashboardInfo.countryData.map(
            (a) => a.sells
          )),
          (this.pchartData.datasets[1].data = this.dashboardInfo.countryData.map(
            (a) => a.earnings
          ))
          //   this.basicData.labels = this.dashboardInfo.gameData[0].game,
          //   console.log(this.dashboardInfo.gameData[0].game),
          //   console.log(this.dashboardInfo.gameData[1].game)
        )
      );
  },
};
</script>

<style scoped>
.paypal {
  font-size: 1.7rem;
  font-weight: 300;
  margin-left: 21.8rem;
}

.data {
  text-align: left;
  margin-top: 5rem;
  margin-left: 9rem;
  font-size: 3rem;
  font-weight: 300;
  display: flex;
  
  align-items: flex-start;
}

.up {
  margin-bottom: 137rem;
}

.sbar {
  width: 40rem;
  height: 40rem;
  
}

.donut {
  width: 50rem;
  height: 50rem;
}

.row {
  text-align: center;
  margin-right: 15rem;
  margin-top: 6rem;
}
</style>
