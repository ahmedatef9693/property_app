document.addEventListener("DOMContentLoaded", (e) => {
  let header = document.querySelector(".navbar-collapse");
  let anchor = document.createElement("a");
  anchor.id = "ytWidget";
  header.prepend(anchor);
  let scrpt_tag = document.createElement("script");
  scrpt_tag.src =
    "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=dark&autoMode=true";
  scrpt_tag.type = "text/javascript";
  document.head.appendChild(scrpt_tag);
});
