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
  // updateFullInterval = setInterval(function () {
  //   $.ajax({
  //     url: "http://49.232.60.34:5000/get_class_information",
  //     type: "GET",
  //     success: function (res) {
  //       console.log("getting data from backend");
  //       data = JSON.parse(res);
  //       var engagement = 0;
  //       data.forEach((d) => {
  //         engagement += parseFloat(d.engagement);
  //       });
  //       engagement /= data.length;
  //       console.log("engagement:", engagement);
  //       // drawFullChart3(engagement);
  //     },
  //   });
  // }, 1000);

  let grid = GridStack.init({
    cellHeight: 100,
  });

  // grid.column(14, "moveScale");

  grid.on("resize", function (e, items) {
    fullChart1.setSize(
      $("#grid-stack-item-1").width() - 50,
      $("#grid-stack-item-1").height() - 50
    );
    fullChart2.setSize(
      $("#grid-stack-item-2").width() - 50,
      $("#grid-stack-item-2").height() - 50
    );
    fullChart3.setSize(
      $("#grid-stack-item-3").width() - 50,
      $("#grid-stack-item-3").height() - 50
    );
    fullChart4.setSize(
      $("#grid-stack-item-4").width() - 50,
      $("#grid-stack-item-4").height() - 50
    );
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

  drawFullChart2();

  // drawFullChart3();

  drawLineChart("fullchart3");
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
      // reflow: true,
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
  var lineChart = Highcharts.chart(container, {
    chart: {
      zoomType: "x",
    },

    title: {
      text: "Engagement",
    },

    subtitle: {
      text: "Historical data (updata per second)",
    },

    tooltip: {
      valueDecimals: 2,
    },

    xAxis: {
      type: "datetime",
      tickInterval: 10,
      min: startTime,
      // min: 1625842192120,
    },

    series: [
      {
        data: data,
        lineWidth: 0.5,
        name: "Hourly data points",
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
        console.log("ajax success engagement:", engagement);

        var eng_list = localStorage.getItem("engagement");
        eng_list_json = eng_list ? JSON.parse(eng_list) : [];
        eng_list_json.push([x, engagement]);
        console.log(eng_list_json);
        eng_list = JSON.stringify(eng_list_json);
        localStorage.setItem("engagement", eng_list);
        console.log("localstorage:", localStorage);
      },
    }).done(function () {
      console.log("ajax done");
    });
    if (lineChart) {
      // lineChart.series[0].setData(getData(50));

      lineChart.series[0].setData(eng_list_json);
    }
    i++;
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
      drawFullChart2();
    } else if (id == 3) {
      clearInterval(fullinterval3);
      drawFullChart3();
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
