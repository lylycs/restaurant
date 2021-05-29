// Component Variables
const logout = document.getElementById("logout-btn");
const restaurantList = document.getElementById("body");
const owner = JSON.parse(localStorage.getItem("user"));
document.getElementById("home-username").innerHTML = owner.username;

getRestaurants();

// Logout
logout.addEventListener("click", (e) => {
	localStorage.clear();
	location.replace("login.html");
});

// Get restaurants
async function getRestaurants() {
	try {
		fetch("http://localhost:3000/v1/restaurant/restaurants", {
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("token"),
			},
		})
			.then((r) => r.json())
			.then((r) => {
				console.log(r);
				if (r.length == 0)
					return (restaurantList.innerHTML = noRestaurntCard());
				r.forEach((r) => {
					restaurantList.innerHTML += restaurantCard(r);
				});
			});
	} catch (error) {
		alert(error.message);
	}
}

// Components
const restaurantCard = (r) => {
	return `<div id="restaurant-list">
    <div class=" restaurant-card" style="border-radius: 8px !important;overflow: hidden;box-shadow: 1px 1px 7px 1px rgb(209, 207, 207);">
        <!-- Image -->
        <div style="width: 90vw;" class="restaurant-card-image">
            <img
                style="object-fit: fill; "
                width="100%"
                height="170px"
                src="http://localhost:3000${r.displayImage}"
                alt="restaurant"
            />
        </div>
        <div style="padding: 8px; display: flex; justify-content: space-between;">
            <!-- Name -->
            <h3 style="color: grey; margin-left: 10px;">${r.displayName}</h3>
            <a style="text-decoration: none;color:black" href="./restaurantDetails.html?id=${r._id}">
                <div class="info" style="padding: 5px 10px; border-radius: 7px; background-color: black;color: white;">
                <i class="fas fa-info"></i>
                <div style="width:8px; ;"></div>
                info
            </div>
            </a>
        </div>
        <!-- Edit -->
        <a style="text-decoration: none;" href="./restaurant.html?id=${r._id}">
            <div class="restaurant-card-edit" style="color: black;">
                Update
                <i class="far fa-edit"></i>
            </div>
        </a>
    </div>
</div>`;
};

const noRestaurntCard = () => {
	return `<div id="no-restaurant-container">
    <h5>
        No restaurants found,
        <a href="addrestaurant.html">Add Restaurant</a>
    </h5>
    <h4>(OR)</h4>
    <h5>
        Is it already listed?
        <a href="contact.html">Claim Restaurant</a>
    </h5>
</div> `;
};
