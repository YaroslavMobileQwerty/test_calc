var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function mutateArray(a) {
    if (!Array.isArray(a)) {
        return [];
    }
    
    return a
        // Step 1: Flatten structure - extract guest_booking fields to root level
        .map(function(item) {
            if (!item || typeof item !== 'object') {
                return item;
            }
            
            var flattened = {
                guest_type: item.guest_type,
                first_name: item.first_name,
                last_name: item.last_name
            };
            
            // Extract fields from guest_booking if it exists
            if (item.guest_booking && typeof item.guest_booking === 'object') {
                flattened.room_no = item.guest_booking.room_no;
                flattened.some_array = item.guest_booking.some_array;
            }
            
            return flattened;
        })
        // Step 2: Replace some_array with some_total (sum of array elements)
        .map(function(item) {
            if (!item || typeof item !== 'object') {
                return item;
            }
            
            var result = {
                guest_type: item.guest_type,
                first_name: item.first_name,
                last_name: item.last_name,
                room_no: item.room_no
            };
            
            // Calculate sum of some_array if it exists and is an array
            if (Array.isArray(item.some_array)) {
                result.some_total = item.some_array.reduce(function(sum, val) {
                    return sum + (typeof val === 'number' ? val : 0);
                }, 0);
            } else {
                result.some_total = 0;
            }
            
            return result;
        })
        // Step 3: Filter only items with guest_type === 'guest'
        .filter(function(item) {
            return item && item.guest_type === 'guest';
        })
        // Step 4: Sort alphabetically by last_name, then first_name
        .sort(function(a, b) {
            // First compare by last_name
            var lastNameCompare = (a.last_name || '').localeCompare(b.last_name || '');
            if (lastNameCompare !== 0) {
                return lastNameCompare;
            }
            // If last names are equal, compare by first_name
            return (a.first_name || '').localeCompare(b.first_name || '');
        });
}

$(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
});
