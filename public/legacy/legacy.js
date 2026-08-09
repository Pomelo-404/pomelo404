(function () {
  "use strict";

  var form = document.getElementById("legacy-quote");
  if (!form) {
    return;
  }

  var projectPrices = {
    landing: 24000,
    website: 48000,
    commerce: 78000
  };
  var projectLabels = {
    landing: "Landing page",
    website: "Sitio de marca",
    commerce: "E-commerce"
  };
  var addonPrices = {
    brand: 18000,
    copy: 9000,
    motion: 12000,
    cms: 10000
  };
  var addonLabels = {
    brand: "Identidad visual",
    copy: "Copywriting",
    motion: "Motion avanzado",
    cms: "CMS autogestionable"
  };
  var whatsappNumber = "523330276670";

  function money(value) {
    return "$" + String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getCheckedAddons() {
    var inputs = form.querySelectorAll('input[name="addon"]');
    var selected = [];
    var index;

    for (index = 0; index < inputs.length; index += 1) {
      if (inputs[index].checked) {
        selected.push(inputs[index].value);
      }
    }

    return selected;
  }

  function calculate() {
    var type = document.getElementById("project-type").value;
    var pages = parseInt(document.getElementById("pages").value, 10) || 1;
    var timeline = document.getElementById("timeline").value;
    var addons = getCheckedAddons();
    var total = projectPrices[type] || 0;
    var index;

    total += Math.max(0, pages - 1) * 3500;
    for (index = 0; index < addons.length; index += 1) {
      total += addonPrices[addons[index]] || 0;
    }
    if (timeline === "express") {
      total *= 1.2;
    }

    total = Math.round(total / 1000) * 1000;
    document.getElementById("estimate").innerHTML = money(total) + " MXN";
    document.getElementById("estimate-range").innerHTML =
      "Rango probable: " + money(total * 0.9) + " — " + money(total * 1.1) + " MXN";

    return total;
  }

  function submitQuote(event) {
    var total;
    var type;
    var pages;
    var timeline;
    var projectName;
    var addons;
    var addonNames = [];
    var message;
    var index;

    if (event && event.preventDefault) {
      event.preventDefault();
    }

    total = calculate();
    type = document.getElementById("project-type").value;
    pages = document.getElementById("pages").value;
    timeline = document.getElementById("timeline").value;
    projectName = document.getElementById("project-name").value.replace(/^\s+|\s+$/g, "");
    addons = getCheckedAddons();

    for (index = 0; index < addons.length; index += 1) {
      addonNames.push(addonLabels[addons[index]]);
    }

    message = "¡Hola!\nAcabo de completar el cotizador y quiero platicar de mi proyecto.\n\n";
    if (projectName) {
      message += "Nombre: " + projectName + "\n";
    }
    message += "Proyecto: " + projectLabels[type] + "\n";
    message += "Páginas: " + pages + "\n";
    message += "Extras: " + (addonNames.length ? addonNames.join(", ") : "Sin extras") + "\n";
    message += "Entrega: " + (timeline === "express" ? "Express" : "6–8 semanas") + "\n";
    message += "Estimado: " + money(total) + " MXN + IVA\n";
    message += "Rango probable: " + money(total * 0.9) + " — " + money(total * 1.1) + " MXN\n\n";
    message += "Me gustaría conocer los siguientes pasos.";

    window.location.href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    return false;
  }

  form.onchange = calculate;
  form.onsubmit = submitQuote;
  calculate();
}());
