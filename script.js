function getFeeValue(id) {
    const val = parseInt(document.getElementById(id).value);
    return isNaN(val) ? 0 : val; // default to 0 if blank
}

function generateFeeSlips() {
    const studentName = document.getElementById("studentName").value;
    const fatherName = document.getElementById("fatherName").value;
    const className = document.getElementById("className").value;
    const admissionNo = document.getElementById("admissionNo").value;
    const feeMonth = document.getElementById("feeMonth").value;
    const issueDate = document.getElementById("issueDate").value;
    const dueDate = document.getElementById("dueDate").value;

    if (!studentName || !fatherName || !className || !admissionNo || !feeMonth || !issueDate || !dueDate) {
        alert("Please fill all student details");
        return;
    }

    const fees = {
        "Tuition Fee": getFeeValue("tuitionFee"),
        "School Fee": getFeeValue("schoolFee"),
        "Late Fee": getFeeValue("lateFee"),
        "Previous Fee": getFeeValue("previousFee"),
        "Fine": getFeeValue("fine"),
        "Examination Fee": getFeeValue("examFee"),
        "Admission/Readmission Fee": getFeeValue("admissionFee"),
        "Security Fee": getFeeValue("securityFee"),
        "Welfare Fee": getFeeValue("welfareFee"),
        "Progress Report Fee": getFeeValue("progressFee"),
        "Promotion Fee": getFeeValue("promotionFee"),
        "Transport Fee": getFeeValue("transportFee"),
        "Other": getFeeValue("otherFee")
    };

    const totalFee = Object.values(fees).reduce((a, b) => a + b, 0);

    const copies = ["School Copy", "Student Copy", "Office Copy"];
    const container = document.getElementById("slipsContainer");
    container.innerHTML = "";

    const feeTableRows = Object.keys(fees).map((key, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${key}</td>
            <td>${fees[key]}</td>
        </tr>
    `).join("");

    const slipHTML = copies.map((copy, index) => `
        <div class="fee-slip">
            <div class="fee-copy-header">
                <h3>${copy}</h3>
                <h3>Excel Public School Tissar Shigar</h3>
                <p>Phone: +92-300-XXXXXXX</p>
                <table class="fee-info">
                    <tr>
                        <td class="left">Email: excelps@gmail.com</td>
                        <td class="right">Slip No: ${1000 + index}</td>
                    </tr>
                </table>
                <table class="fee-info">
                    <tr>
                        <td>Student Name: ${studentName}</td>
                        <td>Father Name: ${fatherName}</td>
                    </tr>
                    <tr>
                        <td>Class & Section: ${className}</td>
                        <td>Admission No.: ${admissionNo}</td>
                    </tr>
                    <tr>
                        <td>Issue Date: ${issueDate}</td>
                        <td>Due Date: ${dueDate}</td>
                    </tr>
                    <tr>
                        <td colspan="2">Fee Slip for the month of: ${feeMonth}</td>
                    </tr>
                </table>
            </div>
            <table class="fee-table">
                <tr><th>Sr No</th><th>Particulars</th><th>Amount (Rs)</th></tr>
                ${feeTableRows}
            </table>
            <table class="total-amount">
                <tr><td>Total Amount: Rs ${totalFee}</td></tr>
            </table>
            <div class="fee-paid-sign">
                <div>Fee Paid Date: ________________</div>
                <div>Signature: ________________</div>
            </div>
        </div>
    `).join("");

    container.innerHTML = slipHTML;
}

function printFeeSlips() {
    window.print();
}
