const bookedSlots = ["a1", "b3"];

function bookSlot(slot) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (bookedSlots.includes(slot)) {
        reject(" This slot is already booked.");
      } else {
        resolve(`Slot ${slot} booked successfully.`);
      }
    }, 2000);
  });
}

async function bookingProcess(slot) {
  try {
    const result = await bookSlot(slot);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

bookingProcess("b3"); 
bookingProcess("a1"); 
bookingProcess("c1"); 