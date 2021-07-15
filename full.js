var fullinterval1, fullinterval2, fullinterval3, updateFullInterval;

// async function doAjax(ajaxurl) {
//   var engagement;
//   await $.ajax({
//     url: ajaxurl,
//     type: "GET",
//     success: function (res) {
//       console.log("getting data from backend");
//       data = JSON.parse(res);
//       // var engagement = 0;
//       data.forEach((d) => {
//         engagement += parseFloat(d.engagement);
//       });
//       engagement /= data.length;
//       console.log("ajax success engagement:", engagement);
//     },
//   });
//   return engagement;
// }

function loadFullWindow() {
  let grid = GridStack.init({
    cellHeight: 100,
  });

  setInterval(function () {
    $("#fullchart1").width($("#fulldiv1").width() - 40);
    $("#fullchart1").height($("#fulldiv1").height() - 40);

    $("#fullchart2").width($("#fulldiv2").width() - 40);
    $("#fullchart2").height($("#fulldiv2").height() - 40);

    $("#fullchart3").width($("#fulldiv3").width() - 40);
    $("#fullchart3").height($("#fulldiv3").height() - 40);

    console.log("fulldiv1 width", $("#fulldiv1").width());
    console.log("fulldiv1 height", $("#fulldiv1").height());
    console.log("fullchart1 width", $("#fullchart1").width());
    console.log("fullchart1 height", $("#fullchart1").height());
  }, 1000);

  grid.on("resize", function (e, items) {
    $("#fullchart1").width($("#fulldiv1").width() - 40);
    $("#fullchart1").height($("#fulldiv1").height() - 40);

    $("#fullchart2").width($("#fulldiv2").width() - 40);
    $("#fullchart2").height($("#fulldiv2").height() - 40);

    $("#fullchart3").width($("#fulldiv3").width() - 40);
    $("#fullchart3").height($("#fulldiv3").height() - 40);

    fullChart1.setSize(
      $("#fulldiv1").width() - 40,
      $("#fulldiv1").height() - 40
    );
    // $("#fullchart1").css("width", $("#fulldiv1").width());
    // $("#fullchart1").css("height", $("#fulldiv1").height());
    console.log("fullchart1", fullChart1);

    fullChart2.setSize($("#fullchart2").width(), $("#fullchart2").height());
    fullChart3.setSize($("#fullchart3").width(), $("#fullchart3").height());
    // fullChart4.setSize(
    //   $("#grid-stack-item-4").width() - 50,
    //   $("#grid-stack-item-4").height() - 50
    // );
    // console.log($("#grid-stack-item-1").width());
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

  drawFullChart1();

  // drawFullChart2();

  // drawFullChart3();

  drawLineChart("fullchart3");

  drawAreaChart("fullchart2");
}

function handleUnloadFull() {
  localStorage.clear();
  // clearInterval(updateFullInterval);
  // no need to clear the interval cause all the timers got cleaned when the browser closed
}

function drawFullChart1() {
  fullChart1 = new Highcharts.Chart({
    credits: false,
    chart: {
      renderTo: "fullchart1",
      type: "column",
      reflow: true,
      width: $("#fulldiv1").width() - 40,
      height: $("#fulldiv1").height() - 40,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          fullinterval1 = setInterval(function () {
            var data = [];
            data.push([
              "01:Inner brow raiser",
              Math.round(Math.random() * 100),
            ]);
            data.push([
              "02:Outer brow raiser",
              Math.round(Math.random() * 100),
            ]);
            data.push(["04:Brow lowerer", Math.round(Math.random() * 100)]);
            data.push(["05:Upper lid raiser", Math.round(Math.random() * 100)]);
            data.push(["06:Cheek raiser", Math.round(Math.random() * 100)]);
            data.push(["07:Lid tighter", Math.round(Math.random() * 100)]);
            data.push(["09:Nose wrinkler", Math.round(Math.random() * 100)]);
            data.push(["10:Upper lip raiser", Math.round(Math.random() * 100)]);
            data.push([
              "12:Lip corner puller",
              Math.round(Math.random() * 100),
            ]);
            data.push(["14:Dimpler", Math.round(Math.random() * 100)]);
            data.push([
              "15:Lip corner depressor",
              Math.round(Math.random() * 100),
            ]);
            data.push(["17:Chin raiser", Math.round(Math.random() * 100)]);
            data.push(["20:Lip stretcher", Math.round(Math.random() * 100)]);
            data.push(["23:Lip tightener", Math.round(Math.random() * 100)]);
            data.push(["25:Lip part", Math.round(Math.random() * 100)]);
            data.push(["26:Jaw drop", Math.round(Math.random() * 100)]);
            data.push(["45:Blink", Math.round(Math.random() * 100)]);

            series.setData(data);
          }, 2000);
        },
      },
    },
    title: {
      text: "The states of the class",
    },
    xAxis: {
      categories: [
        "01:Inner brow raiser",
        "02:Outer brow raiser",
        "04:Brow lowerer",
        "05:Upper lid raiser",
        "06:Cheek raiser",
        "07:Lid tighter",
        "09:Nose wrinkler",
        "10:Upper lip raiser",
        "12:Lip corner puller",
        "14:Dimpler",
        "15:Lip corner depressor",
        "17:Chin raiser",
        "20:Lip stretcher",
        "23:Lip tightener",
        "25:Lip part",
        "26:Jaw drop",
        "45:Blink",
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "value",
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
      align: "right",
      x: -100,
      verticalAlign: "top",
      y: 20,
      floating: true,
      backgroundColor:
        (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) ||
        "white",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.x +
          "</b><br/>" +
          this.series.name +
          ": " +
          Math.round(this.y) +
          "<br/>" +
          "Total: " +
          Math.round(this.point.stackTotal)
        );
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
          color:
            (Highcharts.theme && Highcharts.theme.dataLabelsColor) || "white",
        },
      },
    },
    series: [
      {
        name: "Facial expression itensity",
        data: [5, 3, 4, 7, 2],
      },
    ],
  });
}

