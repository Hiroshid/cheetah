const data = [
    //({ check: false, personid: 0, fname: "test", lname: "TEST", email: "NO" })
]

function getSelected() {
    const { select, range } = grid.selection
    if (select.row) {
        const record = grid.records[select.row - 1]
        alert(record.personid + ":" + record.email)
    }
}

function Del() {
    const { select, range } = grid.selection;
    
    if (select.row) {
        const record = grid.records[select.row - 1];
        
        // ลบแถวที่เลือกออกจากตาราง
        grid.records.splice(select.row - 1, 1);
        
        // อัพเดทตารางหลังจากลบแถว
        // คุณอาจต้องเรียกฟังก์ชันหรือทำการอัพเดทอื่นๆ ขึ้นอยู่กับโครงสร้างของโปรแกรมของคุณ
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
        // ตัวอย่าง: อัพเดทตารางหลังจากลบแถว
        grid.records = data;
        
        console.log('Record deleted:', record); // บันทึกข้อมูลที่ถูกลบไว้เพื่อทดสอบหรือการตรวจสอบ
    }
}


function Save() {
    const fnameInput = document.getElementById("fname").value;
    const lnameInput = document.getElementById("lname").value;
    const emailInput = document.getElementById("email").value;

    const { select, range } = grid.selection;
    if (select.row) {
        const recordIndex = select.row - 1;
      
        // อัปเดตข้อมูลใน records array ด้วยข้อมูลที่ถูกแก้ไข
        grid.records[recordIndex].fname = fnameInput;
        grid.records[recordIndex].lname = lnameInput;
        grid.records[recordIndex].email = emailInput;

        grid.records = data;
        //document หน้าเว็บ
        //element objectหรือส่วนประกอบต่างๆที่่อยู่ในเว็บเช่น button 
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";

        alert("Changes saved successfully!");
    }
    else {
        alert("Please select");
    }
}


function Add() {
    //รับค่าจาก input
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;

    // เช็กค่าในช่อง input
    if (fname && lname && email) {
        // สร้างค่า id โดยให้ +1 ไปเรื่อยๆ
        const personid = data.length + 1;

        // Add the new person to the data array
        data.push({ check: false, personid: personid, fname: fname, lname: lname, email: email });

        alert("Person added successfully!");
        grid.records = data;
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
    } else {
        alert("Please fill in all fields.");
    }
}


grid = new cheetahGrid.ListGrid({
    parentElement: document.querySelector(".grid-sample"),
    header: [
        { field: "check", caption: "", width: 50, columnType: "check", action: "check" },
        { field: "personid", caption: "ID", width: 100 },
        { field: "fname", caption: "First Name", width: 200 },
        { field: "lname", caption: "Last Name", width: 200 },
        { field: "email", caption: "Email", width: 250 },
    ],
    records: data
})

// grid = new cheetahGrid.ListGrid({
//     parentElement: document.querySelector(".grid-sample"),
//     header: [
//         { field: "check", caption: "", width: 50, columnType: "check", action: "check" },
//         { field: "personid", caption: "ID", width: 100 },
//         { field: "fname", caption: "First Name", width: 200 },
//         { field: "lname", caption: "Last Name", width: 200 },
//         { field: "email", caption: "Email", width: 250 },
//     ],
//     records: data
// })

const CLICK = cheetahGrid.ListGrid.EVENT_TYPE.CLICK_CELL
grid.listen(CLICK, (args) => {

    const { select, range } = grid.selection;
    if (select.row) {
        const recordIndex = select.row - 1;

        // ดึงข้อมูลจาก record ที่เลือกในกริด
        const selectedRecord = grid.records[recordIndex];

        // แสดงข้อมูลในช่องข้อมูล HTML
        document.getElementById("fname").value = selectedRecord.fname;
        document.getElementById("lname").value = selectedRecord.lname;
        document.getElementById("email").value = selectedRecord.email;

        console.log(selectedRecord.check)

    }
})