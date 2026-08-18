let complaints = [];
let nextId = 1;
document.getElementById("complaintForm")
.addEventListener("submit", function(event) {
    event.preventDefault();
    let contact = document.getElementById("contact").value;
    if (!/^[0-9]{10}$/.test(contact)) {
        message.innerText = "Enter valid 10 digit contact number";
        return;
    }
    let complaint = {
        id: nextId++,
        name: document.getElementById("name").value,
        room: document.getElementById("room").value,
        contact: contact,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: "Pending",
        date: new Date().toLocaleDateString()
    };
    complaints.push(complaint);
    message.innerText = "Complaint submitted successfully";
    this.reset();
    displayComplaints();
});
function displayComplaints() {
    let search = document.getElementById("search")
        .value.toLowerCase();
    let filter = document.getElementById("statusFilter").value;
    let result = complaints.filter(function(c) {
        let found =
            c.name.toLowerCase().includes(search) ||
            c.room.toLowerCase().includes(search) ||
            c.category.toLowerCase().includes(search);
        let status =
            filter == "All" || c.status == filter;
        return found && status;
    });
    complaintList.innerHTML = "";
    result.forEach(function(c) {
        complaintList.innerHTML += `
        <div class="complaint">
            <b>ID:</b> ${c.id}<br>
            <b>Name:</b> ${c.name}<br>
            <b>Room:</b> ${c.room}<br>
            <b>Category:</b> ${c.category}<br>
            <b>Description:</b> ${c.description}<br>
            <b>Priority:</b> ${c.priority}<br>
            <b>Date:</b> ${c.date}<br>
            <b>Status:</b> ${c.status}
            <select onchange="updateStatus(${c.id}, this.value)">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
            </select>
            <button onclick="deleteComplaint(${c.id})">
                Delete
            </button>
        </div>`;
    });
}
function updateStatus(id, status) {
    let complaint = complaints.find(c => c.id == id);
    if (complaint) {
        complaint.status = status;
    }
    displayComplaints();
}
function deleteComplaint(id) {
    complaints = complaints.filter(c => c.id != id);
    message.innerText = "Complaint deleted successfully";
    displayComplaints();
}
document.getElementById("search")
.addEventListener("keyup", displayComplaints);
document.getElementById("statusFilter")
.addEventListener("change", displayComplaints);