function drawFullChart2() {
  // categories
  var categories = ["whether in/out of slides", "whether in/out of screen"];
  fullChart2 = Highcharts.chart("fullchart2", {
    credits: false,
    chart: {
      type: "bar",
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          // console.log(series);
          fullinterval2 = setInterval(function () {
            var data = [];
            data.push([
              //   Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
            ]);
            data.push(["In screen", Math.round(Math.random() * 100)]);
            series.setData(data);
          }, 2000);
        },
      },
    },
    title: {
      text: "Eye Gaze Focusing",
    },
    accessibility: {
      point: {
        valueDescriptionFormat: "{index}. {xDescription}, {value}%.",
      },
    },
    xAxis: [
      {
        categories: categories,
        reversed: false,
        labels: {
          step: 1,
        },
        accessibility: {
          description: "Age (male)",
        },
      },
      {
        // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
          step: 1,
        },
        accessibility: {
          description: "Age (female)",
        },
      },
    ],
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        formatter: function () {
          return Math.abs(this.value) + "%";
        },
      },
      accessibility: {
        description: "Percentage population",
        rangeDescription: "Range: 0 to 5%",
      },
    },

    plotOptions: {
      series: {
        stacking: "normal",
      },
    },

    tooltip: {
      formatter: function () {
        // console.log(this);
        return (
          "<b>" +
          this.series.name +
          "</b><br/>" +
          "Population: " +
          Highcharts.numberFormat(Math.abs(this.point.y), 1) +
          "%"
        );
      },
    },

    series: [
      {
        name: "In Screen",
        data: [60, 90],
      },
      {
        name: "Out of Screen",
        data: [-23, -12],
      },
    ],
  });
}

