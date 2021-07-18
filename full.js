var fullinterval0,
  fullinterval1,
  fullinterval2,
  fullinterval3,
  fullinterval4,
  updateFullInterval,
  trigger = {
    confusion: 0,
    drowsiness: 0,
    headnod: 0,
    headshake: 0,
    smile: 0,
    speaking: 0,
  },
  current = {
    engagement: 0,
    emotion: 0,
    confusion: 0,
    gaze: 0,
  };
// current stage info don't need to be stored in local storage, can be directly sent to chart
// average of historical data can be calculated each time in drawRadarChart thru local storage

function getServerData() {
  var x = new Date().getTime(),
    eng = [],
    total = {
      engagement: 0,
      emotion: 0,
      confusion: 0,
      gaze: 0,
      drowsiness: 0,
      headnod: 0,
      headshake: 0,
      smile: 0,
      speaking: 0,
    };

  $.ajax({
    url: "http://49.232.60.34:5000/get_class_information",
    type: "GET",
    async: false,
    success: function (res) {
      console.log("getting data from backend");
      data = JSON.parse(res);
      console.log(data);
      for (const [key, value] of Object.entries(total)) {
        if (key == "emotion") {
          data.forEach((d) => {
            total[key] += parseFloat(d[key].split(" ")[0]);
          });
        } else if (key == "engagement") {
          data.forEach((d) => {
            eng.push(parseFloat(d[key]));
            total[key] += parseFloat(d[key]);
          });
        } else {
          data.forEach((d) => {
            total[key] += parseFloat(d[key]);
          });
        }
      }
      // get sum data for trigger
      Object.keys(trigger).forEach((key) => (trigger[key] = total[key]));
      console.log("trigger", trigger);

      // get average data for radar overview
      Object.keys(current).forEach((key) => {
        current[key] = total[key] / data.length;
        if (key == "emotion") current[key] = (current[key] + 1) / 2;
      });
      console.log("current", current); // for radar chart

      // store in local storage
      var store_categories = [
        "engagement",
        "emotion",
        "confusion",
        "gaze",
        "eng_range",
      ];
      store_categories.forEach((d) => {
        var list = localStorage.getItem(d);
        list_json = list ? JSON.parse(list) : [];
        if (d == "eng_range")
          list_json.push([x, Math.min(...eng), Math.max(...eng)]);
        else list_json.push([x, current[d]]);
        list = JSON.stringify(list_json);
        localStorage.setItem(d, list);
      });

      console.log("localstorage:", localStorage);
    },
  }).done(function () {
    console.log("ajax done");
  });
}

