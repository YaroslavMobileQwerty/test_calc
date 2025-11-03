var arr = [
  {
    guest_type: "crew",
    first_name: "Marco",
    last_name: "Burns",
    guest_booking: {
      room_no: "A0073",
      some_array: [7, 2, 4],
    },
  },
  {
    guest_type: "guest",
    first_name: "John",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Jane",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Albert",
    last_name: "Einstein",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "crew",
    first_name: "Jack",
    last_name: "Daniels",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
  {
    guest_type: "guest",
    first_name: "Alan",
    last_name: "Turing",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3],
    },
  },
];

function flattenGuestBooking(item) {
  if (!item || typeof item !== "object") {
    return item;
  }

  var flattened = {
    guest_type: item.guest_type,
    first_name: item.first_name,
    last_name: item.last_name,
  };

  if (item.guest_booking && typeof item.guest_booking === "object") {
    flattened.room_no = item.guest_booking.room_no;
    flattened.some_array = item.guest_booking.some_array;
  }

  return flattened;
}

function calculateSomeTotal(item) {
  if (!item || typeof item !== "object") {
    return item;
  }

  var result = {
    guest_type: item.guest_type,
    first_name: item.first_name,
    last_name: item.last_name,
    room_no: item.room_no,
  };

  if (Array.isArray(item.some_array)) {
    result.some_total = item.some_array.reduce(function (sum, val) {
      return sum + (typeof val === "number" ? val : 0);
    }, 0);
  } else {
    result.some_total = 0;
  }

  return result;
}

function filterGuests(item) {
  return item && item.guest_type === "guest";
}

function sortByName(a, b) {
  var lastNameCompare = (a.last_name || "").localeCompare(b.last_name || "");
  if (lastNameCompare !== 0) {
    return lastNameCompare;
  }
  return (a.first_name || "").localeCompare(b.first_name || "");
}

function mutateArray(a) {
  if (!Array.isArray(a)) {
    return [];
  }

  return a
    .map(flattenGuestBooking)
    .map(calculateSomeTotal)
    .filter(filterGuests)
    .sort(sortByName);
}

$(document).ready(function () {
  $("#originalArray").html(JSON.stringify(arr, null, 2));
  $("#resultsArray").html(JSON.stringify(mutateArray(arr), null, 2));
});