function drawFullChart3() {
  fullChart3 = Highcharts.chart("fullchart3", {
    credits: false,
    chart: {
      type: "spline",
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
          // set up the updating of the chart each second
          var series = this.series[0];
          fullinterval3 = setInterval(function () {
            // var x = new Date().getTime(),
            //   engagement = 0; // current time
            // $.ajax({
            //   url: "http://49.232.60.34:5000/get_class_information",
            //   type: "GET",
            //   async: false,
            //   success: function (res) {
            //     console.log("getting data from backend");
            //     data = JSON.parse(res);
            //     data.forEach((d) => {
            //       engagement += parseFloat(d.engagement);
            //     });
            //     engagement /= data.length;
            //     console.log("ajax success engagement:", engagement);
            //     // localStorage.clear();
            //     var eng_list = localStorage.getItem("engagement");
            //     var time = new Date().getTime();
            //     if (eng_list) {
            //       var eng_list_obj = JSON.parse(eng_list);
            //       eng_list_obj.push({ time, engagement });
            //     } else {
            //       var eng_list_obj = [{ time, engagement }];
            //     }
            //     console.log(eng_list_obj);
            //     eng_list = JSON.stringify(eng_list_obj);
            //     localStorage.setItem("engagement", eng_list);
            //     console.log("localstorage:", localStorage);
            //   },
            // }).done(function () {
            //   console.log("ajax done");
            // });
            // var eng = doAjax("http://49.232.60.34:5000/get_class_information");
            // console.log("doajax:", eng);
            // console.log("engagement:", engagement);
            // series.addPoint([x, engagement], true, true);
          }, 1000);
        },
      },
    },

    time: {
      useUTC: false,
    },

    title: {
      text: "Live random data",
    },

    accessibility: {
      announceNewData: {
        enabled: true,
        minAnnounceInterval: 15000,
        announcementFormatter: function (allSeries, newSeries, newPoint) {
          if (newPoint) {
            return "New point added. Value: " + newPoint.y;
          }
          return false;
        },
      },
    },

    xAxis: {
      type: "datetime",
      tickPixelInterval: 150,
    },

    yAxis: {
      title: {
        text: "Value",
      },
      plotLines: [
        {
          value: 0,
          width: 1,
          color: "#808080",
        },
      ],
    },

    tooltip: {
      headerFormat: "<b>{series.name}</b><br/>",
      pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}",
    },

    legend: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    series: [
      {
        name: "Random data",
        data: (function () {
          // generate an array of random data
          var data = [],
            time = new Date().getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random(),
            });
          }
          return data;
        })(),
      },
    ],
  });

  setInterval(() => {}, 1000);
}

function drawLineChart(container) {
  var startTime = new Date().getTime();
  function getData(n) {
    var arr = [],
      i,
      x,
      a,
      b,
      c,
      spike;
    for (
      i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
      i < n;
      i = i + 1, x = x + 36e5
    ) {
      if (i % 100 === 0) {
        a = 2 * Math.random();
      }
      if (i % 1000 === 0) {
        b = 2 * Math.random();
      }
      if (i % 10000 === 0) {
        c = 2 * Math.random();
      }
      if (i % 50000 === 0) {
        spike = 10;
      } else {
        spike = 0;
      }
      arr.push([x, 2 * Math.sin(i / 100) + a + b + c + spike + Math.random()]);
    }
    return arr;
  }
  var n = 5000,
    data = getData(n);

  console.log(data);

  console.time("line");
  fullChart3 = Highcharts.chart(container, {
    chart: {
      zoomType: "x",
      width: $("#fulldiv3").width() - 40,
      height: $("#fulldiv3").height() - 40,
    },

    title: {
      text: "Engagement",
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
        data: [
          {
            x: 1591459200000,
            y: 9,
            name: "theme_blue",
            color: "#00FF00",
          },
          {
            x: 1591462800000,
            y: 6,
            name: "theme_orange",
            color: "#FF00FF",
          },
        ],
        lineWidth: 0.5,
        name: "Average level",
      },
    ],
  });

  var i = 1;
  setInterval(() => {
    var x = new Date().getTime(),
      engagement = 0,
      eng_list_json; // current time

    $.ajax({
      url: "http://49.232.60.34:5000/get_class_information",
      type: "GET",
      async: false,
      success: function (res) {
        console.log("getting data from backend");
        data = JSON.parse(res);
        data.forEach((d) => {
          engagement += parseFloat(d.engagement);
        });
        engagement /= data.length;
        // console.log("ajax success engagement:", engagement);

        var eng_list = localStorage.getItem("engagement");
        eng_list_json = eng_list ? JSON.parse(eng_list) : [];
        eng_list_json.push([x, engagement]);
        // console.log(eng_list_json);
        eng_list = JSON.stringify(eng_list_json);
        localStorage.setItem("engagement", eng_list);
        // console.log("localstorage:", localStorage);
      },
    }).done(function () {
      console.log("ajax done");
    });
    if (fullChart3) {
      // fullChart3.series[0].setData(getData(50));
      console.log(fullChart3.series[0]);
      fullChart3.series[0].setData(eng_list_json);
    }
    i++;
  }, 1000);
}

