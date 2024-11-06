const routesData = [
  {
    path: "/idf-data",
    title: "Open data Région Ile-de-France",
    component: "IdfDataPage",
    components: [
      {
        title: "Principaux sites touristiques en île-de-France",
        component: "TouristSites",
        path: "/tourist-sites",
        url: "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/principaux-sites-touristiques-en-ile-de-france0",
        result: {},
        coords: ["geo_point_2d.lat", "geo_point_2d.lon"],
        fixedDisplayed: ["nom_carto"],

        img: [""],
        firstDisplayed: ["typo_niv3"],
        address: ["adresse"],
        notDisplayed: [
          "geo_point_2d",
          "geo_shape",
          "dep",
          "nomcom",
          //   "insee",
          "objectid",
        ],
      },
      {
        title: "Points d'intérêt balade (AEV)",
        component: "",
        path: "/poi-walks",
        url: "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/points_d_interet_balade",
        result: {},
        coords: ["geom_x_y.lat", "geom_x_y.lon"],
        fixedDisplayed: ["nom"],

        img: [""],
        firstDisplayed: ["nom_b"],
        address: [""],
        notDisplayed: ["geom_x_y", "geom", "num", "id_promena"],
      },
    ],
  },
];

export default routesData;
