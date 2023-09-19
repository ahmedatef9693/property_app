frappe.pages["database-console"].on_page_load = function (wrapper) {
  new MyPage(wrapper);
};

MyPage = Class.extend({
  // init setup our page element
  init: function (wrapper) {
    this.page = frappe.ui.make_app_page({
      parent: wrapper,
      title: "Database Console",
      single_column: true,
    });
    this.make();
  },

  make: function () {
    // let me = $(this);
    $(frappe.render_template(frappe.estate_app_mypage.body, this)).appendTo(
      this.page.main
    );
    let srctag = document.createElement("script");
    srctag.src = "https://unpkg.com/frappe-datatable@latest";
    srctag.type = "text/javascript";
    document.head.appendChild(srctag);

    $("#query-form").submit((e) => {
      e.preventDefault();
      let query = $("#query")[0].value;
      make_query(query);
    });
  },
});

let body = `<div id="">
				<form id="query-form">
				<div class="form-group">
					<label for="query">Enter Your Sql Query</label>
					<textarea class="form-control" id="query" aria-describedby="query" placeholder="Enter Query"></textarea>
					<small id="queryHelp" class="form-text text-muted text-danger">Think Before You Write.</small>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
				</form>
			</div>
			
			<div id="queryResult"></div>
      <div id="queryTable"></div>
			
			`;

frappe.estate_app_mypage = {
  body: body,
};

let make_query = function (formQuery) {
  frappe.call({
    method:
      "estate_app.estate_app.page.database_console.database_console.database_query",
    args: {
      query: formQuery,
    },
    callback: (r) => {
      let result_element = document.querySelector("#queryResult");
      let response_result = r.message;
      if (response_result.status === 0) {
        frappe.throw(response_result.content);
      } else if (response_result.status === 1) {
        if (response_result.content.length > 1) {
          result_element.className = "text-success";
          result_element.innerText = "Data Retrieved";
          make_table(response_result);
        } else {
          frappe.throw("Empty Set");
        }
      } else if (response_result.status === 2) {
        result_element.innerText = response_result.content;
        result_element.className = "text-danger";
      }
    },
  });
};

let make_table = function (response_result) {
  let datatable = new DataTable("#queryTable", {
    columns: response_result.column_headers,
    data: response_result.content,
    inlineFilters: true,
  });
  datatable.setColumnWidths(["500px", "150px", "150px"]); // Adjust the width values as per your requirement
};