function drawAreaChart(container) {
  fullChart2 = Highcharts.chart(container, {
    chart: {
      type: "area",
      width: $("#fulldiv2").width() - 40,
      height: $("#fulldiv2").height() - 40,
    },
    accessibility: {
      description:
        "Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.",
    },
    title: {
      text: "US and USSR nuclear stockpiles",
    },
    subtitle: {
      text:
        'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
        'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
        "armscontrol.org</a>",
    },
    xAxis: {
      allowDecimals: false,
      labels: {
        formatter: function () {
          return this.value; // clean, unformatted number for year
        },
      },
      accessibility: {
        rangeDescription: "Range: 1940 to 2017.",
      },
    },
    yAxis: {
      title: {
        text: "Nuclear weapon states",
      },
      labels: {
        formatter: function () {
          return this.value / 1000 + "k";
        },
      },
    },
    tooltip: {
      pointFormat:
        "{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}",
    },
    plotOptions: {
      area: {
        pointStart: 1940,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: "USA",
        data: [
          null,
          null,
          null,
          null,
          null,
          6,
          11,
          32,
          110,
          235,
          369,
          640,
          1005,
          1436,
          2063,
          3057,
          4618,
          6444,
          9822,
          15468,
          20434,
          24126,
          27387,
          29459,
          31056,
          31982,
          32040,
          31233,
          29224,
          27342,
          26662,
          26956,
          27912,
          28999,
          28965,
          27826,
          25579,
          25722,
          24826,
          24605,
          24304,
          23464,
          23708,
          24099,
          24357,
          24237,
          24401,
          24344,
          23586,
          22380,
          21004,
          17287,
          14747,
          13076,
          12555,
          12144,
          11009,
          10950,
          10871,
          10824,
          10577,
          10527,
          10475,
          10421,
          10358,
          10295,
          10104,
          9914,
          9620,
          9326,
          5113,
          5113,
          4954,
          4804,
          4761,
          4717,
          4368,
          4018,
        ],
      },
      {
        name: "USSR/Russia",
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          5,
          25,
          50,
          120,
          150,
          200,
          426,
          660,
          869,
          1060,
          1605,
          2471,
          3322,
          4238,
          5221,
          6129,
          7089,
          8339,
          9399,
          10538,
          11643,
          13092,
          14478,
          15915,
          17385,
          19055,
          21205,
          23044,
          25393,
          27935,
          30062,
          32049,
          33952,
          35804,
          37431,
          39197,
          45000,
          43000,
          41000,
          39000,
          37000,
          35000,
          33000,
          31000,
          29000,
          27000,
          25000,
          24000,
          23000,
          22000,
          21000,
          20000,
          19000,
          18000,
          18000,
          17000,
          16000,
          15537,
          14162,
          12787,
          12600,
          11400,
          5500,
          4512,
          4502,
          4502,
          4500,
          4500,
        ],
      },
    ],
  });
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