function loadFullWindow() {
  setInterval(getServerData, 1000);

  let grid = GridStack.init({
    cellHeight: 100,
  });

  setInterval(function () {
    $("#fullchart0").width($("#fulldiv0").width() - 40);
    $("#fullchart0").height($("#fulldiv0").height() - 40);

    $("#fullchart1").width($("#fulldiv1").width() - 40);
    $("#fullchart1").height($("#fulldiv1").height() - 40);

    $("#fullchart2").width($("#fulldiv2").width() - 40);
    $("#fullchart2").height($("#fulldiv2").height() - 40);

    $("#fullchart3").width($("#fulldiv3").width() - 40);
    $("#fullchart3").height($("#fulldiv3").height() - 40);

    $("#fullchart4").width($("#fulldiv4").width() - 40);
    $("#fullchart4").height($("#fulldiv4").height() - 40);

    // console.log("fulldiv1 width", $("#fulldiv1").width());
    // console.log("fulldiv1 height", $("#fulldiv1").height());
    // console.log("fullchart1 width", $("#fullchart1").width());
    // console.log("fullchart1 height", $("#fullchart1").height());
  }, 1000);

  grid.on("resize", function (e, items) {
    $("#fullchart0").width($("#fulldiv0").width() - 40);
    $("#fullchart0").height($("#fulldiv0").height() - 40);

    $("#fullchart1").width($("#fulldiv1").width() - 40);
    $("#fullchart1").height($("#fulldiv1").height() - 40);

    $("#fullchart2").width($("#fulldiv2").width() - 40);
    $("#fullchart2").height($("#fulldiv2").height() - 40);

    $("#fullchart3").width($("#fulldiv3").width() - 40);
    $("#fullchart3").height($("#fulldiv3").height() - 40);

    $("#fullchart4").width($("#fulldiv4").width() - 40);
    $("#fullchart4").height($("#fulldiv4").height() - 40);

    fullChart0.setSize(
      $("#fulldiv0").width() - 40,
      $("#fulldiv0").height() - 40
    );
    fullChart1.setSize(
      $("#fulldiv1").width() - 40,
      $("#fulldiv1").height() - 40
    );
    // $("#fullchart1").css("width", $("#fulldiv1").width());
    // $("#fullchart1").css("height", $("#fulldiv1").height());
    console.log("fullchart1", fullChart1);

    fullChart2.setSize(
      $("#fullchart2").width() - 40,
      $("#fullchart2").height() - 40
    );
    fullChart3.setSize(
      $("#fullchart3").width() - 40,
      $("#fullchart3").height() - 40
    );

    fullChart4.setSize(
      $("#fullchart4").width() - 40,
      $("#fullchart4").height() - 40
    );
  });

  // get theme
  var theme;
  $.getJSON("./theme.json", function (data) {
    var themes = data.theme;
    // console.log("themes:",themes);
    var cookieList = document.cookie.split("; ");
    var themeid,
      themeName = "themeid";
    cookieList.forEach((val) => {
      if (val.indexOf(themeName) === 0)
        themeid = val.substring(themeName.length + 1);
    });
    theme = themes[themeid];

    // set theme
    for (const [key, value] of Object.entries(theme.full)) {
      // console.log(`${key}: ${value}`);
      $(`#${key}`).css("border-color", `rgb(${value})`);
      $(`#${key}Check`).css("background-color", `rgba(${value},0.5)`);
      // $(`#${key}Check`).css("opacity", 0.5);
    }
  });

  drawFullChart0();

  drawFullChart1();

  drawFullChart2();

  drawFullChart3();

  drawFullChart4();

  // drawLineChart("fullchart3");

  // drawAreaChart("fullchart2");
}

function handleUnloadFull() {
  localStorage.clear();
  // clearInterval(updateFullInterval);
  // no need to clear the interval cause all the timers got cleaned when the browser closed
}

function drawFullChart0() {
  var categories = ["engagement", "emotion", "confusion", "gaze"];
  fullChart0 = new Highcharts.chart("fullchart0", {
    credits: false,
    chart: {
      polar: true,
      width: $("#fulldiv0").width() - 40,
      height: $("#fulldiv0").height() - 40,
      reflow: true,
    },

    title: {
      text: "Overview",
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
    },

    xAxis: {
      tickInterval: 90,
      min: 0,
      max: 360,
      labels: {
        formatter: function () {
          return categories[this.value / 90];
        },
      },
    },

    yAxis: {
      min: 0,
    },

    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 90,
      },
      area: {},
    },

    series: [
      {
        type: "area",
        name: "Average",
        data: [0, 0, 0, 0],
      },
      {
        type: "line",
        name: "Current",
        data: [0, 0, 0, 0],
      },
    ],
  });

  fullinterval0 = setInterval(function () {
    // calculate average
    var average = {
      engagement: 0,
      emotion: 0,
      confusion: 0,
      gaze: 0,
    };

    Object.keys(average).forEach((key) => {
      var list = localStorage.getItem(key);
      list_json = list ? JSON.parse(list) : [];
      list_json.forEach((d) => {
        average[key] += d[1];
      });
      average[key] /= list_json.length;
    });

    console.log("average", average);

    if (fullChart0.series) {
      fullChart0.series[0].setData(Object.values(average));
      fullChart0.series[1].setData(Object.values(current));
    }
  }, 1000);
}

