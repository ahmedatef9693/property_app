frappe.pages["estate"].on_page_load = function (wrapper) {
  // Making an Object Of Class MyPage And giving wrapper as constructor
  new MyPage(wrapper);
};

// definition of our class MyPage where init is the constructor
MyPage = Class.extend({
  // init setup our page element
  init: function (wrapper) {
    this.page = frappe.ui.make_app_page({
      parent: wrapper,
      title: "Estate Home",
      single_column: true,
    });
    this.make();
  },
  // this here stands for frappe.pages.estate
  make: function () {
    // let me = $(this);

    $(frappe.render_template(frappe.estate_app_mypage.body, this)).appendTo(
      this.page.main
    );
    total();
    chart();
    document
      .querySelector("#refresh-total-price")
      .addEventListener("click", () => {
        total();
      });
  },
  // end of class
});

let body = `

<div class="widget-group ">
				<div class="widget-group-head">
					
					<div class="widget-group-control"></div>
				</div>
				<div class="widget-group-body grid-col-3"><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Declaration Submitted">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title"><div class="number-label text-danger">Total Property Price</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh" id="refresh-total-price">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined" id="total-price">5000</div>
				</div></div>
		    <div class="widget-footer">
		    </div>
		</div><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Salary Structure">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title"><div class="number-label">Total Salary Structure</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined">0</div>
				</div></div>
		    <div class="widget-footer">
		    </div>
		</div><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Incentive Given(Last month)">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title"><div class="number-label">Total Incentive Given(Last month)</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined">$ 0.00 </div>
				</div></div>
		    <div class="widget-footer">
		    </div>
		</div><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Outgoing Salary(Last month)">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title"><div class="number-label">Total Outgoing Salary(Last month)</div></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control"><div class="card-actions dropdown pull-right">
				<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				...
				</a>
				<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
					<li class="dropdown-item">
									<a data-action="action-refresh">Refresh</a>
								</li><li class="dropdown-item">
									<a data-action="action-edit">Edit</a>
								</li>
				</ul>
			</div></div>
			</div>
			<div class="widget-body"><div class="widget-content">
				<div class="number" style="color:undefined">$ 0.00 </div>
				</div></div>
		    <div class="widget-footer">
		    </div>
		</div></div>
			</div>

		<div id="mychart"></div>

`;

frappe.estate_app_mypage = {
  body: body,
};

let currency = function (number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

let total = function () {
  frappe.call({
    method: "estate_app.estate_app.page.estate.estate.get_total_price", //dotted path to server method
    callback: function (r) {
      console.log(r.message);
      $("#total-price")[0].innerText = currency(r.message);
    },
  });
};

let chart = function () {
  const data = {
    labels: [
      "12am-3am",
      "3am-6pm",
      "6am-9am",
      "9am-12am",
      "12pm-3pm",
      "3pm-6pm",
      "6pm-9pm",
      "9am-12am",
    ],
    datasets: [
      {
        name: "Some Data",
        chartType: "bar",
        values: [25, 40, 30, 35, 8, 52, 17, -4],
      },
      {
        name: "Another Set",
        chartType: "bar",
        values: [25, 50, -10, 15, 18, 32, 27, 14],
      },
      {
        name: "Yet Another",
        chartType: "bar",
        values: [15, 20, -3, -15, 58, 12, -17, 37],
      },
    ],
    // ymarkers is the broken line
    yMarkers: [{ label: "Marker", value: 70, options: { labelPos: "left" } }],
    yRegions: [
      { label: "Region", start: -10, end: 50, options: { labelPos: "right" } },
    ],
  };

  const chart = new frappe.Chart("#mychart", {
    // or a DOM element,
    // new Chart() in case of ES6 module with above usage
    title: "Estate Price Chart",
    data: data,
    type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
    height: 300,
    colors: ["red", "blue", "green"],
    axisOptions: {
      xAxisMode: "tick",
      xIsSeries: true,
    },
    barOptions: {
      stacked: false,
      spaceRatio: 0.5,
    },
    tooltipOptions: {
      formatTooltipX: (d) => (d + "").toUpperCase(),
      formatTooltipY: (d) => d + " pts",
    },
  });
  //   Download The Chart
  //   chart.export();
};
