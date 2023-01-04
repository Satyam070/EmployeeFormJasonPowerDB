var token = "90938214|-31949273238676323|90954900";
var dbName = "EMPLOYEE";
var relName = "EMP-REL"
resetForm()
function validateAndGetFornData() {
    var empIdVar = $("#empId").val();

    if (empIdVar === "") {
        alert("Roll No is required");
        $("#empId").focus();
        return "";
    }

    var nameVar = $("#name").val();
    if (nameVar === "") {
        alert("Employee Name is required");
        $("#name").focus();
        return "";
    }

    var empSalaryn = $("#empSalary").val();
    if (empSalaryn === "") {
        alert("empSalary is required");
        $("#empSalary").focus();
        return "";
    }

    var empDA = $("#empDA").val();
    if (empDA === "") {
        alert("empDA is required");
        $("#empDA").focus();
        return "";
    }

    var empHRA = $("#empHRA").val();
    if (empHRA === "") {
        alert("Birth-Date is required");
        $("#empHRA").focus();
        return "";
    }

    var empDeduction = $("#empDeduction").val();
    if (empDeduction === "") {
        alert("Enrollment-Date is required");
        $("#empDeduction").focus();
        return "";
    }
    var jsonStrObj = {
        empId: empIdVar,
        name: nameVar,
        empSalary: empSalaryn,
        empDA: empDA,
        empHRA: empHRA,
        empDeduction: empDeduction
    }

    return JSON.stringify(jsonStrObj);
}
function UpdateStudent() {
    var jsonStr = validateAndGetFornData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relName, localStorage.getItem("rec_no"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    if (resultObj.status == 200) {
        alert("Data updated Successfully")
    } else if (resultObj.status == 401) {
        alert("Invalid Token")
    } else if (resultObj.status == 400) {
        alert("Something went wrong,Try after some time")
    }
    jQuery.ajaxSetup({async: true});
    resetForm();
}

function savetoloavelstorage(resultObj) {
    var data = JSON.parse(resultObj.data)
    localStorage.setItem('rec_no', data.rec_no)
}
function resetForm() {
    $("#empId").val("");
    $("#name").val("").prop("disabled", true);
    $("#empSalary").val("").prop("disabled", true);
    $("#empDA").val("").prop("disabled", true);
    $("#empHRA").val("").prop("disabled", true);
    $("#empDeduction").val("").prop("disabled", true);
    $("#empId").prop("disabled", false)
    $("#savebutton").prop("disabled", true)
    $("#update").prop("disabled", true)
    $("#reset").prop("disabled", true)
}
function enableInput() {
    $("#name").prop("disabled", false);
    $("#empSalary").prop("disabled", false);
    $("#empDA").prop("disabled", false);
    $("#empHRA").prop("disabled", false);
    $("#empDeduction").prop("disabled", false);
    $("#reset").prop("disabled", false)

}
document.getElementById("empId").addEventListener("focusout", function (event) {
    var result = checkrecord()
})
function checkrecord() {
    var empIdVar = $("#empId").val();
    if (empIdVar === "") {
        alert("Employee ID is required");
        $("#name").focus();
        return "";
    }

    var jsonObj = {
        empId: empIdVar
    }
    var jsonStr = JSON.stringify(jsonObj);
    if (jsonStr === "") {
        return;
    }
    var getReqStr = createGET_BY_KEYRequest("90938214|-31949273238676323|90954900", "EMPLOYEE", "EMP-REL", jsonStr, true, true);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr, "http://api.login2explore.com:5577", "/api/irl");
    if (resultObj.status != 200) {
        $("#savebutton").prop("disabled", false)
        enableInput()
    } else {
        $("#savebutton").prop("disabled", true)
        fillData(resultObj)
        return true;
    }
}
function fillData(resultObj) {
    var data = JSON.parse(resultObj.data);
    var data1 = JSON.stringify(data.record)
    var data2 = JSON.parse(data1)
    $("#empId").val(data2.empId);
    $("#name").val(data2.name);

    $("#empSalary").val(data2.empSalary);
    $("#empDA").val(data2.empDA);
    $("#empHRA").val(data2.empHRA);
    $("#empDeduction").val(data2.empDeduction);
    jQuery.ajaxSetup({async: true});
    savetoloavelstorage(resultObj)
    $("#empId").prop("disabled", true)
    $("#savebutton").prop("disabled", true)
    $("#empId").prop("disabled", true)
    $("#update").prop("disabled", false)

    enableInput()
}
function RegisterStudent() {
    var jsonStr = validateAndGetFornData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token, jsonStr, dbName, relName);
    //var putReqStr=createUPDATERecordRequest(, jsonStr, "EMPLOYEE", "EMP-REL",localStorage.getItem("rec_no"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    if (resultObj.status == 200) {
        alert("Data added Successfully")
    } else if (resultObj.status == 401) {
        alert("Invalid Token")
    } else if (resultObj.status == 400) {
        alert("Something went wrong,Try after some time")
    }
    jQuery.ajaxSetup({async: true});
    resetForm();
}