function drawFullChart1() {
  fullChart1 = new Highcharts.Chart({
    credits: false,
    chart: {
      renderTo: "fullchart1",
      type: "bar",
      reflow: true,
      width: $("#fulldiv1").width() - 40,
      height: $("#fulldiv1").height() - 40,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          fullinterval1 = setInterval(function () {
            series.setData(Object.values(trigger));
          }, 1000);
        },
      },
    },
    title: {
      text: "Trigger state of the class",
    },
    xAxis: {
      categories: [
        "Confusion",
        "Drowsiness",
        "Headnod",
        "Headshake",
        "Smile",
        "Speaking",
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "number of people",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: (Highcharts.theme && Highcharts.theme.textColor) || "gray",
        },
      },
    },
    legend: {
      enabled: false,
      // align: "right",
      // x: -100,
      // verticalAlign: "top",
      // y: 20,
      // floating: true,
      // backgroundColor:
      //   (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) ||
      //   "white",
      // borderColor: "#CCC",
      // borderWidth: 1,
      // shadow: false,
    },
    tooltip: {
      enabled: false,
      // formatter: function () {
      //   return (
      //     "<b>" +
      //     this.x +
      //     "</b><br/>" +
      //     this.series.name +
      //     ": " +
      //     Math.round(this.y) +
      //     "<br/>" +
      //     "Total: " +
      //     Math.round(this.point.stackTotal)
      //   );
      // },
    },
    plotOptions: {
      bar: {
        // stacking: "normal",
        dataLabels: {
          enabled: true,
          // color:
          //   (Highcharts.theme && Highcharts.theme.dataLabelsColor) || "white",
        },
      },
    },
    series: [
      {
        name: "",
        data: [5, 3, 4, 7, 2, 9],
      },
    ],
  });
}

function drawFullChart2() {
  var startTime = new Date().getTime();
  fullChart2 = Highcharts.chart("fullchart2", {
    credits: false,
    chart: {
      type: "area",
      width: $("#fulldiv2").width() - 40,
      height: $("#fulldiv2").height() - 40,
    },

    title: {
      text: "Gaze",
    },

    subtitle: {
      text: "Historical data (updata per second)",
    },

    tooltip: {
      valueDecimals: 2,
      useHTML: true,
      formatter: function () {
        return `<div style="min-height: 120px;">
        <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg" width="150"/>
        <br />► ${this.series.name}: ${this.point.y.toFixed(2)}<br /></div>`;
      },
    },

    xAxis: {
      type: "datetime",
      tickInterval: 10,
      min: startTime,
      // min: 1625842192120,
    },

    series: [
      {
        lineWidth: 0.5,
        name: "Average level",
      },
    ],
  });

  fullinterval2 = setInterval(function () {
    if (fullChart2.series) {
      var list = localStorage.getItem("gaze");
      var list_json = list ? JSON.parse(list) : [];
      fullChart2.series[0].setData(list_json);
    }
  }, 1000);
}

function drawFullChart3() {
  var startTime = new Date().getTime();
  var threshold = 0.4;
  fullChart3 = Highcharts.chart("fullchart3", {
    credits: false,
    chart: {
      type: "area",
      width: $("#fulldiv3").width() - 40,
      height: $("#fulldiv3").height() - 40,
    },

    title: {
      text: "Confusion",
    },

    subtitle: {
      text: "Historical data (updata per second)",
    },

    tooltip: {
      valueDecimals: 2,
      useHTML: true,
      formatter: function () {
        return `<div style="min-height: 120px;">
        <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg" width="150"/>
        <br />► ${this.series.name}: ${this.point.y.toFixed(2)}<br /></div>`;
      },
    },

    xAxis: {
      type: "datetime",
      tickInterval: 10,
      min: startTime,
      // min: 1625842192120,
    },

    series: [
      {
        lineWidth: 0.5,
        name: "Average level",
      },
    ],
  });

  fullinterval3 = setInterval(function () {
    if (fullChart3.series) {
      var list = localStorage.getItem("confusion");
      var list_json = list ? JSON.parse(list) : [];
      newdata = list_json.map((d) => [d[0], d[1] - threshold]);
      fullChart3.series[0].setData(newdata);
    }
  }, 1000);
}

function drawFullChart4() {
  var startTime = new Date().getTime();
  fullChart4 = Highcharts.chart("fullchart4", {
    credits: false,
    chart: {
      // type: "area",
      width: $("#fulldiv4").width() - 40,
      height: $("#fulldiv4").height() - 40,
    },

    title: {
      text: "Attention",
    },

    subtitle: {
      text: "Historical data (updata per second)",
    },

    tooltip: {
      // valueDecimals: 2,
      // useHTML: true,
      // formatter: function () {
      //   return `<div style="min-height: 120px;">
      //   <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg" width="150"/>
      //   <br />► ${this.series.name}: ${this.point.y.toFixed(2)}<br /></div>`;
      // },
      crosshairs: true,
      shared: true,
    },

    xAxis: {
      type: "datetime",
      tickInterval: 10,
      min: startTime,
      // min: 1625842192120,
    },

    series: [
      {
        name: "Attention",
        data: [],
        zIndex: 1,
        marker: {
          fillColor: "white",
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[0],
        },
      },
      {
        name: "Range",
        data: [],
        type: "arearange",
        lineWidth: 0,
        linkedTo: ":previous",
        color: Highcharts.getOptions().colors[0],
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
          enabled: false,
        },
      },
    ],
  });

  fullinterval4 = setInterval(function () {
    if (fullChart4.series) {
      var list = localStorage.getItem("engagement");
      var list_json = list ? JSON.parse(list) : [];
      fullChart4.series[0].setData(list_json);
      var range_list = localStorage.getItem("eng_range");
      var range_list_json = range_list ? JSON.parse(range_list) : [];
      fullChart4.series[1].setData(range_list_json);
    }
  }, 1000);
}

