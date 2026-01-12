const JSONbefore = document.getElementById("JSONbefore"),
  JSONAfter = document.getElementById("JSONAfter");

function ValidateJSON() {
  try {
    if (JSONbefore.value === "") {
      JSONAfter.value = "Please Enter JSON Value.";
      return;
    }
    JSON.parse(JSONbefore.value);
    JSONAfter.value = "Validate Successful";
    return true;
  } catch (e) {
    JSONAfter.value = e;
    return false;
  }
}

function FormatBeautifyJSON() {
  if (ValidateJSON()) {
    var parseJSON = JSON.parse(JSONbefore.value);
    var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
    JSONAfter.value = JSONInPrettyFormat;
  }
}

function MinifyCompactJSON() {
  if (ValidateJSON()) {
    var parseJSON = JSON.parse(JSONbefore.value);
    var minified_json = JSON.stringify(parseJSON);
    JSONAfter.value = minified_json;
  }
}