const containers = ["fullchart1", "fullchart2", "fullchart3"];

function handleHighlight(container) {
  containers.forEach((item) => {
    if (item != container) $("#" + item).css("opacity", "0.5");
    else {
      // $("#" + item).css("border-color", "orange");
      $("#" + item).css("border-width", "4");
    }
  });
}

function handleUndoHighlight(container) {
  containers.forEach((item) => {
    if (item != container) $("#" + item).css("opacity", "1");
    else {
      // $("#" + item).css("border-color", "");
      $("#" + item).css("border-width", "2");
    }
  });
}

function handleDisplayFull(id) {
  const charts = [fullChart1, fullChart2, fullChart3],
    grid = document.querySelector(".grid-stack").gridstack;

  if ($(`#fullcheck${id.toString()}`)[0].checked) {
    grid.addWidget(
      `<div class="grid-stack-item" id="grid-stack-item-${id.toString()}" gs-w="5" gs-h="3">
        <div class="grid-stack-item-content" id="fulldiv${id.toString()}">
          <div class="card" id="fullchart${id.toString()}" style="margin:5px 0px 5px 0px; padding: 15px;">
          </div>
        </div>
      </div>`
    );

    // get theme
    var theme;
    $.getJSON("./theme.json", function (data) {
      var themes = data.theme;
      // console.log("themes:",themes);
      var cookieList = document.cookie.split("; ");
      var themeid,
        themeName = "themeid";
      cookieList.forEach((val) => {
        if (val.indexOf(themeName) === 0)
          themeid = val.substring(themeName.length + 1);
      });
      theme = themes[themeid];

      // set theme
      for (const [key, value] of Object.entries(theme.full)) {
        console.log(`${key}: ${value}`);
        $(`#${key}`).css("border-color", `rgb(${value})`);
        $(`#${key}Check`).css("background-color", `rgba(${value},0.5)`);
        // $(`#${key}Check`).css("opacity", 0.5);
      }
    });

    if (id == 1) {
      clearInterval(fullinterval1);
      drawFullChart1();
    } else if (id == 2) {
      clearInterval(fullinterval2);
      drawAreaChart("fullchart2");
    } else if (id == 3) {
      clearInterval(fullinterval3);
      drawLineChart("fullchart3");
    }
  } else {
    // remove highchart
    charts[id - 1].destroy();
    // hide card container
    // $(`#fullchart${id.toString()}`).hide();
    // remove gridstack widget
    var el = grid
      .getGridItems()
      .filter((item) => item.id == `grid-stack-item-${id.toString()}`)[0];
    grid.removeWidget(el);
  }
}

// function drawFullChart2() {
//   // categories
//   var categories = ["whether in/out of slides", "whether in/out of screen"];
//   fullChart2 = Highcharts.chart("fullchart2", {
//     credits: false,
//     chart: {
//       type: "bar",
//       events: {
//         load: function () {
//           // set up the updating of the chart each second
//           var series = this.series[0];
//           // console.log(series);
//           fullinterval2 = setInterval(function () {
//             var data = [];
//             data.push([
//               //   Math.round(Math.random() * 100),
//               Math.round(Math.random() * 100),
//             ]);
//             data.push(["In screen", Math.round(Math.random() * 100)]);
//             series.setData(data);
//           }, 2000);
//         },
//       },
//     },
//     title: {
//       text: "Eye Gaze Focusing",
//     },
//     accessibility: {
//       point: {
//         valueDescriptionFormat: "{index}. {xDescription}, {value}%.",
//       },
//     },
//     xAxis: [
//       {
//         categories: categories,
//         reversed: false,
//         labels: {
//           step: 1,
//         },
//         accessibility: {
//           description: "Age (male)",
//         },
//       },
//       {
//         // mirror axis on right side
//         opposite: true,
//         reversed: false,
//         categories: categories,
//         linkedTo: 0,
//         labels: {
//           step: 1,
//         },
//         accessibility: {
//           description: "Age (female)",
//         },
//       },
//     ],
//     yAxis: {
//       title: {
//         text: null,
//       },
//       labels: {
//         formatter: function () {
//           return Math.abs(this.value) + "%";
//         },
//       },
//       accessibility: {
//         description: "Percentage population",
//         rangeDescription: "Range: 0 to 5%",
//       },
//     },

//     plotOptions: {
//       series: {
//         stacking: "normal",
//       },
//     },

//     tooltip: {
//       formatter: function () {
//         // console.log(this);
//         return (
//           "<b>" +
//           this.series.name +
//           "</b><br/>" +
//           "Population: " +
//           Highcharts.numberFormat(Math.abs(this.point.y), 1) +
//           "%"
//         );
//       },
//     },

//     series: [
//       {
//         name: "In Screen",
//         data: [60, 90],
//       },
//       {
//         name: "Out of Screen",
//         data: [-23, -12],
//       },
//     ],
//   });
// }

// function drawFullChart3() {
//   fullChart3 = Highcharts.chart("fullchart3", {
//     credits: false,
//     chart: {
//       type: "spline",
//       animation: Highcharts.svg, // don't animate in old IE
//       marginRight: 10,
//       events: {
//         load: function () {
//           // set up the updating of the chart each second
//           var series = this.series[0];
//           fullinterval3 = setInterval(function () {
//             // var x = new Date().getTime(),
//             //   engagement = 0; // current time
//             // $.ajax({
//             //   url: "http://49.232.60.34:5000/get_class_information",
//             //   type: "GET",
//             //   async: false,
//             //   success: function (res) {
//             //     console.log("getting data from backend");
//             //     data = JSON.parse(res);
//             //     data.forEach((d) => {
//             //       engagement += parseFloat(d.engagement);
//             //     });
//             //     engagement /= data.length;
//             //     console.log("ajax success engagement:", engagement);
//             //     // localStorage.clear();
//             //     var eng_list = localStorage.getItem("engagement");
//             //     var time = new Date().getTime();
//             //     if (eng_list) {
//             //       var eng_list_obj = JSON.parse(eng_list);
//             //       eng_list_obj.push({ time, engagement });
//             //     } else {
//             //       var eng_list_obj = [{ time, engagement }];
//             //     }
//             //     console.log(eng_list_obj);
//             //     eng_list = JSON.stringify(eng_list_obj);
//             //     localStorage.setItem("engagement", eng_list);
//             //     console.log("localstorage:", localStorage);
//             //   },
//             // }).done(function () {
//             //   console.log("ajax done");
//             // });
//             // var eng = doAjax("http://49.232.60.34:5000/get_class_information");
//             // console.log("doajax:", eng);
//             // console.log("engagement:", engagement);
//             // series.addPoint([x, engagement], true, true);
//           }, 1000);
//         },
//       },
//     },

//     time: {
//       useUTC: false,
//     },

//     title: {
//       text: "Live random data",
//     },

//     accessibility: {
//       announceNewData: {
//         enabled: true,
//         minAnnounceInterval: 15000,
//         announcementFormatter: function (allSeries, newSeries, newPoint) {
//           if (newPoint) {
//             return "New point added. Value: " + newPoint.y;
//           }
//           return false;
//         },
//       },
//     },

//     xAxis: {
//       type: "datetime",
//       tickPixelInterval: 150,
//     },

//     yAxis: {
//       title: {
//         text: "Value",
//       },
//       plotLines: [
//         {
//           value: 0,
//           width: 1,
//           color: "#808080",
//         },
//       ],
//     },

//     tooltip: {
//       headerFormat: "<b>{series.name}</b><br/>",
//       pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}",
//     },

//     legend: {
//       enabled: false,
//     },

//     exporting: {
//       enabled: false,
//     },

//     series: [
//       {
//         name: "Random data",
//         data: (function () {
//           // generate an array of random data
//           var data = [],
//             time = new Date().getTime(),
//             i;

//           for (i = -19; i <= 0; i += 1) {
//             data.push({
//               x: time + i * 1000,
//               y: Math.random(),
//             });
//           }
//           return data;
//         })(),
//       },
//     ],
//   });

//   setInterval(() => {}, 1000);
// }
